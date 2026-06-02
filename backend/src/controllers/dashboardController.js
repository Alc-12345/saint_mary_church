import Document from "../models/Document.js";
import Donation from "../models/Donation.js";
import GalleryItem from "../models/GalleryItem.js";
import Message from "../models/Message.js";

export async function getDashboardOverview(req, res) {
  try {
    const [donations, messages, galleryItems, documents] = await Promise.all([
      Donation.find().sort({ createdAt: -1 }),
      Message.find().sort({ createdAt: -1 }),
      GalleryItem.find().sort({ createdAt: -1 }),
      Document.find().sort({ createdAt: -1 }),
    ]);

    const totalAmount = donations.reduce((sum, item) => sum + item.amount, 0);

    res.status(200).json({
      success: true,
      data: {
        cards: [
          {
            label: "Total Donations",
            value: totalAmount,
            note: `${donations.length} donor records`,
          },
          {
            label: "Pending Receipts",
            value: donations.filter((item) => item.status !== "Verified").length,
            note: "Need review",
          },
          {
            label: "New Messages",
            value: messages.filter((item) => item.status === "New").length,
            note: `${messages.length} total inquiries`,
          },
          {
            label: "Active Updates",
            value: galleryItems.length + documents.length,
            note: "Gallery + Docs",
          },
        ],
        recentDonations: donations.slice(0, 4),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to load dashboard overview.",
      error: error.message,
    });
  }
}
