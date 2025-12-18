import mongoose from "mongoose";

const pageImagesSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
    unique: true, // ek page ka ek hi record
  },
  images: {
    type: [String],
    default: [],
  },
});

export default mongoose.model("PageImages", pageImagesSchema);
