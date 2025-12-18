import mongoose from "mongoose";

const bsdmSchema = new mongoose.Schema({
  heroImages: [String],   // 🔥 slider images
});

export default mongoose.model("BsdmPage", bsdmSchema);

