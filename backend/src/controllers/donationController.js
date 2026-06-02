import Donation from "../models/Donation.js";

export async function getAllDonations(req, res) {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: donations.length,
      data: donations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch donations.",
      error: error.message,
    });
  }
}

export async function createDonation(req, res) {
  try {
    const donation = await Donation.create(req.body);

    res.status(201).json({
      success: true,
      message: "Donation created successfully.",
      data: donation,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to create donation.",
      error: error.message,
    });
  }
}

export async function verifyDonation(req, res) {
  try {
    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      { status: "Verified" },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Donation verified successfully.",
      data: donation,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to verify donation.",
      error: error.message,
    });
  }
}
