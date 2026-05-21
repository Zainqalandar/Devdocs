import mongoose, { Document, Schema } from "mongoose";

// Individual content block (text, code, note, warning, table, etc.)
export interface IContentBlock {
  type:
    | "text"
    | "code"
    | "note"
    | "warning"
    | "tip"
    | "table"
    | "image"
    | "heading"
    | "list"
    | "quiz_prompt";
  content: string;
  language?: string; // for code blocks: 'javascript', 'python', etc.
  caption?: string;
  items?: string[]; // for list type
  headers?: string[]; // for table type
  rows?: string[][]; // for table type
  order: number;
}

export interface ISection extends Document {
  topic: mongoose.Types.ObjectId;
  language: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  metaDescription: string;
  contentBlocks: IContentBlock[];
  order: number;
  isPublished: boolean;
  isFree: boolean;
  readingTimeMinutes: number;
  viewCount: number;
  nextSection?: mongoose.Types.ObjectId;
  prevSection?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ContentBlockSchema = new Schema<IContentBlock>(
  {
    type: {
      type: String,
      enum: ["text", "code", "note", "warning", "tip", "table", "image", "heading", "list", "quiz_prompt"],
      required: true,
    },
    content: { type: String, required: true },
    language: { type: String, default: "" },
    caption: { type: String, default: "" },
    items: [{ type: String }],
    headers: [{ type: String }],
    rows: [[{ type: String }]],
    order: { type: Number, required: true, default: 0 },
  },
  { _id: true }
);

const SectionSchema = new Schema<ISection>(
  {
    topic: {
      type: Schema.Types.ObjectId,
      ref: "Topic",
      required: [true, "Topic reference is required"],
    },
    language: {
      type: Schema.Types.ObjectId,
      ref: "Language",
      required: [true, "Language reference is required"],
    },
    title: {
      type: String,
      required: [true, "Section title is required"],
      trim: true,
      maxlength: [150, "Title cannot exceed 150 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      lowercase: true,
      trim: true,
    },
    metaDescription: {
      type: String,
      default: "",
      maxlength: [300, "Meta description cannot exceed 300 characters"],
    },
    contentBlocks: [ContentBlockSchema],
    order: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    isFree: {
      type: Boolean,
      default: true,
    },
    readingTimeMinutes: {
      type: Number,
      default: 5,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    nextSection: {
      type: Schema.Types.ObjectId,
      ref: "Section",
      default: null,
    },
    prevSection: {
      type: Schema.Types.ObjectId,
      ref: "Section",
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual: examples attached to this section
SectionSchema.virtual("examples", {
  ref: "Example",
  localField: "_id",
  foreignField: "section",
});

// Virtual: quiz for this section
SectionSchema.virtual("quiz", {
  ref: "Quiz",
  localField: "_id",
  foreignField: "section",
});

SectionSchema.index({ topic: 1, slug: 1 }, { unique: true });
SectionSchema.index({ language: 1, isPublished: 1 });
SectionSchema.index({ topic: 1, order: 1 });
SectionSchema.index(
  { title: "text", metaDescription: "text" },
  { language_override: "languageOverride" }
); // Full-text search

export const Section = mongoose.model<ISection>("Section", SectionSchema);
