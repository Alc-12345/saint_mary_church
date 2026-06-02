import mongoose from "mongoose";

const restorationUpdateSchema = new mongoose.Schema(
  {
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
    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    imageUrl: {
      type: String,
      trim: true,
      default: "",
    },
    imageUrls: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const RestorationUpdate = mongoose.model(
  "RestorationUpdate",
  restorationUpdateSchema
);

export default RestorationUpdate;
