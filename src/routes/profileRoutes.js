// src/routes/profileRoutes.js
import express from "express";
import auth from "../middleware/auth.js";
import User from "../models/User.js";
import Internship from "../models/Internship.js";

const router = express.Router();

// GET /api/profile/me - current user profile (exclude password)
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("❌ Profile GET error:", err.message);
    res.status(500).json({ message: "Failed to load profile" });
  }
});

// PUT /api/profile/me - partial update
router.put("/me", auth, async (req, res) => {
  try {
    const allowed = [
      "headline","bio","location","resumeUrl","skills","education","experience","projects",
      "interviews","preferences"
    ];
    const update = {};
    for (const k of allowed) {
      if (req.body[k] !== undefined) update[k] = req.body[k];
    }
    const user = await User.findByIdAndUpdate(req.user.id, { $set: update }, { new: true }).select("-password");
    res.json(user);
  } catch (err) {
    console.error("❌ Profile PUT error:", err.message);
    res.status(400).json({ message: "Invalid profile update" });
  }
});

// POST /api/profile/me/save - save internship
router.post("/me/save", auth, async (req, res) => {
  try {
    const { internshipId, title, company, url } = req.body;
    if (!internshipId && !url) return res.status(400).json({ message: "internshipId or url required" });
    const user = await User.findById(req.user.id);
    const exists = user.savedInternships.some((i) => i.internshipId === internshipId || (url && i.url === url));
    if (!exists) user.savedInternships.unshift({ internshipId, title, company, url });
    await user.save();
    res.json({ savedInternships: user.savedInternships });
  } catch (err) {
    console.error("❌ Save internship error:", err.message);
    res.status(500).json({ message: "Failed to save internship" });
  }
});

// POST /api/profile/me/apply - record application
router.post("/me/apply", auth, async (req, res) => {
  try {
    const { internshipId, title, company } = req.body;
    if (!internshipId) return res.status(400).json({ message: "internshipId required" });
    const user = await User.findById(req.user.id);
    const exists = user.appliedInternships.some((i) => i.internshipId === internshipId);
    if (!exists) user.appliedInternships.unshift({ internshipId, title, company, dateApplied: new Date(), status: "applied" });
    await user.save();
    res.json({ appliedInternships: user.appliedInternships });
  } catch (err) {
    console.error("❌ Apply internship error:", err.message);
    res.status(500).json({ message: "Failed to record application" });
  }
});

export default router;


