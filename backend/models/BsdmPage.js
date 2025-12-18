import mongoose from "mongoose";

const bsdmPageSchema = new mongoose.Schema(
  {
    heroImage: String,
    sectionImage: String,
  },
  { timestamps: true }
);

export default mongoose.model("BsdmPage", bsdmPageSchema);
