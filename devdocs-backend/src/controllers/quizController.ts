import { Request, Response, NextFunction } from "express";
import { Quiz } from "../models/Quiz";
import { Section } from "../models/Section";
import { Topic } from "../models/Topic";
import { Language } from "../models/Language";
import { AppError } from "../middleware/errorHandler";
import { sendSuccess, sendError } from "../types/apiResponse";

// GET /api/languages/:langSlug/topics/:topicSlug/sections/:sectionSlug/quiz
export const getQuizBySection = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const language = await Language.findOne({ slug: req.params.langSlug }).select("_id");
    if (!language) return next(new AppError("Language not found", 404));

    const topic = await Topic.findOne({ language: language._id, slug: req.params.topicSlug }).select("_id");
    if (!topic) return next(new AppError("Topic not found", 404));

    const section = await Section.findOne({ topic: topic._id, slug: req.params.sectionSlug }).select("_id");
    if (!section) return next(new AppError("Section not found", 404));

    const quiz = await Quiz.findOne({ section: section._id, isPublished: true })
      .select("-questions.correctOptionIndex -questions.explanation"); // Hide answers for users

    if (!quiz) return next(new AppError("No quiz found for this section", 404));

    sendSuccess(res, quiz, "Quiz fetched successfully");
  } catch (error) {
    next(error);
  }
};

// POST /api/languages/:langSlug/topics/:topicSlug/sections/:sectionSlug/quiz (admin)
export const createQuiz = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const language = await Language.findOne({ slug: req.params.langSlug });
    if (!language) return next(new AppError("Language not found", 404));

    const topic = await Topic.findOne({ language: language._id, slug: req.params.topicSlug });
    if (!topic) return next(new AppError("Topic not found", 404));

    const section = await Section.findOne({ topic: topic._id, slug: req.params.sectionSlug });
    if (!section) return next(new AppError("Section not found", 404));

    const exists = await Quiz.findOne({ section: section._id });
    if (exists) { sendError(res, "A quiz already exists for this section. Update it instead.", 409); return; }

    const { title, description, questions, passingScore, timeLimit, isPublished } = req.body;
    if (!title || !questions || questions.length === 0) {
      sendError(res, "title and at least one question are required", 400); return;
    }

    const quiz = await Quiz.create({
      section: section._id,
      topic: topic._id,
      language: language._id,
      title, description: description || "",
      questions, passingScore: passingScore || 70,
      timeLimit: timeLimit || 0,
      isPublished: isPublished || false,
    });

    sendSuccess(res, quiz, "Quiz created successfully", 201);
  } catch (error) {
    next(error);
  }
};

// PATCH /api/quiz/:id (admin)
export const updateQuiz = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!quiz) return next(new AppError("Quiz not found", 404));
    sendSuccess(res, quiz, "Quiz updated successfully");
  } catch (error) {
    next(error);
  }
};

// POST /api/quiz/:id/submit - User submits quiz answers
export const submitQuiz = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return next(new AppError("Quiz not found", 404));

    const { answers } = req.body; // Array of { questionId, selectedOptionIndex }
    if (!answers || !Array.isArray(answers)) {
      sendError(res, "answers array is required", 400); return;
    }

    let correct = 0;
    const results = quiz.questions.map((q) => {
      const userAnswer = answers.find((a: { questionId: string }) => String(a.questionId) === String(q._id));
      const isCorrect = userAnswer?.selectedOptionIndex === q.correctOptionIndex;
      if (isCorrect) correct++;
      return {
        questionId: q._id,
        question: q.question,
        selectedOptionIndex: userAnswer?.selectedOptionIndex ?? null,
        correctOptionIndex: q.correctOptionIndex,
        isCorrect,
        explanation: q.explanation,
      };
    });

    const score = Math.round((correct / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;

    // Increment attempt count
    Quiz.findByIdAndUpdate(quiz._id, { $inc: { totalAttempts: 1 } }).exec();

    sendSuccess(res, {
      score,
      passed,
      correct,
      total: quiz.questions.length,
      passingScore: quiz.passingScore,
      results,
    }, passed ? "Congratulations! You passed!" : "Keep practicing, you'll get it!");
  } catch (error) {
    next(error);
  }
};

// DELETE /api/quiz/:id (admin)
export const deleteQuiz = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return next(new AppError("Quiz not found", 404));
    sendSuccess(res, null, "Quiz deleted successfully");
  } catch (error) {
    next(error);
  }
};
