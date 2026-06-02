import mongoose from "mongoose";
import { ensureDefaultAdmin } from "../utils/adminAuth.js";

async function connectDatabase() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is missing in environment variables.");
  }

  await mongoose.connect(mongoUri);
  await ensureDefaultAdmin();
  console.log("MongoDB connected successfully.");
}

export default connectDatabase;
