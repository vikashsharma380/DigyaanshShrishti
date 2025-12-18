import express from "express";
import upload from "../middleware/uploadS3.js";
import BsdmPage from "../models/BsdmPage.js";

const router = express.Router();

// GET page data
router.get("/", async (req, res) => {
  const data = await BsdmPage.findOne();
  res.json(data);
});

// UPDATE images
router.put(
  "/update",
  upload.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "sectionImage", maxCount: 1 },
  ]),
  async (req, res) => {
    let page = await BsdmPage.findOne();
    if (!page) page = new BsdmPage();

    if (req.files.heroImage) {
      page.heroImage = req.files.heroImage[0].location;
    }
    if (req.files.sectionImage) {
      page.sectionImage = req.files.sectionImage[0].location;
    }

    await page.save();
    res.json({ success: true, page });
  }
);

export default router;
