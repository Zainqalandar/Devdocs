import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { AppError } from "../middleware/errorHandler";
import { sendSuccess, sendError } from "../types/apiResponse";

const signToken = (id: string, role: string): string => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || "secret", {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  } as jwt.SignOptions);
};

// POST /api/auth/register
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      sendError(res, "name, email, and password are required", 400); return;
    }

    const exists = await User.findOne({ email });
    if (exists) { sendError(res, "Email already registered", 409); return; }

    const user = await User.create({ name, email, password });
    const token = signToken(String(user._id), user.role);

    sendSuccess(res, { token, user }, "Registered successfully", 201);
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/login
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) { sendError(res, "Email and password are required", 400); return; }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError("Invalid email or password", 401));
    }

    const token = signToken(String(user._id), user.role);
    const userObj = user.toJSON();

    sendSuccess(res, { token, user: userObj }, "Logged in successfully");
  } catch (error) {
    next(error);
  }
};

// GET /api/auth/me
export const getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.user?.id)
      .populate("completedSections.section", "title slug")
      .populate("bookmarkedSections", "title slug");
    if (!user) return next(new AppError("User not found", 404));
    sendSuccess(res, user, "Profile fetched");
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/progress - Mark section complete
export const markSectionComplete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { sectionId } = req.body;
    if (!sectionId) { sendError(res, "sectionId is required", 400); return; }

    const user = await User.findById(req.user?.id);
    if (!user) return next(new AppError("User not found", 404));

    const alreadyDone = user.completedSections.some((p) => String(p.section) === sectionId);
    if (alreadyDone) { sendSuccess(res, null, "Already marked as complete"); return; }

    user.completedSections.push({ section: sectionId as unknown as import("mongoose").Types.ObjectId, completedAt: new Date() });
    await user.save();

    sendSuccess(res, { completedCount: user.completedSections.length }, "Section marked as complete");
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/bookmark
export const toggleBookmark = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { sectionId } = req.body;
    if (!sectionId) { sendError(res, "sectionId is required", 400); return; }

    const user = await User.findById(req.user?.id);
    if (!user) return next(new AppError("User not found", 404));

    const idx = user.bookmarkedSections.findIndex((id) => String(id) === sectionId);
    let bookmarked: boolean;

    if (idx > -1) {
      user.bookmarkedSections.splice(idx, 1);
      bookmarked = false;
    } else {
      user.bookmarkedSections.push(sectionId as unknown as import("mongoose").Types.ObjectId);
      bookmarked = true;
    }
    await user.save();

    sendSuccess(res, { bookmarked }, bookmarked ? "Bookmarked" : "Bookmark removed");
  } catch (error) {
    next(error);
  }
};

// PATCH /api/auth/me - Update profile
export const updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const allowed = ["name", "avatar"];
    const updates: Record<string, unknown> = {};
    allowed.forEach((field) => { if (req.body[field] !== undefined) updates[field] = req.body[field]; });

    const user = await User.findByIdAndUpdate(req.user?.id, { $set: updates }, { new: true, runValidators: true });
    if (!user) return next(new AppError("User not found", 404));
    sendSuccess(res, user, "Profile updated");
  } catch (error) {
    next(error);
  }
};
