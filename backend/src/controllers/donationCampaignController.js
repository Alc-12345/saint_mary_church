import DonationCampaign from "../models/DonationCampaign.js";

const defaultCampaigns = [
  {
    purpose: "General Donation",
    title: "General Care Fund",
    description:
      "Daily church care, utilities, congregation support, and essential ministry needs.",
    targetAmount: 300000,
    accentColor: "#c89b5a",
  },
  {
    purpose: "Restoration Work",
    title: "Restoration Work",
    description:
      "Structural repair, roof recovery, woodwork renewal, and heritage restoration after the fire.",
    targetAmount: 500000,
    accentColor: "#d8b26e",
  },
  {
    purpose: "Emergency Support",
    title: "Emergency Support",
    description:
      "Urgent safety fixes, temporary protection, electrical work, and immediate response expenses.",
    targetAmount: 200000,
    accentColor: "#b77a52",
  },
  {
    purpose: "Prayer Offering",
    title: "Prayer Offering",
    description:
      "Special offerings for prayer services, memorial gatherings, and faith-centered community care.",
    targetAmount: 150000,
    accentColor: "#9f7d49",
  },
];

async function ensureDefaultCampaigns() {
  await Promise.all(
    defaultCampaigns.map((campaign) =>
      DonationCampaign.findOneAndUpdate(
        { purpose: campaign.purpose },
        { $setOnInsert: campaign },
        { upsert: true, new: true }
      )
    )
  );
}

export async function getDonationCampaigns(req, res) {
  try {
    await ensureDefaultCampaigns();
    const campaigns = await DonationCampaign.find().sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: campaigns.length,
      data: campaigns,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch donation campaigns.",
      error: error.message,
    });
  }
}

export async function createDonationCampaign(req, res) {
  try {
    const campaign = await DonationCampaign.create({
      purpose: req.body.purpose,
      title: req.body.title,
      description: req.body.description || "",
      targetAmount: req.body.targetAmount,
      accentColor: req.body.accentColor || "#c89b5a",
    });

    res.status(201).json({
      success: true,
      data: campaign,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to create donation campaign.",
      error: error.message,
    });
  }
}

export async function updateDonationCampaign(req, res) {
  try {
    const campaign = await DonationCampaign.findByIdAndUpdate(
      req.params.id,
      {
        purpose: req.body.purpose,
        title: req.body.title,
        description: req.body.description || "",
        targetAmount: req.body.targetAmount,
        accentColor: req.body.accentColor || "#c89b5a",
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: campaign,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to update donation campaign.",
      error: error.message,
    });
  }
}

export async function deleteDonationCampaign(req, res) {
  try {
    const campaign = await DonationCampaign.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: campaign,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to delete donation campaign.",
      error: error.message,
    });
  }
}
