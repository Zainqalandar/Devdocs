import mongoose, { Document, Schema } from "mongoose";

export interface IExample extends Document {
  section: mongoose.Types.ObjectId;
  topic: mongoose.Types.ObjectId;
  language: mongoose.Types.ObjectId;
  title: string;
  description: string;
  code: string;
  expectedOutput: string;
  codeLanguage: string; // 'javascript', 'python', 'html', etc.
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  isRunnable: boolean;
  order: number;
  isPublished: boolean;
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const ExampleSchema = new Schema<IExample>(
  {
    section: {
      type: Schema.Types.ObjectId,
      ref: "Section",
      required: [true, "Section reference is required"],
    },
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
      required: [true, "Example title is required"],
      trim: true,
      maxlength: [150, "Title cannot exceed 150 characters"],
    },
    description: {
      type: String,
      default: "",
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    code: {
      type: String,
      required: [true, "Code is required"],
    },
    expectedOutput: {
      type: String,
      default: "",
    },
    codeLanguage: {
      type: String,
      required: [true, "Code language is required"],
      lowercase: true,
      default: "javascript",
    },
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    tags: [{ type: String, trim: true }],
    isRunnable: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

ExampleSchema.index({ section: 1, order: 1 });
ExampleSchema.index({ language: 1, difficulty: 1 });
ExampleSchema.index({ tags: 1 });

export const Example = mongoose.model<IExample>("Example", ExampleSchema);
