import express from "express";
import {
  getSiteSettings,
  updateSiteSettings,
} from "../controllers/siteSettingController.js";
import requireAdminAuth from "../middleware/requireAdminAuth.js";

const router = express.Router();

router.get("/", getSiteSettings);
router.use(requireAdminAuth);
router.put("/", updateSiteSettings);

export default router;
