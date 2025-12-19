import express from "express";
import upload from "../middleware/uploadS3.js";
import GalleryCompany from "../models/GalleryCompany.js";
import GalleryTeam from "../models/GalleryTeam.js";

const router = express.Router();

/* ================= COMPANY ================= */

// GET
router.get("/company", async (req, res) => {
  const list = await GalleryCompany.find();
  res.json(list);
});

// ADD
router.post("/company", async (req, res) => {
  const item = await GalleryCompany.create(req.body);
  res.json({ success: true, item });
});

// DELETE
router.delete("/company/:id", async (req, res) => {
  await GalleryCompany.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

/* ================= TEAM ================= */

// GET
router.get("/team", async (req, res) => {
  const list = await GalleryTeam.find();
  res.json(list);
});

// ADD
router.post("/team", upload.single("image"), async (req, res) => {
  const member = await GalleryTeam.create({
    ...req.body,
    img: req.file.location,
  });
  res.json({ success: true, member });
});

// DELETE
router.delete("/team/:id", async (req, res) => {
  await GalleryTeam.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
