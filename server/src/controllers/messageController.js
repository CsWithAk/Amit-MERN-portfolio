const asyncHandler = require('../utils/asyncHandler');
const { success, failure } = require('../utils/apiResponse');
const M = require('../models');
const { validate, escapeRegex } = require('../utils/validate');
const env = require('../config/env');
const {
  sendContactNotification,
  sendVisitorConfirmation,
  sendAdminReply,
} = require('../services/emailService');

/** POST /api/public/contact (rate limited). Saves message in MongoDB. */
const submit = asyncHandler(async (req, res) => {
  // Honeypot: a hidden field that humans never fill but bots do. Accept the
  // request silently yet store nothing and send nothing — blunt automated spam.
  const honeypot = req.body && req.body.company_website;
  if (typeof honeypot === 'string' && honeypot.trim() !== '') {
    return success(res, { id: null }, 'Message received', 201);
  }

  const data = validate(req.body, {
    name: { required: true, type: 'string', min: 1, max: 120 },
    email: { required: true, type: 'email' },
    subject: { type: 'string', max: 200, default: '' },
    message: { required: true, type: 'string', min: 1, max: 5000 },
  });

  // 1) Persist FIRST — a message must never be lost because of an email issue.
  const doc = await M.ContactMessage.create({ ...data, ip: req.ip || '' });

  // 2) Best-effort SendGrid delivery. The submission already succeeded, so email
  //    outcomes are recorded + returned for diagnostics but never fail the request.
  const email = { enabled: env.emailEnabled, notified: false, confirmed: false };
  try {
    const settings = await M.SiteSettings.findOne({ key: 'settings' }).lean();
    const portfolioName = settings && settings.portfolioName ? settings.portfolioName : 'Portfolio';
    const autoReplyOn = settings ? settings.sendVisitorAutoReply !== false : true;

    const tasks = [sendContactNotification({ ...data, createdAt: doc.createdAt, portfolioName })];
    if (autoReplyOn) tasks.push(sendVisitorConfirmation({ ...data, portfolioName }));

    const results = await Promise.all(tasks);
    email.notified = !!(results[0] && results[0].sent);
    email.confirmed = !!(results[1] && results[1].sent);

    // 3) Persist delivery status only when email is actually configured, so the
    //    admin list reflects notification outcomes without noisy no-op writes.
    if (results[0] && results[0].reason !== 'email-not-configured') {
      doc.notified = email.notified;
      doc.confirmed = email.confirmed;
      await doc.save();
    }
  } catch (err) {
    // Never leak email internals to the client; the message is safe in MongoDB.
    console.error('[contact] email pipeline error:', err && err.message ? String(err.message).slice(0, 200) : 'unknown');
  }

  return success(res, { id: doc._id, email }, 'Message received', 201);
});

/** GET /api/admin/messages — list with search + read filter + pagination. */
const list = asyncHandler(async (req, res) => {
  const { search, read, page = '1', limit = '20' } = req.query;
  const q = {};
  if (read === 'true') q.read = true;
  if (read === 'false') q.read = false;
  if (search) {
    const rx = new RegExp(escapeRegex(search), 'i');
    q.$or = ['name', 'email', 'subject', 'message'].map((f) => ({ [f]: rx }));
  }
  const lim = Math.min(parseInt(limit, 10), 100);
  const skip = (Math.max(parseInt(page, 10), 1) - 1) * lim;
  const [items, total, unread] = await Promise.all([
    M.ContactMessage.find(q).sort('-createdAt').skip(skip).limit(lim),
    M.ContactMessage.countDocuments(q),
    M.ContactMessage.countDocuments({ read: false }),
  ]);
  return success(res, { items, total, unread, page: Number(page), limit: lim });
});

const getOne = asyncHandler(async (req, res) => {
  const doc = await M.ContactMessage.findById(req.params.id);
  if (!doc) return failure(res, 'Not found', 404);
  return success(res, doc);
});

const markRead = asyncHandler(async (req, res) => {
  const doc = await M.ContactMessage.findByIdAndUpdate(
    req.params.id,
    { read: req.body.read !== false },
    { new: true }
  );
  if (!doc) return failure(res, 'Not found', 404);
  return success(res, doc, 'Updated');
});

const remove = asyncHandler(async (req, res) => {
  const doc = await M.ContactMessage.findByIdAndDelete(req.params.id);
  if (!doc) return failure(res, 'Not found', 404);
  return success(res, null, 'Deleted');
});

/** POST /api/admin/messages/:id/reply — send an admin reply via SendGrid. */
const reply = asyncHandler(async (req, res) => {
  const { body, subject } = validate(req.body, {
    body: { required: true, type: 'string', min: 1, max: 5000 },
    subject: { type: 'string', max: 200, default: '' },
  });

  const doc = await M.ContactMessage.findById(req.params.id);
  if (!doc) return failure(res, 'Not found', 404);

  const settings = await M.SiteSettings.findOne({ key: 'settings' }).lean();
  const portfolioName = settings && settings.portfolioName ? settings.portfolioName : 'Portfolio';
  const finalSubject =
    subject && subject.trim()
      ? subject
      : `Re: ${doc.subject && doc.subject.trim() ? doc.subject : 'your message'}`;

  const result = await sendAdminReply({
    to: doc.email,
    toName: doc.name,
    subject: finalSubject,
    text: body,
    portfolioName,
  });

  if (!result.sent) {
    if (result.reason === 'email-not-configured') {
      return failure(res, 'Email is not configured on the server', 503);
    }
    // The message remains unsent in MongoDB, but the admin needs a useful
    // action instead of a generic error when SendGrid rejects the request.
    console.error(`[contact] admin reply was not delivered: ${result.reason || 'email-provider-error'}`);
    if (result.statusCode === 401 || result.statusCode === 403) {
      return failure(res, 'SendGrid rejected the email. Verify the API key and that SENDGRID_FROM_EMAIL is a verified sender.', 502, result.reason);
    }
    return failure(res, 'SendGrid could not deliver the reply. Check the server logs and recipient address.', 502, result.reason);
  }

  doc.replies.push({ body, subject: finalSubject });
  doc.replied = true;
  doc.repliedAt = new Date();
  doc.read = true;
  await doc.save();

  return success(res, doc, 'Reply sent');
});

module.exports = { submit, list, getOne, markRead, remove, reply };
