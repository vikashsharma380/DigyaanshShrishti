import express from "express";
import NightGuard from "../models/nightguard.js";
import User from "../models/User.js";

const router = express.Router();

// Upload Excel
router.post("/upload-excel", async (req, res) => {
  try {
    const data = req.body.data;

    const formatted = data.map((row) => ({
      district: row["District"] || "",
      block: row["Block"] || row["Block Name"] || "",
      schoolName: row["School Name"] || "",
      guardName: row["Guard Name"] || "",
      
      accountNumber: String(row["Account Number"] || "").trim(),
      ifsc: row["IFSC Code"] || "",
      salary: parseInt(row["Salary"]) || 0,
      utrNumber: row["UTR Number"] || "",

    }));

    await NightGuard.insertMany(formatted);

    res.json({ message: "Night Guard Excel uploaded successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error uploading data" });
  }
});

// Get all
router.get("/all-data", async (req, res) => {
  try {
    const data = await NightGuard.find().sort({ block: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete one
router.delete("/delete/:id", async (req, res) => {
  try {
    await NightGuard.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted!" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// Delete all
router.delete("/delete-all", async (req, res) => {
  try {
    const result = await NightGuard.deleteMany({});
    res.json({
      success: true,
      message: "All night guard data deleted!",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// Supervisor filter (Block-based)
router.get("/supervisor-data/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const data = await NightGuard.find({ block: user.block });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
// ADD NEW NIGHT GUARD
router.post("/add", async (req, res) => {
  try {
    const newItem = new NightGuard({
      district: req.body.district || "",
      block: req.body.block || "",
      schoolName: req.body.schoolName || "",
      guardName: req.body.guardName || "",
      accountNumber: req.body.accountNumber || "",
      ifsc: req.body.ifsc || "",
      salary: req.body.salary || 0,
    });

    await newItem.save();

    res.json({ success: true, newData: newItem });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});
// UPDATE NIGHT GUARD DATA
router.put("/update/:id", async (req, res) => {
  try {
    const updated = await NightGuard.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ success: true, updated });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

export default router;
