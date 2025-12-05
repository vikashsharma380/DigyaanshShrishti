import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const data = await Contact.create(req.body);
    res.json({ success: true, data });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});
router.get("/list", async (req, res) => {
  try {
    const list = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, list });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// DELETE MESSAGE
router.delete("/delete/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});
export default router;
