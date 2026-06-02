import SiteSetting from "../models/SiteSetting.js";

export async function getSiteSettings(req, res) {
  try {
    let settings = await SiteSetting.findOne().sort({ createdAt: -1 });

    if (!settings) {
      settings = await SiteSetting.create({
        churchEmail: "support@saintmaryschurchajmer.com",
        donationPhone: "+91 9829071040",
        homeHeadline: "Saint Mary's Church CNI, Ajmer",
      });
    }

    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch site settings.",
      error: error.message,
    });
  }
}

export async function updateSiteSettings(req, res) {
  try {
    let settings = await SiteSetting.findOne().sort({ createdAt: -1 });

    if (!settings) {
      settings = await SiteSetting.create(req.body);
    } else {
      settings.churchEmail = req.body.churchEmail ?? settings.churchEmail;
      settings.donationPhone = req.body.donationPhone ?? settings.donationPhone;
      settings.homeHeadline = req.body.homeHeadline ?? settings.homeHeadline;
      await settings.save();
    }

    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to update site settings.",
      error: error.message,
    });
  }
}
