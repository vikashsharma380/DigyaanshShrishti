import express from "express";
import DesignationList from "../models/DesignationList.js";

const router = express.Router();

// Add New Designation
router.post("/add", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.json({ success: false, message: "Required field missing" });

    const exist = await DesignationList.findOne({ name });
    if (exist) return res.json({ success: false, message: "Already exists" });

const newDesignation = await DesignationList.create({ name });
res.json({ success: true, message: "Designation added", designation: newDesignation });

  } catch (err) {
    res.json({ success: false, message: "Server error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const list = await DesignationList.find().sort({ name: 1 });

    const cleaned = list
      .filter(d => d && d.name)   // remove undefined, null and missing names
      .map(d => ({
        _id: d._id,
        name: d.name
      }));

    res.json({ success: true, list: cleaned });
  } catch {
    res.json({ success: false, message: "Error fetching designation list" });
  }
});




// DELETE DESIGNATION
router.delete("/delete/:id", async (req, res) => {
  try {
    await DesignationList.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

export default router;
