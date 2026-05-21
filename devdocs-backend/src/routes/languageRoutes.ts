import { Router } from "express";
import {
  getAllLanguages,
  getLanguageBySlug,
  createLanguage,
  updateLanguage,
  deleteLanguage,
  getLanguageStats,
} from "../controllers/languageController";
import { protect, restrictTo } from "../middleware/auth";

// Topic & Section routes nested under language
import topicRouter from "./topicRoutes";

const router = Router();

router.use("/:langSlug/topics", topicRouter);

router.get("/stats", getLanguageStats);
router.get("/", getAllLanguages);
router.get("/:slug", getLanguageBySlug);

router.use(protect, restrictTo("admin"));
router.post("/", createLanguage);
router.patch("/:slug", updateLanguage);
router.delete("/:slug", deleteLanguage);

export default router;
