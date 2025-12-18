import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: String,
  role: String,
  info: String,
  img: String, // S3 image URL
});

export default mongoose.model("GalleryTeam", teamSchema);
