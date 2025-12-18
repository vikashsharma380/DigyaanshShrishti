import express from "express";
import upload from "../middleware/uploadS3.js";
import BsdmPage from "../models/BsdmPage.js";

const router = express.Router();

// GET page data
router.get("/bsdm", async (req, res) => {
  const page = await BsdmPage.findOne();
  res.json(page);
});


// UPDATE images
router.post(
  "/bsdm/add-image",
  upload.single("image"),
  async (req, res) => {
    const page = await BsdmPage.findOne() || new BsdmPage();

    page.heroImages.push(req.file.location);
    await page.save();

    res.json({ success: true, images: page.heroImages });
  }
);
router.delete("/bsdm/remove-image", async (req, res) => {
  const { imageUrl } = req.body;

  const page = await BsdmPage.findOne();
  page.heroImages = page.heroImages.filter(i => i !== imageUrl);
  await page.save();

  res.json({ success: true, images: page.heroImages });
});


export default router;
