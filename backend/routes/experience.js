import express from "express";
import Experience from "../models/Experience.js";

const router = express.Router();

// ADD EXPERIENCE
router.post("/add", async (req, res) => {
  try {
    const exp = new Experience(req.body);
    await exp.save();

    res.json({ success: true, message: "Experience saved successfully!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// LIST ALL EXPERIENCE
router.get("/list", async (req, res) => {
  try {
    const list = await Experience.find().sort({ createdAt: -1 });
    res.json({ success: true, list });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// DELETE EXPERIENCE
router.delete("/delete/:id", async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted successfully!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

export default router;
