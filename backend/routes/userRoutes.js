import express from "express";
import User from "../models/User.js";
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
      email: mobile,     // FIXED → store mobile as email field
      mobile: mobile,
      password: password,
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


export default router;
