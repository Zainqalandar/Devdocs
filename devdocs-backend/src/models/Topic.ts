import mongoose, { Document, Schema } from "mongoose";

export interface ITopic extends Document {
  language: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  order: number;
  icon: string;
  isPublished: boolean;
  totalSections: number;
  createdAt: Date;
  updatedAt: Date;
}

const TopicSchema = new Schema<ITopic>(
  {
    language: {
      type: Schema.Types.ObjectId,
      ref: "Language",
      required: [true, "Language reference is required"],
    },
    title: {
      type: String,
      required: [true, "Topic title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    order: {
      type: Number,
      default: 0,
    },
    icon: {
      type: String,
      default: "book",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    totalSections: {
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

// Virtual: sections in this topic
TopicSchema.virtual("sections", {
  ref: "Section",
  localField: "_id",
  foreignField: "topic",
});

// Compound unique: same slug cannot repeat in same language
TopicSchema.index({ language: 1, slug: 1 }, { unique: true });
TopicSchema.index({ language: 1, order: 1 });
TopicSchema.index({ language: 1, isPublished: 1 });

export const Topic = mongoose.model<ITopic>("Topic", TopicSchema);
