import mongoose from "mongoose";
import User from "./models/user.js";
import dotenv from "dotenv";
dotenv.config();

// ⭐ IMPORTANT — Use same DB as server.js
mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on("connected", () => {
  console.log("Connected to DB:", mongoose.connection.name);
});

async function createAdmin() {
  const adminExists = await User.findOne({ email: "admin@digi.com" });

  if (adminExists) {
    console.log("Admin already exists");
    return process.exit();
  }

  await User.create({
    name: "Super Admin",
    email: "admin@digi.com",
    password: "123456",
    designation: "Admin",
    mobile: "9999999999",
    access: "active",
  });

  console.log("Admin created successfully!");
  process.exit();
}

createAdmin();
