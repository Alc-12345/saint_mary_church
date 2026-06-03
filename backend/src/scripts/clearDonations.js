import mongoose from "mongoose";
import "dotenv/config";
import Donation from "../models/Donation.js";

async function clearDonations() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.error("MONGODB_URI is missing in environment variables.");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    const result = await Donation.deleteMany({});
    console.log(`Deleted donations: ${result.deletedCount}`);
  } catch (error) {
    console.error("Unable to clear donations:", error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

clearDonations();
