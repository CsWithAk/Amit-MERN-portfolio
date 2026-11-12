require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const env = require('./config/env');
const { connectDB, isEphemeral } = require('./config/db');
const { notFound, errorHandler } = require('./middleware/error');

const publicRoutes = require('./routes/publicRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Fail fast if security-critical env vars are missing.
if (!env.jwtSecret) {
  console.error('[config] FATAL: JWT_SECRET must be set. Copy server/.env.example to server/.env and fill it in.');
  process.exit(1);
}

// Email (SendGrid) is an optional feature — the app still boots without it so
// the contact form keeps saving to MongoDB. Warn loudly on a partial config so
// misconfiguration is obvious, and log the resolved status once at startup.
const hasKey = Boolean(env.sendgrid.apiKey);
const hasFrom = Boolean(env.sendgrid.fromEmail);
if (env.emailEnabled) {
  console.log(`[config] Email via SendGrid Web API enabled (sender: ${env.sendgrid.fromEmail}).`);
} else if (hasKey !== hasFrom) {
  console.warn('[config] WARNING: SendGrid is partially configured — set BOTH SENDGRID_API_KEY and SENDGRID_FROM_EMAIL. Contact emails are disabled.');
} else {
  console.log('[config] Email disabled (SendGrid not configured). Contact submissions are still saved to MongoDB.');
}

const app = express();

// Security middleware
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
);
app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());

// Global, light rate limit (auth & contact have stricter limits in their routes).
app.use(
  '/api',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: env.isProd ? 500 : 5000,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.get('/api/health', (req, res) => res.json({ success: true, status: 'ok' }));

app.use('/api/public', publicRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.use(notFound);
app.use(errorHandler);

async function start() {
  try {
    await connectDB();

    // The dev fallback uses an in-memory MongoDB that is per-process, so the
    // `npm run seed` process cannot share data with this server process.
    // Auto-seed on boot when using the ephemeral database and it is empty.
    if (isEphemeral()) {
      const { seedAll } = require('./seed/seed');
      await seedAll();
    } else {
      console.log('[db] Persistent MongoDB connected; database content is authoritative and auto-seeding is disabled.');
    }

    app.listen(env.port, () => {
      console.log(`[server] API running on http://localhost:${env.port}`);
    });
  } catch (err) {
    console.error('[server] Failed to start:', err.message);
    process.exit(1);
  }
}

start();
