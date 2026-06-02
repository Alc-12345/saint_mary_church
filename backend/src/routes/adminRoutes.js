import express from "express";
import {
  createAdmin,
  deleteAdmin,
  getAdmins,
} from "../controllers/adminController.js";
import requireAdminAuth from "../middleware/requireAdminAuth.js";

const router = express.Router();

router.use(requireAdminAuth);
router.get("/", getAdmins);
router.post("/", createAdmin);
router.delete("/:id", deleteAdmin);

export default router;
