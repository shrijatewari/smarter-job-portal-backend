// src/routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Helper: create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "fallback-secret-key", {
    expiresIn: "7d",
  });
};

// Helper: sanitize user object
const sanitizeUser = (user) => {
  if (!user) return null;
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    provider: user.provider,
    headline: user.headline,
    bio: user.bio,
    location: user.location,
    skills: user.skills,
    applications: user.applications,
    resumeUrl: user.resumeUrl,
  };
};

// Signup
router.post("/signup", async (req, res) => {
  try {
    console.log("📝 Signup attempt:", { email: req.body.email, name: req.body.name });
    const { name, email, password } = req.body;
    
    // Validation
    if (!name || !email || !password) {
      console.log("❌ Signup failed: Missing fields");
      return res.status(400).json({ message: "All fields are required: name, email, password" });
    }
    
    if (password.length < 6) {
      console.log("❌ Signup failed: Password too short");
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // Check if user already exists
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      console.log("❌ Signup failed: User already exists", email);
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // Hash password and create user
    const hashed = await bcrypt.hash(password, 12);
    const newUser = new User({ 
      name: name.trim(), 
      email: email.toLowerCase().trim(), 
      password: hashed,
      provider: "local"
    });
    await newUser.save();

    // Generate token
    const token = createToken(newUser._id);
    console.log("✅ Signup successful for:", newUser.email);
    res.status(201).json({ token, user: sanitizeUser(newUser) });
  } catch (err) {
    console.error("❌ Signup error:", err.message, err.stack);
    if (err.code === 11000) {
      // Duplicate key error
      res.status(400).json({ message: "User already exists with this email" });
    } else {
      res.status(500).json({ message: "Server error: " + err.message });
    }
  }
});

// Register (alias for signup)
router.post("/register", async (req, res) => {
  try {
    console.log("📝 Register attempt (redirecting to signup):", { email: req.body.email, name: req.body.name });
    const { name, email, password } = req.body;
    
    // Validation
    if (!name || !email || !password) {
      console.log("❌ Register failed: Missing fields");
      return res.status(400).json({ message: "All fields are required: name, email, password" });
    }
    
    if (password.length < 6) {
      console.log("❌ Register failed: Password too short");
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // Check if user already exists
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      console.log("❌ Register failed: User already exists", email);
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // Hash password and create user
    const hashed = await bcrypt.hash(password, 12);
    const newUser = new User({ 
      name: name.trim(), 
      email: email.toLowerCase().trim(), 
      password: hashed,
      provider: "local"
    });
    await newUser.save();

    // Generate token
    const token = createToken(newUser._id);
    console.log("✅ Register successful for:", newUser.email);
    res.status(201).json({ token, user: sanitizeUser(newUser) });
  } catch (err) {
    console.error("❌ Register error:", err.message, err.stack);
    if (err.code === 11000) {
      // Duplicate key error
      res.status(400).json({ message: "User already exists with this email" });
    } else {
      res.status(500).json({ message: "Server error: " + err.message });
    }
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    console.log("🔑 Login attempt:", { email: req.body.email });
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      console.log("❌ Login failed: Missing fields");
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      console.log("❌ Login failed: User not found", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if social login account
    if (!user.password) {
      console.log("❌ Login failed: Social account", email);
      return res.status(400).json({ message: "This account uses social login. Please sign in with Google or GitHub." });
    }

    // Verify password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log("❌ Login failed: Wrong password", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = createToken(user._id);
    console.log("✅ Login successful for:", user.email);
    res.json({ token, user: sanitizeUser(user) });
  } catch (err) {
    console.error("❌ Login error:", err.message, err.stack);
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

// Get Profile (protected)
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(sanitizeUser(user));
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update Profile (protected)
router.put("/profile", auth, async (req, res) => {
  try {
    console.log("📝 Updating profile for user:", req.user.id);
    console.log("📝 Update data:", req.body);
    
    const updates = (({ name, headline, bio, location, resumeUrl, skills, education, experience, projects, preferences }) => ({
      name,
      headline,
      bio,
      location,
      resumeUrl,
      skills,
      education, 
      experience,
      projects,
      preferences
    }))(req.body);

    // Remove undefined values
    Object.keys(updates).forEach(key => {
      if (updates[key] === undefined) {
        delete updates[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ Profile updated successfully for user:", user.email);
    res.json(sanitizeUser(user));
  } catch (err) {
    console.error("❌ Profile update error:", err.message, err.stack);
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

export default router;
