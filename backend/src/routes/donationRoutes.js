import express from "express";
import {
  createDonation,
  getAllDonations,
  verifyDonation,
} from "../controllers/donationController.js";

const router = express.Router();

router.get("/", getAllDonations);
router.post("/", createDonation);
router.patch("/:id/verify", verifyDonation);

export default router;
