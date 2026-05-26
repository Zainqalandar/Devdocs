import { Request, Response, NextFunction } from "express";
import { Topic } from "../models/Topic";
import { Language } from "../models/Language";
import { Section } from "../models/Section";
import { AppError } from "../middleware/errorHandler";
import { sendSuccess, sendError, getPaginationOptions, buildPagination, slugify } from "../types/apiResponse";

// GET /api/languages/:langSlug/topics
export const getTopicsByLanguage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const language = await Language.findOne({ slug: req.params.langSlug });
    if (!language) return next(new AppError("Language not found", 404));

    const { page, limit, skip } = getPaginationOptions(req.query as Record<string, unknown>);
    const filter: Record<string, unknown> = { language: language._id };
    const { published } = req.query;
    if (published === "true") filter.isPublished = true;
    else if (published === "false") filter.isPublished = false;

    const [topics, total] = await Promise.all([
      Topic.find(filter).sort({ order: 1 }).skip(skip).limit(limit),
      Topic.countDocuments(filter),
    ]);

    sendSuccess(res, topics, "Topics fetched successfully", 200, buildPagination(page, limit, total));
  } catch (error) {
    next(error);
  }
};

// GET /api/languages/:langSlug/topics/:topicSlug
export const getTopicBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const language = await Language.findOne({ slug: req.params.langSlug }).select("_id name slug");
    if (!language) return next(new AppError("Language not found", 404));

    const topic = await Topic.findOne({ language: language._id, slug: req.params.topicSlug });
    if (!topic) return next(new AppError("Topic not found", 404));

    const sections = await Section.find({ topic: topic._id, isPublished: true })
      .sort({ order: 1 })
      .select("title slug order readingTimeMinutes isFree");

    sendSuccess(res, { language, topic, sections }, "Topic fetched successfully");
  } catch (error) {
    next(error);
  }
};

// POST /api/languages/:langSlug/topics (admin only)
export const createTopic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const language = await Language.findOne({ slug: req.params.langSlug });
    if (!language) return next(new AppError("Language not found", 404));

    const { title, description, icon, order, isPublished } = req.body;
    if (!title) { sendError(res, "Title is required", 400); return; }

    const slug = slugify(title);
    const exists = await Topic.findOne({ language: language._id, slug });
    if (exists) { sendError(res, "Topic with this title already exists for this language", 409); return; }

    const topic = await Topic.create({
      language: language._id, title, slug,
      description: description || "", icon: icon || "book",
      order: order || 0, isPublished: isPublished || false,
    });

    // Update totalTopics count on language
    await Language.findByIdAndUpdate(language._id, { $inc: { totalTopics: 1 } });

    sendSuccess(res, topic, "Topic created successfully", 201);
  } catch (error) {
    next(error);
  }
};

// PATCH /api/languages/:langSlug/topics/:topicSlug (admin only)
export const updateTopic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const language = await Language.findOne({ slug: req.params.langSlug });
    if (!language) return next(new AppError("Language not found", 404));

    const topic = await Topic.findOneAndUpdate(
      { language: language._id, slug: req.params.topicSlug },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!topic) return next(new AppError("Topic not found", 404));
    sendSuccess(res, topic, "Topic updated successfully");
  } catch (error) {
    next(error);
  }
};

// DELETE /api/languages/:langSlug/topics/:topicSlug (admin only)
export const deleteTopic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const language = await Language.findOne({ slug: req.params.langSlug });
    if (!language) return next(new AppError("Language not found", 404));

    const topic = await Topic.findOne({ language: language._id, slug: req.params.topicSlug });
    if (!topic) return next(new AppError("Topic not found", 404));

    const sectionCount = await Section.countDocuments({ topic: topic._id });
    if (sectionCount > 0) {
      sendError(res, `Cannot delete. This topic has ${sectionCount} sections. Delete sections first.`, 400);
      return;
    }

    await Topic.deleteOne({ _id: topic._id });
    await Language.findByIdAndUpdate(language._id, { $inc: { totalTopics: -1 } });

    sendSuccess(res, null, "Topic deleted successfully");
  } catch (error) {
    next(error);
  }
};
