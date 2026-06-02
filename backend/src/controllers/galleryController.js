import GalleryItem from "../models/GalleryItem.js";

export async function getGalleryItems(req, res) {
  try {
    const items = await GalleryItem.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch gallery items.",
      error: error.message,
    });
  }
}

export async function createGalleryItem(req, res) {
  try {
    const item = await GalleryItem.create({
      title: req.body.title,
      type: req.body.type || "Image",
      section: req.body.section || "Before Fire",
      imageUrl: req.body.imageUrl || "",
    });
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to create gallery item.",
      error: error.message,
    });
  }
}
