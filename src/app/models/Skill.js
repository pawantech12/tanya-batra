import mongoose from "mongoose";

const categories = [
  "Backend Development",
  "Frontend Development",
  "Databases",
  "Tools & Infrastructure",
  "Additional Skills",
];

const SkillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: categories,
      default: "Additional Skills",
    },
    description: {
      type: String,
      required: true,
      trim: true,
      default: "Development Technology",
    },
  },
  { timestamps: true },
);

export default mongoose.models.Skill || mongoose.model("Skill", SkillSchema);
