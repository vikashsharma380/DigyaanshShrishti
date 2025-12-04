import express from "express";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// Add new appointment
router.post("/add", async (req, res) => {
  try {
    const newData = new Appointment(req.body);
    await newData.save();
    res.json({ success: true, message: "Saved", data: newData });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// Get all appointments
router.get("/list", async (req, res) => {
  try {
    const list = await Appointment.find().sort({ createdAt: -1 });
    res.json({ success: true, list });
  } catch (err) {
    res.json({ success: false });
  }
});

export default router;
