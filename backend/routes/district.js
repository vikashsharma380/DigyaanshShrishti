import express from "express";
import District from "../models/District.js";

const router = express.Router();

// ADD DISTRICT
router.post("/add-district", async (req, res) => {
  try {
    const { name } = req.body;
    const district = await District.create({ name, blocks: [] });
    res.json({ success: true, district });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// ADD BLOCK TO DISTRICT
router.post("/add-block", async (req, res) => {
  try {
    const { districtName, block } = req.body;

    const updated = await District.findOneAndUpdate(
      { name: districtName },
      { $push: { blocks: block } },
      { new: true }
    );

    res.json({ success: true, updated });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// GET ALL DISTRICTS + BLOCKS
router.get("/list", async (req, res) => {
  try {
    const list = await District.find();
    res.json({ success: true, list });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

export default router;
