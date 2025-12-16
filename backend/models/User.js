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
    email: { type: String, unique: true, sparse: true, trim: true },
    password: String,
    address: String,
    gender: String,
    dob: {
      type: Date
    },

    bankDetails: {
      accountNumber: String,
      ifscCode: String,
      bankName: String,
    },

    access: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    roleType: { type: String, default: "sweeper" },

    forcePasswordChange: {
    type: Boolean,
    default: true   
  }

  },
  { timestamps: true }
);


const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
