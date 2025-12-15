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
       district: row["District Name"]?.trim(),
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
// DELETE SWEEPER
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await Sweeper.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.json({ success: false, message: "Not found" });

    res.json({ success: true, message: "Deleted!" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});


router.delete("/delete-all", async (req, res) => {
  try {
    const result = await Sweeper.deleteMany({});
    return res.status(200).json({
      success: true,
      message: "All sweeper data deleted!",
      deletedCount: result.deletedCount
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});


// DOWNLOAD district-wise Excel
router.get("/download/district/:district", async (req, res) => {
  try {
    const district = req.params.district;

    const data = await Sweeper.find({
     district: { $regex: `^${district}$`, $options: "i" }

    });

    if (data.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    const excelData = data.map((item) => ({
      "District Name": item.district,
      "Block Name": item.block,
      "School Name": item.schoolName,
      "Sweeper Name": item.sweeperName,
      "Number of Toilet": item.toilets,
      "Account Number": item.accountNumber,
      "IFSC Code": item.ifsc,
      "Salary": item.salary,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sweeper Data");

    const buffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${district}_data.xlsx`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.send(buffer);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Download failed" });
  }
});



export default router;
