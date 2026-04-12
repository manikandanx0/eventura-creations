import mongoose from 'mongoose';

/**
 * Opens a single Mongoose connection using MONGODB_URI from the environment.
 */
export async function connectDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not set. Copy .env.example to .env and configure MongoDB.');
  }
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);
}
