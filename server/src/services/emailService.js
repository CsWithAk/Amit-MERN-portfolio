/**
 * Centralized transactional email service — SendGrid Web API (official SDK).
 *
 * Design goals:
 *  - One place configures SendGrid (setApiKey) and builds every outbound email.
 *  - Professional, on-brand HTML templates with a plain-text alternative.
 *  - The verified SendGrid sender is ALWAYS the From address. The visitor's
 *    address is used as To / Reply-To only — never as From.
 *  - Every function resolves to a structured result instead of throwing for
 *    expected conditions (not configured / dry run / API error), so callers can
 *    distinguish "email failed" from "submission failed" and never lose data.
 *  - Logs are diagnostic but NEVER contain the API key or message body.
 */

const sgMail = require('@sendgrid/mail');
const env = require('../config/env');

let initialized = false;

/** Lazily configure the SDK once, only when credentials are present. */
function ensureInit() {
  if (!env.emailEnabled) return false;
  if (!initialized) {
    sgMail.setApiKey(env.sendgrid.apiKey);
    initialized = true;
  }
  return true;
}

/** Escape untrusted values before interpolating into HTML email templates. */
function escapeHtml(value = '') {
  return String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
  );
}

/** Convert plain text to safe HTML paragraphs (single source of truth). */
function textToHtml(value = '') {
  return escapeHtml(value).split(/\r?\n/).map((line) => `<p style="margin:0 0 12px">${line || '&nbsp;'}</p>`).join('');
}

const BRAND = {
  page: '#0B1020',
  card: '#141D30',
  border: 'rgba(148,163,184,0.18)',
  text: '#E2E8F0',
  muted: '#94A3B8',
  purple: '#8B5CF6',
  blue: '#38BDF8',
};

/** Branded HTML email shell shared by all templates. */
function layout({ title, intro, body = '', footer }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;padding:0;background:${BRAND.page};color:${BRAND.text};font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;line-height:1.55">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.page};padding:28px 14px">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${BRAND.card};border:1px solid ${BRAND.border};border-radius:16px;overflow:hidden">
            <tr>
              <td style="padding:22px 26px;background:linear-gradient(90deg,${BRAND.purple},${BRAND.blue})">
                <div style="font-size:18px;font-weight:700;color:#ffffff;letter-spacing:.2px">${escapeHtml(title)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:26px">
                ${intro ? `<p style="margin:0 0 18px;color:${BRAND.text};font-size:15px">${intro}</p>` : ''}
                ${body}
              </td>
            </tr>
            <tr>
              <td style="padding:16px 26px;border-top:1px solid ${BRAND.border};color:${BRAND.muted};font-size:12px">
                ${footer || ''}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/** A labelled key/value row used in the notification detail table. */
function detailRow(label, value) {
  if (!value) return '';
  return `<tr>
    <td style="padding:8px 12px;color:${BRAND.muted};font-size:12px;text-transform:uppercase;letter-spacing:.06em;white-space:nowrap;vertical-align:top">${escapeHtml(label)}</td>
    <td style="padding:8px 12px;color:${BRAND.text};font-size:14px;word-break:break-word">${escapeHtml(value)}</td>
  </tr>`;
}

/** A quote-style block for the visitor's message body (already HTML-escaped). */
function messageBlock(escapedMessage) {
  return `<div style="margin:18px 0 0;padding:16px 18px;background:${BRAND.page};border:1px solid ${BRAND.border};border-left:3px solid ${BRAND.blue};border-radius:10px;color:${BRAND.text};font-size:14px;white-space:pre-wrap;word-break:break-word">${escapedMessage}</div>`;
}

/**
 * Low-level SendGrid dispatch with graceful, non-leaky error handling.
 * Resolves to { sent, reason?, statusCode?, dryRun? }.
 */
async function dispatch(mail) {
  if (!ensureInit()) return { sent: false, reason: 'email-not-configured' };

  if (env.sendgrid.dryRun) {
    // Never hits the network — used for local runs / automated tests.
    console.log(`[email] dry-run: skipped send to=${mail.to} subject="${mail.subject}"`);
    return { sent: true, dryRun: true };
  }

  try {
    const [res] = await sgMail.send(mail);
    const statusCode = res && res.statusCode;
    const ok = !statusCode || (statusCode >= 200 && statusCode < 300);
    if (ok) return { sent: true, statusCode };
    console.warn(`[email] SendGrid returned non-2xx status=${statusCode} to=${mail.to}`);
    return { sent: false, statusCode, reason: `sendgrid-status-${statusCode}` };
  } catch (err) {
    // SendGrid errors expose response.status + code; the API key is never logged.
    const statusCode = err && err.response ? err.response.status : undefined;
    const code = err && err.code ? err.code : undefined;
    // Surface SendGrid's detailed reason (e.g. "Maximum credits exceeded",
    // "The from address does not belong to a verified sender") which lives in
    // the response body, not err.message (often just "Bad Request").
    let detail = '';
    try {
      const body = err && err.response && err.response.body;
      if (body) detail = typeof body === 'string' ? body : JSON.stringify(body);
    } catch (_) {
      /* ignore serialization issues */
    }
    const reasonText = (detail || (err && err.message) || 'unknown error').slice(0, 300);
    console.error(
      `[email] SendGrid send failed${statusCode ? ` status=${statusCode}` : ''}${code ? ` code=${code}` : ''}: ${reasonText}`
    );
    return { sent: false, statusCode, reason: statusCode ? `sendgrid-status-${statusCode}` : 'sendgrid-error' };
  }
}

function senderName(portfolioName) {
  return portfolioName ? `${portfolioName} (Portfolio)` : 'Portfolio Contact';
}

/**
 * Notify the site owner that a new contact message arrived.
 * Reply-To is the validated visitor email so the admin can reply in-thread.
 */
async function sendContactNotification({ name, email, subject, message, createdAt, portfolioName }) {
  const from = { email: env.sendgrid.fromEmail, name: senderName(portfolioName) };
  const received = new Date(createdAt || Date.now()).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const displaySubject = subject && subject.trim() ? subject : 'General inquiry';

  const html = layout({
    title: 'New contact message',
    intro: `You received a new message through your portfolio contact form.`,
    body: `
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid ${BRAND.border};border-radius:10px;margin:0 0 6px">
        ${detailRow('From', name)}
        ${detailRow('Email', email)}
        ${detailRow('Subject', displaySubject)}
        ${detailRow('Received', received)}
      </table>
      ${messageBlock(escapeHtml(message))}`,
    footer: `Sent by the portfolio contact system · Please do not share this address publicly.`,
  });

  const text = [
    'New contact message',
    '',
    `From: ${name}`,
    `Email: ${email}`,
    `Subject: ${displaySubject}`,
    `Received: ${received}`,
    '',
    'Message:',
    message,
  ].join('\n');

  return dispatch({
    from,
    to: env.contactReceiverEmail,
    replyTo: email,
    subject: `[Portfolio] ${displaySubject} — ${name}`,
    html,
    text,
    categories: ['portfolio-contact'],
  });
}

/**
 * Send a confirmation / auto-reply to the visitor. Only used when enabled.
 * Reply-To points at the admin receiver so the visitor's reply reaches the owner.
 */
async function sendVisitorConfirmation({ name, email, subject, portfolioName }) {
  const from = { email: env.sendgrid.fromEmail, name: senderName(portfolioName) };
  const displaySubject = subject && subject.trim() ? subject : 'your message';

  const html = layout({
    title: 'Thanks for reaching out',
    intro: `Hi ${escapeHtml(name || 'there')},`,
    body: `
      <p style="margin:0 0 12px;color:${BRAND.text};font-size:14px">
        Your message about <strong>${escapeHtml(displaySubject)}</strong> has been received.
        I read every inquiry and will get back to you as soon as possible.
      </p>
      <p style="margin:0;color:${BRAND.muted};font-size:13px">
        This is an automated confirmation — replies to this email go straight to my inbox.
      </p>`,
    footer: `${escapeHtml(portfolioName || 'Portfolio')} · Sent automatically in response to your submission.`,
  });

  const text = [
    `Hi ${name || 'there'},`,
    '',
    `Thanks for reaching out about "${displaySubject}". Your message has been received and I'll respond soon.`,
    '',
    'This is an automated confirmation.',
  ].join('\n');

  return dispatch({
    from,
    to: { email, name: name || undefined },
    replyTo: env.contactReceiverEmail,
    subject: 'Thanks for contacting me — message received',
    html,
    text,
    categories: ['portfolio-confirmation'],
  });
}

/**
 * Send an admin-authored reply to a visitor through SendGrid.
 * From is the verified sender; the visitor is the recipient; Reply-To is the owner inbox.
 */
async function sendAdminReply({ to, toName, subject, text, portfolioName }) {
  const from = { email: env.sendgrid.fromEmail, name: senderName(portfolioName) };
  const displaySubject = subject && subject.trim() ? subject : 'Re: your message';
  const replyBody = String(text || '');

  const html = layout({
    title: 'Re: your message',
    intro: `Hi ${escapeHtml(toName || 'there')},`,
    body: textToHtml(replyBody),
    footer: `${escapeHtml(portfolioName || 'Portfolio')} · This reply was sent from the portfolio contact inbox.`,
  });

  return dispatch({
    from,
    to: { email: to, name: toName || undefined },
    replyTo: env.contactReceiverEmail,
    subject: displaySubject.startsWith('Re:') ? displaySubject : `Re: ${displaySubject}`,
    html,
    text: replyBody,
    categories: ['portfolio-reply'],
  });
}

module.exports = {
  sendContactNotification,
  sendVisitorConfirmation,
  sendAdminReply,
  // Exposed for tests / diagnostics (no secrets).
  escapeHtml,
  isEmailConfigured: () => env.emailEnabled,
};
