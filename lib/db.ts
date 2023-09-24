import mongoose from 'mongoose';

export async function connectDb() {
  try {
    const db_uri = process.env.DB_URI as string;
    await mongoose.connect(db_uri);
  } catch (error) {
    console.log('error connecting db');
  }
}
