// src/routes/userRoutes.js
import express from "express";
import auth from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

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
    skills: user.skills || [],
    education: user.education || [],
    experience: user.experience || [],
    projects: user.projects || [],
    applications: user.applications || [],
    appliedInternships: user.appliedInternships || [],
    savedInternships: user.savedInternships || [],
    resumeUrl: user.resumeUrl,
    preferences: user.preferences || {},
  };
};

// GET /api/user/profile - Get current user profile
router.get("/profile", auth, async (req, res) => {
  try {
    console.log("📋 Fetching user profile for:", req.user.id);
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      console.log("❌ User not found:", req.user.id);
      return res.status(404).json({ message: "User not found" });
    }
    console.log("✅ Profile fetched successfully for:", user.email);
    res.json(sanitizeUser(user));
  } catch (err) {
    console.error("❌ Profile fetch error:", err.message, err.stack);
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

// PUT /api/user/profile - Update user profile
router.put("/profile", auth, async (req, res) => {
  try {
    console.log("📝 Updating user profile for:", req.user.id);
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
      console.log("❌ User not found for update:", req.user.id);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ Profile updated successfully for:", user.email);
    res.json(sanitizeUser(user));
  } catch (err) {
    console.error("❌ Profile update error:", err.message, err.stack);
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

export default router;