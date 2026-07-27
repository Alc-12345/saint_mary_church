import Donation from "../models/Donation.js";
import { verifyAdminToken } from "../utils/adminAuth.js";

function titleCase(value = "") {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
}

function getAdminFromRequest(req) {
  if (req.admin) return req.admin;

  const authorizationHeader = req.headers.authorization || "";
  const [scheme, token] = authorizationHeader.split(" ");

  if (scheme !== "Bearer" || !token) return null;

  const payload = verifyAdminToken(token);
  if (!payload) return null;

  return {
    id: payload.adminId,
    email: payload.sub,
    name: payload.name,
    role: payload.role,
  };
}

export async function getAllDonations(req, res) {
  try {
    const onlyVisibleDonors = req.query.visible === "true";
    const query = onlyVisibleDonors
      ? { showOnDonorList: true, status: "Verified" }
      : {};

    const donations = await Donation.find(query).sort({ createdAt: -1 });

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

export async function updateDonation(req, res) {
  try {
    const updates = {};

    if (typeof req.body.purpose === "string") {
      const nextPurpose = titleCase(req.body.purpose);
      if (!nextPurpose) {
        return res.status(400).json({
          success: false,
          message: "Donation purpose is required.",
        });
      }
      updates.purpose = nextPurpose;
    }

    if (typeof req.body.showOnDonorList === "boolean") {
      updates.showOnDonorList = req.body.showOnDonorList;
    }

    const donation = await Donation.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Donation updated successfully.",
      data: donation,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to update donation.",
      error: error.message,
    });
  }
}

export async function createDonation(req, res) {
  try {
    const admin = getAdminFromRequest(req);
    const payload = {
      ...req.body,
      donor: titleCase(req.body.donor),
      purpose: req.body.purpose ? titleCase(req.body.purpose) : "General Donation",
    };

    if (admin?.id) {
      payload.createdByAdminId = admin.id;
      payload.createdByAdminName = titleCase(admin.name || admin.email || "Admin");
    }

    const donation = await Donation.create(payload);

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
    const adminName = titleCase(req.admin?.name || req.admin?.email || "Admin");
    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      {
        status: "Verified",
        verifiedByAdminId: req.admin?.id || null,
        verifiedByAdminName: adminName,
        verifiedAt: new Date(),
      },
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

export async function updateDonationDisplay(req, res) {
  try {
    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      { showOnDonorList: Boolean(req.body.showOnDonorList) },
      { new: true }
    );
    console.log("Updated:", donation);

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Donation display setting updated successfully.",
      data: donation,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to update donation display setting.",
      error: error.message,
    });
  }
}
export async function deleteDonation(req, res) {
  try {
    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      {
        isDeleted: true,
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Donation deleted.",
      data: donation,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
