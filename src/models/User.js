// src/models/User.js
import mongoose from "mongoose";

// New, flexible sub-schemas with safe defaults
const ExperienceSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  company: { type: String, default: "" },
  startDate: { type: Date },
  endDate: { type: Date },
  description: { type: String, default: "" }
}, { _id: false });

const ProjectSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  description: { type: String, default: "" },
  url: { type: String, default: "" },
  tags: { type: [String], default: [] }
}, { _id: false });

const AppliedSchema = new mongoose.Schema({
  internshipId: { type: String },
  title: { type: String, default: "" },
  company: { type: String, default: "" },
  dateApplied: { type: Date, default: Date.now },
  status: { type: String, default: "applied" }
}, { _id: false });

const SavedSchema = new mongoose.Schema({
  internshipId: { type: String },
  title: { type: String, default: "" },
  company: { type: String, default: "" },
  url: { type: String, default: "" },
  savedAt: { type: Date, default: Date.now }
}, { _id: false });

const PreferencesSchema = new mongoose.Schema({
  keywords: { type: [String], default: [] },
  categories: { type: [String], default: [] },
  locations: { type: [String], default: [] },
  minStipend: { type: Number, default: 0 }
}, { _id: false });

const RecommendationSchema = new mongoose.Schema({
  internshipId: String,
  score: Number,
  recommendedAt: { type: Date, default: Date.now }
}, { _id: false });

const userSchema = new mongoose.Schema({
  // Core identity
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },

  // Local auth password (optional to allow social login accounts)
  password: { type: String, default: null },

  // Social auth metadata
  provider: { type: String, enum: ["local", "google", "github"], default: "local" },
  providerId: { type: String, default: null },
  avatar: { type: String, default: "" },

  // Profile fields
  headline: { type: String, default: "" },
  bio: { type: String, default: "" },
  location: { type: String, default: "" },
  resumeUrl: { type: String, default: "" },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],

  // Extended profile fields with defaults for backward compatibility
  skills: { type: [String], default: [] },
  education: { type: [String], default: [] },
  experience: { type: [ExperienceSchema], default: [] },
  projects: { type: [ProjectSchema], default: [] },
  appliedInternships: { type: [AppliedSchema], default: [] },
  savedInternships: { type: [SavedSchema], default: [] },
  interviews: { type: [String], default: [] },
  preferences: { type: PreferencesSchema, default: () => ({}) },
  recommendationHistory: { type: [RecommendationSchema], default: [] }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
