import { Request, Response, NextFunction } from "express";
import { Language } from "../models/Language";
import { Topic } from "../models/Topic";
import { AppError } from "../middleware/errorHandler";
import {
  sendSuccess,
  sendError,
  getPaginationOptions,
  buildPagination,
  slugify,
} from "../types/apiResponse";

// GET /api/languages
export const getAllLanguages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page, limit, skip } = getPaginationOptions(req.query as Record<string, unknown>);
    const { category, difficulty, search, published } = req.query;

    const filter: Record<string, unknown> = {};
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (published !== undefined) filter.isPublished = published === "true";
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(String(search), "i")] } },
        { shortDescription: { $regex: search, $options: "i" } },
      ];
    }

    const [languages, total] = await Promise.all([
      Language.find(filter)
        .sort({ order: 1, name: 1 })
        .skip(skip)
        .limit(limit)
        .select("-description"), // Short listing, no full description
      Language.countDocuments(filter),
    ]);

    sendSuccess(res, languages, "Languages fetched successfully", 200, buildPagination(page, limit, total));
  } catch (error) {
    next(error);
  }
};

// GET /api/languages/:slug
export const getLanguageBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const language = await Language.findOne({ slug: req.params.slug });
    if (!language) return next(new AppError("Language not found", 404));

    // Get topics for this language
    const topics = await Topic.find({ language: language._id, isPublished: true })
      .sort({ order: 1 })
      .select("title slug description order totalSections icon");

    sendSuccess(res, { language, topics }, "Language fetched successfully");
  } catch (error) {
    next(error);
  }
};

// POST /api/languages (admin only)
export const createLanguage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      name, description, shortDescription, icon, color,
      category, difficulty, tags, version, officialWebsite,
      logoUrl, isPublished, order,
    } = req.body;

    if (!name || !description || !shortDescription || !category) {
      sendError(res, "name, description, shortDescription, and category are required", 400);
      return;
    }

    const slug = slugify(name);

    const existing = await Language.findOne({ slug });
    if (existing) {
      sendError(res, `Language with name "${name}" already exists`, 409);
      return;
    }

    const language = await Language.create({
      name, slug, description, shortDescription,
      icon, color, category, difficulty,
      tags: tags || [], version, officialWebsite,
      logoUrl, isPublished: isPublished || false, order: order || 0,
    });

    sendSuccess(res, language, "Language created successfully", 201);
  } catch (error) {
    next(error);
  }
};

// PATCH /api/languages/:slug (admin only)
export const updateLanguage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const language = await Language.findOneAndUpdate(
      { slug: req.params.slug },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!language) return next(new AppError("Language not found", 404));
    sendSuccess(res, language, "Language updated successfully");
  } catch (error) {
    next(error);
  }
};

// DELETE /api/languages/:slug (admin only)
export const deleteLanguage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const language = await Language.findOne({ slug: req.params.slug });
    if (!language) return next(new AppError("Language not found", 404));

    // Check if topics exist
    const topicCount = await Topic.countDocuments({ language: language._id });
    if (topicCount > 0) {
      sendError(res, `Cannot delete. This language has ${topicCount} topics. Delete topics first.`, 400);
      return;
    }

    await Language.deleteOne({ _id: language._id });
    sendSuccess(res, null, "Language deleted successfully");
  } catch (error) {
    next(error);
  }
};

// GET /api/languages/stats
export const getLanguageStats = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const stats = await Language.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
          published: { $sum: { $cond: ["$isPublished", 1, 0] } },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const total = await Language.countDocuments();
    const published = await Language.countDocuments({ isPublished: true });

    sendSuccess(res, { total, published, byCategory: stats }, "Stats fetched");
  } catch (error) {
    next(error);
  }
};
