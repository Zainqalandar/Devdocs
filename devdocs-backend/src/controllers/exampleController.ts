import { Request, Response, NextFunction } from "express";
import { Example } from "../models/Example";
import { Section } from "../models/Section";
import { Topic } from "../models/Topic";
import { Language } from "../models/Language";
import { AppError } from "../middleware/errorHandler";
import { sendSuccess, sendError, getPaginationOptions, buildPagination } from "../types/apiResponse";

// GET /api/languages/:langSlug/topics/:topicSlug/sections/:sectionSlug/examples
export const getExamplesBySection = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const language = await Language.findOne({ slug: req.params.langSlug }).select("_id");
    if (!language) return next(new AppError("Language not found", 404));

    const topic = await Topic.findOne({ language: language._id, slug: req.params.topicSlug }).select("_id");
    if (!topic) return next(new AppError("Topic not found", 404));

    const section = await Section.findOne({ topic: topic._id, slug: req.params.sectionSlug }).select("_id");
    if (!section) return next(new AppError("Section not found", 404));

    const { page, limit, skip } = getPaginationOptions(req.query as Record<string, unknown>);

    const [examples, total] = await Promise.all([
      Example.find({ section: section._id, isPublished: true })
        .sort({ order: 1 })
        .skip(skip)
        .limit(limit),
      Example.countDocuments({ section: section._id, isPublished: true }),
    ]);

    sendSuccess(res, examples, "Examples fetched", 200, buildPagination(page, limit, total));
  } catch (error) {
    next(error);
  }
};

// GET /api/examples/:id
export const getExampleById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const example = await Example.findById(req.params.id)
      .populate("section", "title slug")
      .populate("topic", "title slug")
      .populate("language", "name slug color");
    if (!example) return next(new AppError("Example not found", 404));
    sendSuccess(res, example, "Example fetched");
  } catch (error) {
    next(error);
  }
};

// POST /api/languages/:langSlug/topics/:topicSlug/sections/:sectionSlug/examples (admin)
export const createExample = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const language = await Language.findOne({ slug: req.params.langSlug });
    if (!language) return next(new AppError("Language not found", 404));

    const topic = await Topic.findOne({ language: language._id, slug: req.params.topicSlug });
    if (!topic) return next(new AppError("Topic not found", 404));

    const section = await Section.findOne({ topic: topic._id, slug: req.params.sectionSlug });
    if (!section) return next(new AppError("Section not found", 404));

    const { title, description, code, expectedOutput, codeLanguage, difficulty, tags, isRunnable, order } = req.body;

    if (!title || !code) { sendError(res, "title and code are required", 400); return; }

    const example = await Example.create({
      section: section._id,
      topic: topic._id,
      language: language._id,
      title, description: description || "", code,
      expectedOutput: expectedOutput || "",
      codeLanguage: codeLanguage || "javascript",
      difficulty: difficulty || "beginner",
      tags: tags || [],
      isRunnable: isRunnable !== false,
      order: order || 0,
    });

    sendSuccess(res, example, "Example created successfully", 201);
  } catch (error) {
    next(error);
  }
};

// PATCH /api/examples/:id (admin)
export const updateExample = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const example = await Example.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!example) return next(new AppError("Example not found", 404));
    sendSuccess(res, example, "Example updated successfully");
  } catch (error) {
    next(error);
  }
};

// DELETE /api/examples/:id (admin)
export const deleteExample = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const example = await Example.findByIdAndDelete(req.params.id);
    if (!example) return next(new AppError("Example not found", 404));
    sendSuccess(res, null, "Example deleted successfully");
  } catch (error) {
    next(error);
  }
};

// POST /api/examples/:id/like
export const likeExample = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const example = await Example.findByIdAndUpdate(
      req.params.id,
      { $inc: { likeCount: 1 } },
      { new: true }
    );
    if (!example) return next(new AppError("Example not found", 404));
    sendSuccess(res, { likeCount: example.likeCount }, "Liked!");
  } catch (error) {
    next(error);
  }
};
