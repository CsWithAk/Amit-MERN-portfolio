const path = require('node:path');

// Resolve the server env file from this module's location rather than from
// process.cwd(). Root commands such as `npm run dev` start the server with the
// project root as cwd, while the actual credentials live in server/.env.
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  clientUrl: process.env.FRONTEND_URL || process.env.CLIENT_URL || 'http://localhost:5173',

  // Admin (single administrator — no registration anywhere)
  adminUsername: process.env.ADMIN_USERNAME || '',
  adminPasswordHash: process.env.ADMIN_PASSWORD_HASH || '',

  // JWT
  jwtSecret: process.env.JWT_SECRET || '',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',

  // Database
  mongoUri: process.env.MONGODB_URI || '',

  // Cloudinary
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
    api_key: process.env.CLOUDINARY_API_KEY || '',
    api_secret: process.env.CLOUDINARY_API_SECRET || '',
  },

  // SendGrid Web API (transactional email for the contact form + admin replies).
  // Uses the official @sendgrid/mail SDK — NO SMTP transport is configured.
  sendgrid: {
    // Support the existing legacy variable typo until deployment env is renamed.
    apiKey: process.env.SENDGRID_API_KEY || process.env.sSENDGRID_API_KEY || '',
    fromEmail: process.env.SENDGRID_FROM_EMAIL || '',
    // Optional: log instead of sending (never hits the network). Useful locally/CI.
    dryRun: String(process.env.SENDGRID_DRY_RUN || '').toLowerCase() === 'true',
  },
  contactReceiverEmail: process.env.CONTACT_RECEIVER_EMAIL || '',
};

env.isProd = env.nodeEnv === 'production';
// Email is an optional feature: the contact form still saves to MongoDB when
// SendGrid is not configured. The admin receiver defaults to the verified sender.
env.contactReceiverEmail = env.contactReceiverEmail || env.sendgrid.fromEmail;
env.emailEnabled = Boolean(env.sendgrid.apiKey && env.sendgrid.fromEmail);

module.exports = env;
