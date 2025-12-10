import mongoose from "mongoose";

const designationSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true }
  },
  { timestamps: true }
);

export default mongoose.models.DesignationList ||
  mongoose.model("DesignationList", designationSchema);
