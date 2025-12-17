import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

import { formatPostcssSourceMap } from "vite";
const router = express.Router();
router.post("/create", async (req, res) => {
  try {
    const { name, mobile, password } = req.body;

    if (!mobile || !password) {
      return res.json({
        success: false,
        message: "Mobile number and password are required",
      });
    }

    const exists = await User.findOne({ mobile });
    if (exists) {
      return res.json({
        success: false,
        message: "User already exists with this mobile number",
      });
    }

    const newUser = new User({
      ...req.body,
      userId: mobile,   
      email: email,     // FIXED → store mobile as email field
      mobile: mobile,
      password: password,
      forcePasswordChange: true,
    });

    await newUser.save();

    res.json({
      success: true,
      message: "User created successfully",
    });

  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

router.get("/list", async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.json({ success: true, users });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

// DELETE USER
router.delete("/delete/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.json({ success: false, message: "User not found" });

    res.json({ success: true, message: "User deleted!" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// EDIT USER
router.put("/update/:id", async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) return res.json({ success: false, message: "User not found" });

    res.json({ success: true, updated });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.json({ success: false });

    res.json({ success: true, user });
  } catch (err) {
    res.json({ success: false });
  }
});

router.put("/update-all-status", async (req, res) => {
  try {
    const { status } = req.body;

    // admin users ko skip kar do
    await User.updateMany(
      { role: { $ne: "admin" } },
      { $set: { access: status } }
    );

    res.json({ success: true, message: "Updated all users" });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});
router.put("/update-role/:id", async (req, res) => {
  try {
    const { roleType } = req.body;

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { roleType },
      { new: true }
    );

    if (!updated)
      return res.json({ success: false, message: "User not found" });

    res.json({ success: true, message: "Role updated", user: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// UPDATE ALL USERS ROLE TYPE
router.put("/update-all-roles", async (req, res) => {
  try {
    const { roleType } = req.body;

    if (!roleType) {
      return res.json({ success: false, message: "Role type required" });
    }

    // Update all except admins
    const result = await User.updateMany(
      { designation: { $ne: "Admin" } },
      { roleType }
    );

    res.json({ success: true, updated: result.modifiedCount });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

router.post("/bulk-upload", async (req, res) => {
  try {
    const { users } = req.body;
    if (!users || users.length === 0)
      return res.json({ success: false });
function parseDOB(dob) {
  if (!dob) return null;

  // trim safety
  if (typeof dob === "string") {
    dob = dob.trim();
  }

  // ✅ CASE 1: Excel serial number (34380)
  if (typeof dob === "number") {
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    return new Date(excelEpoch.getTime() + dob * 86400000);
  }

  // ✅ CASE 2: DD-MM-YYYY
  if (/^\d{2}-\d{2}-\d{4}$/.test(dob)) {
    const [dd, mm, yyyy] = dob.split("-");
    return new Date(`${yyyy}-${mm}-${dd}`);
  }

  // ✅ CASE 3: YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
    return new Date(dob);
  }

  // ✅ CASE 4: M/D/YY or MM/DD/YYYY (EXCEL DEFAULT)
  if (/^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(dob)) {
    const [m, d, y] = dob.split("/");
    const yyyy = y.length === 2 ? `19${y}` : y; // 94 → 1994
    return new Date(`${yyyy}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`);
  }

  return null;
}


  const prepared = users.map((u) => {
    console.log("RAW DOB:", u.dob, "PARSED:", parseDOB(u.dob));
  const obj = {
    name: u.name,
    fatherName: u.fatherName,
    gender: u.gender,
    dob: parseDOB(u.dob),

    mobile: u.mobile,
    aadhaar: u.aadhaar,
    district: u.district,
    block: u.block,
    designation: u.designation,
    address: u.address,
    password: u.password || "123456",

    bankDetails: {
      accountNumber: u.accountNumber || "",
      ifscCode: u.ifscCode || "",
      bankName: u.bankName || "",
    },

    access: "inactive",
    roleType: "sweeper",
  };

  // ⭐ EMAIL ONLY IF EXISTS
  if (u.email && u.email.trim() !== "") {
    obj.email = u.email.trim();
  }

  return obj;
});


    const inserted = await User.insertMany(prepared, {
      ordered: false,
    });

    res.json({
      success: true,
      inserted: inserted.length,
      users: inserted,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, error: err.message });
  }
});
router.delete("/delete-all-users", async (req, res) => {
  try {
    // ❌ DO NOT DELETE SUPER ADMIN
    const result = await User.deleteMany({
      designation: { $ne: "Admin" } // Admin safe
    });

    res.json({
      success: true,
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to delete users",
    });
  }
});



// ================= ADMIN LOGIN AS USER =================
router.post("/admin-login-as-user/:id", async (req, res) => {
  try {
    // ⚠️ Yahan ideally admin auth middleware hona chahiye
    // Abhi simple check kar rahe hain

    const adminToken = req.headers.authorization?.split(" ")[1];
    if (!adminToken) {
      return res.status(401).json({ success: false, message: "No token" });
    }

    const decoded = jwt.verify(adminToken, "MY_SECRET_KEY");

    const adminUser = await User.findById(decoded.id);
    if (!adminUser || adminUser.designation !== "Admin") {
      return res
        .status(403)
        .json({ success: false, message: "Not allowed" });
    }

    // 🎯 Target user
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // ✅ Create USER token
    const token = jwt.sign(
      {
        id: user._id,
        impersonatedBy: adminUser._id, // ⭐ optional
      },
      "MY_SECRET_KEY",
      { expiresIn: "2h" }
    );

    res.json({
      success: true,
      token,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
