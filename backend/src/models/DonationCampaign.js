import mongoose from "mongoose";

const donationCampaignSchema = new mongoose.Schema(
  {
    purpose: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    targetAmount: {
      type: Number,
      required: true,
      min: 1,
    },
    accentColor: {
      type: String,
      trim: true,
      default: "#c89b5a",
    },
  },
  {
    timestamps: true,
  }
);

const DonationCampaign = mongoose.model(
  "DonationCampaign",
  donationCampaignSchema
);

export default DonationCampaign;
