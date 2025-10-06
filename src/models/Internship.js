import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: false, index: true, unique: false },
    datePosted: { type: Date },
    source: { type: String, default: "manual" },
    externalId: { type: String, index: true },
  },
  { timestamps: true }
);

// Helpful index to avoid duplicates when importing from external sources
internshipSchema.index({ url: 1 }, { unique: false, sparse: true });
internshipSchema.index({ source: 1, externalId: 1 }, { unique: true, sparse: true });

export default mongoose.model("Internship", internshipSchema);
