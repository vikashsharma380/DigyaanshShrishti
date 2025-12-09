import express from "express";
import Notification from "../models/Notification.js";

const router = express.Router();



// ---------- GET USER NOTIFICATIONS ----------
router.get("/:userId", async (req, res) => {
  try {
    const list = await Notification.find({ userId: req.params.userId }).sort({
      createdAt: -1,
    });

    res.json({ success: true, notifications: list });
  } catch (err) {
    res.json({ success: false, message: "Error fetching notifications" });
  }
});

router.post("/send", async (req, res) => {
  try {
    const { userId, message } = req.body;

    if (!message) {
      return res.json({ success: false, message: "Message required" });
    }

    // SEND TO ALL USERS
    if (!userId) {
      const allUsers = await User.find({});
      await Promise.all(
        allUsers.map((u) =>
          Notification.create({ userId: u._id, message })
        )
      );

      return res.json({ success: true, message: "Broadcast sent!" });
    }

    // SEND TO SPECIFIC USER
    const note = await Notification.create({ userId, message });

    res.json({ success: true, notification: note });
  } catch (err) {
    res.json({ success: false, message: "Error sending notification" });
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

// GET ALL SENT NOTIFICATIONS (ADMIN)
router.get("/admin/all", async (req, res) => {
  try {
    const list = await Notification.find().sort({ createdAt: -1 });
    res.json({ success: true, list });
  } catch {
    res.json({ success: false, message: "Error fetching notifications" });
  }
});


export default router;
