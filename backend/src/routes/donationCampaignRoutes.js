import express from "express";
import {
  createDonationCampaign,
  deleteAllDonationCampaigns,
  deleteDonationCampaign,
  getDonationCampaigns,
  updateDonationCampaign,
} from "../controllers/donationCampaignController.js";
import requireAdminAuth from "../middleware/requireAdminAuth.js";

const router = express.Router();

router.get("/", getDonationCampaigns);
router.use(requireAdminAuth);
router.post("/", createDonationCampaign);
router.put("/:id", updateDonationCampaign);
router.delete("/", deleteAllDonationCampaigns);
router.delete("/:id", deleteDonationCampaign);

export default router;
