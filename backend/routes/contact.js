import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const data = await Contact.create(req.body);
    res.json({ success: true, data });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

export default router;
