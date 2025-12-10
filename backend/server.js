import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import appointmentRoutes from "./routes/appointmentRoutes.js";

dotenv.config();

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cors({
  origin: "*",
}));



app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Error:", err));

app.use("/api/appointments", appointmentRoutes);
import userRoutes from "./routes/userRoutes.js";
app.use("/api/users", userRoutes);
import authRoutes from "./routes/auth.js";

app.use("/api/auth", authRoutes);
import sweeperRoutes from "./routes/sweeper.js";
app.use("/api/sweeper", sweeperRoutes);
import experienceRoute from "./routes/experience.js";

app.use("/api/experience", experienceRoute);

import contactRoutes from "./routes/contact.js";
app.use("/api/contact", contactRoutes);
import districtRoutes from "./routes/district.js";
app.use("/api/district", districtRoutes);
import nightguardRoutes from "./routes/nightguard.js";
app.use("/api/nightguard", nightguardRoutes);
import notificationRoutes from "./routes/notification.js";
import designationRoutes from "./routes/designationRoutes.js";

app.use("/api/designations", designationRoutes);

app.use("/api/notifications", notificationRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});
