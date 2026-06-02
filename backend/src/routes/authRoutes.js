import express from "express";
import { getCurrentAdmin, loginAdmin } from "../controllers/authController.js";
import requireAdminAuth from "../middleware/requireAdminAuth.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/me", requireAdminAuth, getCurrentAdmin);

export default router;
