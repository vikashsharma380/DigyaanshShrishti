import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import appointmentRoutes from "./routes/appointmentRoutes.js";

dotenv.config();

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));


app.use(cors());
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


app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});
