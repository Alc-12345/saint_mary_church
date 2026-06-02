import mongoose from "mongoose";

const siteSettingSchema = new mongoose.Schema(
  {
    churchEmail: {
      type: String,
      trim: true,
      default: "",
    },
    donationPhone: {
      type: String,
      trim: true,
      default: "",
    },
    homeHeadline: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const SiteSetting = mongoose.model("SiteSetting", siteSettingSchema);

export default SiteSetting;
