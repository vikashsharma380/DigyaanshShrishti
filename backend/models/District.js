import mongoose from "mongoose";

const districtSchema = new mongoose.Schema({
  name: String,
  blocks: [String], // Multiple blocks inside a district
});

export default mongoose.model("District", districtSchema);
