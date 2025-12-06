import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema(
  {
    ref: String,
    date: String,
    name: String,
    father: String,
    address: String,
    designation: String,
    startDate: String,
    endDate: String,
    salary: String,
  },
  { timestamps: true }
);

export default mongoose.model("Experience", ExperienceSchema);
