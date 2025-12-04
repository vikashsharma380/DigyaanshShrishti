import express from "express";
import Sweeper from "../models/sweeper.js";
import User from "../models/User.js";

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

    const formatted = data.map((row) => {
      // Read toilets value from possible column names
      let toiletValue =
        row["Number of Toilet"] ||
        row["Number of Toilets"] ||
        row["No. of Toilet"] ||
        row["No Of Toilet"] ||
        row["Number of Toilet "] ||
        row["Toilet"] ||
        row["toilets"] ||
        row["Toilets"] ||
        0;

      // SAFE NUMBER CONVERSION
      let toilets = parseInt(toiletValue);

      if (isNaN(toilets)) toilets = 0; // fallback

      return {
        district: row["District"] || "",
        block: row["Block Name"]?.trim(),
        schoolName: row["School Name"]?.trim(),
        sweeperName: row["Sweeper Name"]?.trim(),
        toilets: toilets, // always safe
        accountNumber: row["Account Number"]?.toString().trim(),
        ifsc: row["IFSC Code"]?.trim(),
        salary: parseInt(row["Salary"]) || 0,
      };
    });

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

router.put("/update/:id", async (req, res) => {
  try {
    await Sweeper.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true, message: "Updated successfully!" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});
router.post("/add", async (req, res) => {
  try {
    console.log("Incoming Data => ", req.body); // 🔥 यह जोड़ो

    const newData = new Sweeper(req.body);
    await newData.save();

    res.json({ success: true, message: "Sweeper added", newData });

  } catch (err) {
    console.log("Sweeper Add Error => ", err); // 🔥 actual error बताएगा
    res.status(500).json({ success: false, message: err.message });
  }
});



export default router;
