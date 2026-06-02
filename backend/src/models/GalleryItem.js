import mongoose from "mongoose";

const galleryItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["Image", "Video"],
      default: "Image",
    },
    section: {
      type: String,
      enum: ["Before Fire", "After Fire"],
      default: "Before Fire",
    },
    imageUrl: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const GalleryItem = mongoose.model("GalleryItem", galleryItemSchema);

export default GalleryItem;
