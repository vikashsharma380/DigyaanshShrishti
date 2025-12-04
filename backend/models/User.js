import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    fatherName: String,
    district: String,
    block: String,
    designation: {
      type: String,
      enum: ["Admin", "Supervisor", "Coordinator", "Staff", "Other"],
      default: "Supervisor",
    },
    aadhaar: String,
    mobile: String,
    email: { type: String, unique: true },
    password: String,
    address: String,
    gender: String,
    dob: String,

    bankDetails: {
      accountNumber: String,
      ifscCode: String,
      bankName: String,
    },

    access: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);


const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
