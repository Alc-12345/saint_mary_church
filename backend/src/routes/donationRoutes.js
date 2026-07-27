import express from "express";
import {
  createDonation,
  getAllDonations,
  updateDonation,
  updateDonationDisplay,
  verifyDonation,
   deleteDonation,
  
} from "../controllers/donationController.js";
import requireAdminAuth from "../middleware/requireAdminAuth.js";

const router = express.Router();

router.get("/", getAllDonations);
router.post("/", createDonation);
router.patch("/:id", requireAdminAuth, updateDonation);
router.patch("/:id/verify", requireAdminAuth, verifyDonation);
router.patch("/:id/display", requireAdminAuth, updateDonationDisplay);
router.delete(
  "/:id",
  requireAdminAuth,
  deleteDonation
);

export default router;
