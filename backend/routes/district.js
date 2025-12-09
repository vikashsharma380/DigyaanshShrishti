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
router.delete("/delete-district/:name", async (req, res) => {
  try {
    const result = await District.findOneAndDelete({ name: req.params.name });

    if (!result) {
      return res.json({ success: false, message: "District not found" });
    }

    res.json({ success: true, message: "District deleted successfully" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

router.delete("/delete-block", async (req, res) => {
  try {
    const { districtName, block } = req.body;

    const result = await District.findOneAndUpdate(
      { name: districtName },
      { $pull: { blocks: block } },
      { new: true }
    );

    if (!result) {
      return res.json({ success: false, message: "District not found" });
    }

    res.json({ success: true, message: "Block deleted", updated: result });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});


export default router;
