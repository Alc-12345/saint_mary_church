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
      enum: ["UPI", "QR Payment", "Bank Transfer", "Cash"],
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
    showOnDonorList: {
      type: Boolean,
      default: false,
    },
    createdByAdminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
    createdByAdminName: {
      type: String,
      trim: true,
      default: "",
    },
    verifiedByAdminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
    verifiedByAdminName: {
      type: String,
      trim: true,
      default: "",
    },
    verifiedAt: {
      type: Date,
      default: null,
    },
    isDeleted: {
  type: Boolean,
  default: false,
},
    
  },
  {
    timestamps: true,
  }
);

const Donation = mongoose.model("Donation", donationSchema);

export default Donation;
