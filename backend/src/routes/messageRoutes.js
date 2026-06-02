import express from "express";
import {
  createMessage,
  getMessages,
  markMessageReplied,
  markMessageResolved,
} from "../controllers/messageController.js";
import requireAdminAuth from "../middleware/requireAdminAuth.js";

const router = express.Router();

router.post("/", createMessage);
router.use(requireAdminAuth);
router.get("/", getMessages);
router.patch("/:id/reply", markMessageReplied);
router.patch("/:id/resolve", markMessageResolved);

export default router;
