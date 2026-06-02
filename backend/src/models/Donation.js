import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    donor: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    mode: {
      type: String,
      required: true,
      enum: ["UPI", "QR Payment", "Bank Transfer"],
      default: "UPI",
    },
    purpose: {
      type: String,
      trim: true,
      default: "General Donation",
    },
    status: {
      type: String,
      enum: ["Verified", "Pending Receipt", "Failed"],
      default: "Pending Receipt",
    },
  },
  {
    timestamps: true,
  }
);

const Donation = mongoose.model("Donation", donationSchema);

export default Donation;
