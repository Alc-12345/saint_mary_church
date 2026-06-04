import DonationCampaign from "../models/DonationCampaign.js";


export async function getDonationCampaigns(req, res) {
  try {
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
