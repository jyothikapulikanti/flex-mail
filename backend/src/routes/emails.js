import express from "express";
import {
  getEmails,
  sendEmail,
  deleteEmail,
  moveEmail,
  toggleStar,
  markRead,
  editEmail
} from "../controllers/emailController.js";

const router = express.Router();

router.get("/", getEmails);
router.post("/", sendEmail);
router.delete("/:id", deleteEmail);
router.put("/:id/move", moveEmail);
router.put("/:id/star", toggleStar);
router.put("/:id/read", markRead);
router.put("/:id/edit", editEmail);

export default router;