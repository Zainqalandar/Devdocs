import mongoose, { Document, Schema } from "mongoose";

export interface ILanguage extends Document {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  icon: string;
  color: string;
  category: "language" | "framework" | "library" | "database" | "tool";
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  version: string;
  officialWebsite: string;
  logoUrl: string;
  isPublished: boolean;
  order: number;
  totalTopics: number;
  totalExamples: number;
  createdAt: Date;
  updatedAt: Date;
}

const LanguageSchema = new Schema<ILanguage>(
  {
    name: {
      type: String,
      required: [true, "Language name is required"],
      unique: true,
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [5000, "Description cannot exceed 5000 characters"],
    },
    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      maxlength: [300, "Short description cannot exceed 300 characters"],
    },
    icon: {
      type: String,
      default: "code",
    },
    color: {
      type: String,
      default: "#F7DF1E",
      match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"],
    },
    category: {
      type: String,
      enum: ["language", "framework", "library", "database", "tool"],
      required: [true, "Category is required"],
    },
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    tags: [{ type: String, trim: true }],
    version: {
      type: String,
      default: "Latest",
    },
    officialWebsite: {
      type: String,
      default: "",
    },
    logoUrl: {
      type: String,
      default: "",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    totalTopics: {
      type: Number,
      default: 0,
    },
    totalExamples: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual: topics belonging to this language
LanguageSchema.virtual("topics", {
  ref: "Topic",
  localField: "_id",
  foreignField: "language",
});

// Index for fast search
LanguageSchema.index({ category: 1, isPublished: 1 });
LanguageSchema.index({ tags: 1 });

export const Language = mongoose.model<ILanguage>("Language", LanguageSchema);
