import express from "express";
import Sweeper from "../models/sweeper.js";
import User from "../models/user.js";

const router = express.Router();

// GET sweeper data according to user block
router.get("/supervisor-data/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const data = await Sweeper.find({ block: user.block });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/upload-excel", async (req, res) => {
  try {
    const data = req.body.data;

    // Excel ke columns ko map karo
    const formatted = data.map((row) => ({
      block: row["Block Name"],
      schoolName: row["School Name"],
      sweeperName: row["Sweeper Name"],
      toilets: row["Number of Toilet"],
      accountNumber: row["Account Number"],
      ifsc: row["IFSC Code"],
      salary: row["Salary"]
    }));

    await Sweeper.insertMany(formatted);

    res.json({ message: "Excel data uploaded successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error uploading data" });
  }
});

// GET all sweeper data for admin
router.get("/all-data", async (req, res) => {
  try {
    const data = await Sweeper.find().sort({ block: 1 });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
