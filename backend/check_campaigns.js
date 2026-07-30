import mongoose from "mongoose";
import dotenv from "dotenv";
import DonationCampaign from "./src/models/DonationCampaign.js";
import { connectDatabase } from "./src/server.js";

dotenv.config();

async function check() {
  await mongoose.connect(process.env.MONGO_URI);
  const campaigns = await DonationCampaign.find();
  console.log("Campaigns:", campaigns);
  process.exit(0);
}
check();
