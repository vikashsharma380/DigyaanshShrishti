import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    ref: String,
    date: String,
    name: String,
    
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
