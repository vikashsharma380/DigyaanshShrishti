import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";


const router = express.Router();

const JWT_SECRET = "MY_SECRET_KEY";

router.post("/login", async (req, res) => {
  try {
    const { mobile, password } = req.body;

    if (!mobile || !password)
      return res.status(400).json({ message: "Mobile and password required" });

    const user = await User.findOne({ mobile });

    if (!user)
      return res.status(401).json({ message: "Invalid mobile or password" });

    if (password !== user.password)
      return res.status(401).json({ message: "Invalid mobile or password" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "2h",
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        mobile: user.mobile,
        designation: user.designation,
        block: user.block,
        access: user.access,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
