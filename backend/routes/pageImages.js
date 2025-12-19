import express from "express";
import upload from "../middleware/uploadS3.js";
import PageImages from "../models/PageImages.js";

const router = express.Router();

/* ================= GET IMAGES ================= */
router.get("/:page", async (req, res) => {
  try {
    const doc = await PageImages.findOne({ page: req.params.page });
    res.json({ images: doc?.images || [] });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

/* ================= ADD IMAGE ================= */
router.post(
  "/:page/add-image",
  upload.single("image"),
  async (req, res) => {
    try {
      const page = req.params.page;

      let doc = await PageImages.findOne({ page });
      if (!doc) doc = new PageImages({ page, images: [] });

      doc.images.push(req.file.location);
      await doc.save();

      res.json({ success: true, images: doc.images });
    } catch (err) {
      res.status(500).json({ success: false });
    }
  }
);

/* ================= REMOVE IMAGE ================= */
router.delete("/:page/remove-image", async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const page = req.params.page;

    const doc = await PageImages.findOne({ page });
    doc.images = doc.images.filter((i) => i !== imageUrl);
    await doc.save();

    res.json({ success: true, images: doc.images });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

export default router;
