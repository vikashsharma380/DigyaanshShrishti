import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  title: String,
  desc: String,
});

export default mongoose.model("GalleryCompany", companySchema);
