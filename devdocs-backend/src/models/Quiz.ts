import mongoose, { Document, Schema } from "mongoose";

export interface IQuizQuestion {
  _id?: mongoose.Types.ObjectId;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  order: number;
}

export interface IQuiz extends Document {
  section: mongoose.Types.ObjectId;
  topic: mongoose.Types.ObjectId;
  language: mongoose.Types.ObjectId;
  title: string;
  description: string;
  questions: IQuizQuestion[];
  passingScore: number; // percentage (e.g., 70 means 70%)
  timeLimit: number; // minutes, 0 = no limit
  isPublished: boolean;
  totalAttempts: number;
  createdAt: Date;
  updatedAt: Date;
}

const QuizQuestionSchema = new Schema<IQuizQuestion>(
  {
    question: {
      type: String,
      required: [true, "Question text is required"],
    },
    options: {
      type: [String],
      validate: {
        validator: (v: string[]) => v.length >= 2 && v.length <= 6,
        message: "Question must have between 2 and 6 options",
      },
    },
    correctOptionIndex: {
      type: Number,
      required: [true, "Correct option index is required"],
      min: 0,
    },
    explanation: {
      type: String,
      default: "",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { _id: true }
);

const QuizSchema = new Schema<IQuiz>(
  {
    section: {
      type: Schema.Types.ObjectId,
      ref: "Section",
      required: [true, "Section reference is required"],
    },
    topic: {
      type: Schema.Types.ObjectId,
      ref: "Topic",
    },
    language: {
      type: Schema.Types.ObjectId,
      ref: "Language",
      required: [true, "Language reference is required"],
    },
    title: {
      type: String,
      required: [true, "Quiz title is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    questions: [QuizQuestionSchema],
    passingScore: {
      type: Number,
      default: 70,
      min: 0,
      max: 100,
    },
    timeLimit: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    totalAttempts: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

QuizSchema.index({ section: 1 }, { unique: true });
QuizSchema.index({ language: 1, isPublished: 1 });

export const Quiz = mongoose.model<IQuiz>("Quiz", QuizSchema);
