import mongoose from "mongoose";

const NightGuardSchema = new mongoose.Schema({
  district: String,
  block: String,
  schoolName: String,
  guardName: String,
  dutyTime: String, // Night duties
  accountNumber: String,
  ifsc: String,
  salary: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("NightGuard", NightGuardSchema);
