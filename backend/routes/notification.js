import express from "express";
import Notification from "../models/Notification.js";
import User from "../models/User.js";

const router = express.Router();

// ---------- SEND NOTIFICATION ----------
router.post("/send", async (req, res) => {
  try {
    const { userId, message } = req.body;

    if (!message) {
      return res.json({ success: false, message: "Message required" });
    }

    // ✅ BROADCAST (ALL USERS)
    if (!userId) {
      const note = await Notification.create({
        message,
        userId: null, // 👈 IMPORTANT
      });

      return res.json({ success: true, notification: note });
    }

    // ✅ SINGLE USER
    const note = await Notification.create({ userId, message });
    res.json({ success: true, notification: note });

  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Error sending notification" });
  }
});



// ---------- GET ALL SENT (ADMIN) ----------
router.get("/admin/all", async (req, res) => {
  try {
    const list = await Notification.find().sort({ createdAt: -1 });
    res.json({ success: true, list });
  } catch {
    res.json({ success: false, message: "Error fetching notifications" });
  }
});


// ---------- DELETE NOTIFICATION ----------
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await Notification.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.json({ success: false, message: "Notification not found" });
    }
    res.json({ success: true, message: "Notification deleted successfully" });
  } catch (err) {
    res.json({ success: false, message: "Error deleting notification" });
  }
});


router.get("/user/:userId", async (req, res) => {
  try {
    const list = await Notification.find({
      $or: [
        { userId: req.params.userId }, // personal
        { userId: null },              // broadcast
      ],
    }).sort({ createdAt: -1 });

    res.json({ success: true, notifications: list });
  } catch (err) {
    res.json({ success: false, message: "Error fetching notifications" });
  }
});



export default router;
