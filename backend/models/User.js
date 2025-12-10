import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    fatherName: String,
    district: String,
    block: String,
    designation: {
      type: String,
     
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
    roleType: { type: String, default: "sweeper" }

  },
  { timestamps: true }
);


const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
