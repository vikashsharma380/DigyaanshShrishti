import express from "express";
import User from "../models/User.js";
const router = express.Router();
function generateUserId(name) {
    const clean = name.split(" ")[0].toLowerCase();  
    const rand = Math.floor(100 + Math.random() * 900); 
    return clean + rand;
}
function generatePassword(dob, mobile) {
    if (!dob || !mobile) return "";
    const day = dob.slice(8, 10);  
    const month = dob.slice(5, 7);  
    const last2 = mobile.slice(-2); 
    return day + month + last2; 
}
router.post("/create", async (req, res) => {
    try {
        const userId = generateUserId(req.body.name);
        const password = generatePassword(req.body.dob, req.body.mobile);

        const newUser = new User({
            ...req.body,
            userId,
            password, 
        });

        await newUser.save();

        res.json({
            success: true,
            message: "User created",
            userId,
            password, 
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
export default router;
