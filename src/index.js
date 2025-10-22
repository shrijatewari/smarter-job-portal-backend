// src/index.js
import dotenv from "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import passport from "./services/passport.js";

// Routes
import authRoutes from "./routes/auth.js";
import oauthRoutes from "./routes/oauth.js";
import userRoutes from "./routes/userRoutes.js";
import internshipRoutes from "./routes/internshipRoutes.js";
import jsearchRoutes from "./routes/jsearchRoutes.js";
import aiRoutes from "./routes/ai.js";
import profileRoutes from "./routes/profileRoutes.js";
import recommendRoutes from "./routes/recommendRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import skillsRoutes from "./routes/skillsRoutes.js";
import rouletteRoutes from "./routes/rouletteRoutes.js";
import testRoutes from "./routes/testRoutes.js";

const app = express();

// --- Middleware ---
app.use(morgan("dev")); // request logging
app.use(express.json()); // parse JSON
// CORS configuration with proper origins for OAuth
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL || "http://localhost:3000",
    "https://accounts.google.com",
    "https://github.com"
  ],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};
app.use(cors(corsOptions));
app.use(passport.initialize());

// --- Health Check ---
app.get("/", (req, res) => {
  try {
    res.status(200).json({ status: "ok", message: "🚀 Smarter Job Portal API is running!" });
  } catch (err) {
    res.status(500).json({ error: "Health check failed" });
  }
});

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/auth", oauthRoutes); // OAuth endpoints (google/github)
app.use("/api/user", userRoutes); // User profile endpoints
app.use("/api/internships", internshipRoutes);
app.use("/api/jsearch", jsearchRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/internships", recommendRoutes); // Recommendations under internships
app.use("/api/analytics", analyticsRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/tests", testRoutes);
// Roulette routes - register with specific paths to avoid conflicts
app.use("/api/internships", rouletteRoutes); // For /api/internships/random
app.use("/api/preferences", rouletteRoutes); // For /api/preferences/save
app.use("/api/users", rouletteRoutes); // For /api/users/:id/saved-internships

// --- 404 Handler ---
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// --- Global Error Handler ---
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// --- MongoDB Connection ---
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || "mongodb://localhost:27017/smarter-job-portal";
    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // exit process if DB fails
  }
};

// --- Start Server ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await connectDB();
});
