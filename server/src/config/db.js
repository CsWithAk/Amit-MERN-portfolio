const mongoose = require('mongoose');
const env = require('./env');

let memoryServer = null;
let usingEphemeral = false;

function isEphemeral() {
  return usingEphemeral;
}

/**
 * Connect to MongoDB.
 * 1. Use MONGODB_URI (MongoDB Atlas) when provided.
 * 2. In development, fall back to an in-memory MongoDB so the app is
 *    instantly runnable and testable without external services.
 */
async function connectDB() {
  mongoose.set('strictQuery', true);

  if (env.mongoUri) {
    try {
      await mongoose.connect(env.mongoUri, { serverSelectionTimeoutMS: 8000 });
      console.log('[db] Connected to MongoDB (MONGODB_URI)');
      return;
    } catch (err) {
      if (env.isProd) throw err;
      console.warn('[db] Atlas connection failed:', err.message);
    }
  }

  if (env.isProd) {
    throw new Error('MONGODB_URI is required in production.');
  }

  // Development fallback: in-memory MongoDB
  let MongoMemoryServer;
  try {
    ({ MongoMemoryServer } = require('mongodb-memory-server'));
  } catch {
    throw new Error(
      'No MONGODB_URI configured and mongodb-memory-server is not installed. ' +
      'Set MONGODB_URI in server/.env to a MongoDB Atlas connection string.'
    );
  }
  usingEphemeral = true;
  memoryServer = await MongoMemoryServer.create({ instance: { dbName: 'portfolio' } });
  await mongoose.connect(memoryServer.getUri('portfolio'));
  console.log('[db] Connected to in-memory MongoDB (development fallback)');
}

async function disconnectDB() {
  await mongoose.disconnect();
  if (memoryServer) await memoryServer.stop();
}

module.exports = { connectDB, disconnectDB, isEphemeral };
