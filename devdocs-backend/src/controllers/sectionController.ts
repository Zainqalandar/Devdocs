import { Request, Response, NextFunction } from "express";
import { Section } from "../models/Section";
import { Topic } from "../models/Topic";
import { Language } from "../models/Language";
import { AppError } from "../middleware/errorHandler";
import { sendSuccess, sendError, getPaginationOptions, buildPagination, slugify } from "../types/apiResponse";

// GET /api/languages/:langSlug/topics/:topicSlug/sections
export const getSectionsByTopic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const language = await Language.findOne({ slug: req.params.langSlug }).select("_id");
    if (!language) return next(new AppError("Language not found", 404));

    const topic = await Topic.findOne({ language: language._id, slug: req.params.topicSlug }).select("_id");
    if (!topic) return next(new AppError("Topic not found", 404));

    const { page, limit, skip } = getPaginationOptions(req.query as Record<string, unknown>);

    const [sections, total] = await Promise.all([
      Section.find({ topic: topic._id, isPublished: true })
        .sort({ order: 1 })
        .skip(skip)
        .limit(limit)
        .select("title slug order readingTimeMinutes isFree viewCount nextSection prevSection"),
      Section.countDocuments({ topic: topic._id, isPublished: true }),
    ]);

    sendSuccess(res, sections, "Sections fetched", 200, buildPagination(page, limit, total));
  } catch (error) {
    next(error);
  }
};

// GET /api/languages/:langSlug/topics/:topicSlug/sections/:sectionSlug
export const getSectionBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const language = await Language.findOne({ slug: req.params.langSlug }).select("_id name slug color");
    if (!language) return next(new AppError("Language not found", 404));

    const topic = await Topic.findOne({ language: language._id, slug: req.params.topicSlug }).select("_id title slug");
    if (!topic) return next(new AppError("Topic not found", 404));

    const section = await Section.findOne({ topic: topic._id, slug: req.params.sectionSlug })
      .populate("nextSection", "title slug")
      .populate("prevSection", "title slug");

    if (!section) return next(new AppError("Section not found", 404));

    // Increment view count (fire and forget)
    Section.findByIdAndUpdate(section._id, { $inc: { viewCount: 1 } }).exec();

    sendSuccess(res, { language, topic, section }, "Section fetched successfully");
  } catch (error) {
    next(error);
  }
};

// POST /api/languages/:langSlug/topics/:topicSlug/sections (admin only)
export const createSection = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const language = await Language.findOne({ slug: req.params.langSlug });
    if (!language) return next(new AppError("Language not found", 404));

    const topic = await Topic.findOne({ language: language._id, slug: req.params.topicSlug });
    if (!topic) return next(new AppError("Topic not found", 404));

    const {
      title, metaDescription, contentBlocks, order,
      isPublished, isFree, readingTimeMinutes
    } = req.body;

    if (!title) { sendError(res, "Title is required", 400); return; }

    const slug = slugify(title);
    const exists = await Section.findOne({ topic: topic._id, slug });
    if (exists) { sendError(res, "Section with this title already exists in this topic", 409); return; }

    const section = await Section.create({
      topic: topic._id,
      language: language._id,
      title, slug,
      metaDescription: metaDescription || "",
      contentBlocks: contentBlocks || [],
      order: order || 0,
      isPublished: isPublished || false,
      isFree: isFree !== false,
      readingTimeMinutes: readingTimeMinutes || 5,
    });

    // Update counts
    await Topic.findByIdAndUpdate(topic._id, { $inc: { totalSections: 1 } });
    await Language.findByIdAndUpdate(language._id, { $inc: { totalExamples: 1 } });

    // Auto-link prev/next sections
    const prevSection = await Section.findOne({ topic: topic._id, order: { $lt: section.order }, isPublished: true })
      .sort({ order: -1 });
    const nextSection = await Section.findOne({ topic: topic._id, order: { $gt: section.order }, isPublished: true })
      .sort({ order: 1 });

    if (prevSection) {
      await Section.findByIdAndUpdate(section._id, { prevSection: prevSection._id });
      await Section.findByIdAndUpdate(prevSection._id, { nextSection: section._id });
    }
    if (nextSection) {
      await Section.findByIdAndUpdate(section._id, { nextSection: nextSection._id });
      await Section.findByIdAndUpdate(nextSection._id, { prevSection: section._id });
    }

    sendSuccess(res, section, "Section created successfully", 201);
  } catch (error) {
    next(error);
  }
};

// PATCH /api/languages/:langSlug/topics/:topicSlug/sections/:sectionSlug (admin only)
export const updateSection = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const language = await Language.findOne({ slug: req.params.langSlug }).select("_id");
    if (!language) return next(new AppError("Language not found", 404));

    const topic = await Topic.findOne({ language: language._id, slug: req.params.topicSlug }).select("_id");
    if (!topic) return next(new AppError("Topic not found", 404));

    const section = await Section.findOneAndUpdate(
      { topic: topic._id, slug: req.params.sectionSlug },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!section) return next(new AppError("Section not found", 404));
    sendSuccess(res, section, "Section updated successfully");
  } catch (error) {
    next(error);
  }
};

// DELETE /api/languages/:langSlug/topics/:topicSlug/sections/:sectionSlug (admin only)
export const deleteSection = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const language = await Language.findOne({ slug: req.params.langSlug }).select("_id");
    if (!language) return next(new AppError("Language not found", 404));

    const topic = await Topic.findOne({ language: language._id, slug: req.params.topicSlug }).select("_id");
    if (!topic) return next(new AppError("Topic not found", 404));

    const section = await Section.findOneAndDelete({ topic: topic._id, slug: req.params.sectionSlug });
    if (!section) return next(new AppError("Section not found", 404));

    await Topic.findByIdAndUpdate(topic._id, { $inc: { totalSections: -1 } });

    sendSuccess(res, null, "Section deleted successfully");
  } catch (error) {
    next(error);
  }
};

// GET /api/search?q=...&lang=...
export const searchSections = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { q, lang } = req.query;
    if (!q) { sendError(res, "Search query 'q' is required", 400); return; }

    const filter: Record<string, unknown> = {
      isPublished: true,
      $text: { $search: String(q) },
    };

    if (lang) {
      const language = await Language.findOne({ slug: lang }).select("_id");
      if (language) filter.language = language._id;
    }

    const sections = await Section.find(filter, { score: { $meta: "textScore" } })
      .sort({ score: { $meta: "textScore" } })
      .limit(20)
      .select("title slug metaDescription readingTimeMinutes")
      .populate("topic", "title slug")
      .populate("language", "name slug color");

    sendSuccess(res, sections, `Found ${sections.length} results`);
  } catch (error) {
    next(error);
  }
};
