const mongoose = require('mongoose');

/** Singleton document holding global, configurable design + animation + SEO settings. */
const siteSettingsSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'settings', unique: true, index: true },

    // General
    portfolioName: { type: String, trim: true, default: "Amit's Portfolio" },
    logo: { type: String, default: '' },
    favicon: { type: String, default: '' },
    contactEmail: { type: String, trim: true, default: '' },
    // When on, a SendGrid confirmation/auto-reply is sent to visitors after they
    // submit the contact form (the admin notification always attempts).
    sendVisitorAutoReply: { type: Boolean, default: true },
    footerContent: { type: String, trim: true, default: '' },
    copyrightText: { type: String, trim: true, default: '' },

    // Appearance
    appearance: {
      theme: { type: String, enum: ['dark', 'light'], default: 'dark' },
      primaryColor: { type: String, default: '#8B5CF6' },
      secondaryColor: { type: String, default: '#38BDF8' },
      accentColor: { type: String, default: '#A78BFA' },
      background: { type: String, default: '#080B14' },
      secondaryBackground: { type: String, default: '#101626' },
      cardBackground: { type: String, default: '#141D30' },
      primaryText: { type: String, default: '#F8FAFC' },
      secondaryText: { type: String, default: '#94A3B8' },
      borderColor: { type: String, default: 'rgba(148,163,184,0.15)' },
      fontFamily: { type: String, default: 'Poppins' },
      borderRadius: { type: Number, default: 16 },
      cardStyle: { type: String, enum: ['glass', 'solid', 'outline'], default: 'glass' },
    },

    // Animation settings
    animation: {
      multiCursorEnabled: { type: Boolean, default: false },
      cursorActors: { type: Number, default: 3, min: 1, max: 8 },
      intensity: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
      typingSpeed: { type: Number, default: 60, min: 20, max: 150 },
      revealSpeed: { type: Number, default: 600, min: 200, max: 1500 },
      reducedMotion: { type: Boolean, default: false },
      sectionAnimations: { type: Boolean, default: true },
    },

    // SEO
    seo: {
      pageTitle: { type: String, default: 'Portfolio | Amit Kumar' },
      metaDescription: { type: String, default: '' },
      keywords: { type: String, default: '' },
      ogImage: { type: String, default: '' },
      author: { type: String, default: 'Amit Kumar' },
      ogTitle: { type: String, default: '' },
      ogDescription: { type: String, default: '' },
      twitterCard: { type: String, enum: ['summary', 'summary_large_image'], default: 'summary_large_image' },
      canonicalUrl: { type: String, default: '' },
      robots: { type: String, default: 'index, follow' },
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
