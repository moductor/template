import mongoose from "mongoose";

const dbUrl = process.env.MONGO_URL || "mongodb://mongo:27017/";

let db: typeof mongoose | undefined;
export async function connect(dbName: string): Promise<void> {
  if (db) return;
  db = await mongoose.connect(dbUrl, { dbName });
}
