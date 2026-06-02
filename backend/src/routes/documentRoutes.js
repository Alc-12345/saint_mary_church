import express from "express";
import {
  createDocument,
  deleteDocument,
  getDocuments,
} from "../controllers/documentController.js";
import requireAdminAuth from "../middleware/requireAdminAuth.js";

const router = express.Router();

router.get("/", getDocuments);
router.use(requireAdminAuth);
router.post("/", createDocument);
router.delete("/:id", deleteDocument);

export default router;
