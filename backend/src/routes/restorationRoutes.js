import express from "express";
import {
  createRestorationUpdate,
  deleteRestorationUpdate,
  getRestorationUpdates,
  publishRestorationUpdate,
} from "../controllers/restorationController.js";
import requireAdminAuth from "../middleware/requireAdminAuth.js";

const router = express.Router();

router.get("/", getRestorationUpdates);
router.use(requireAdminAuth);
router.post("/", createRestorationUpdate);
router.patch("/:id/publish", publishRestorationUpdate);
router.delete("/:id", deleteRestorationUpdate);

export default router;
