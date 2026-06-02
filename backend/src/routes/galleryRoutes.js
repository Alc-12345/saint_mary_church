import express from "express";
import {
  createGalleryItem,
  getGalleryItems,
} from "../controllers/galleryController.js";
import requireAdminAuth from "../middleware/requireAdminAuth.js";

const router = express.Router();

router.get("/", getGalleryItems);
router.use(requireAdminAuth);
router.post("/", createGalleryItem);

export default router;
