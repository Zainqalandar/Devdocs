import { Router } from "express";
import {
  getSectionsByTopic,
  getSectionBySlug,
  createSection,
  updateSection,
  deleteSection,
} from "../controllers/sectionController";
import { protect, restrictTo } from "../middleware/auth";
import exampleRouter from "./exampleRoutes";
import quizRouter from "./quizRoutes";

const router = Router({ mergeParams: true });

router.use("/:sectionSlug/examples", exampleRouter);
router.use("/:sectionSlug/quiz", quizRouter);

router.get("/", getSectionsByTopic);
router.get("/:sectionSlug", getSectionBySlug);

router.use(protect, restrictTo("admin"));
router.post("/", createSection);
router.patch("/:sectionSlug", updateSection);
router.delete("/:sectionSlug", deleteSection);

export default router;
