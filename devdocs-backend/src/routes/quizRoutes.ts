import { Router } from "express";
import {
  getQuizBySection,
  getAdminQuizBySection,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuiz,
} from "../controllers/quizController";
import { protect, restrictTo } from "../middleware/auth";

const router = Router({ mergeParams: true });

router.get("/manage", protect, restrictTo("admin"), getAdminQuizBySection);
router.get("/", getQuizBySection);
router.post("/:id/submit", submitQuiz);

router.use(protect, restrictTo("admin"));
router.post("/", createQuiz);
router.patch("/:id", updateQuiz);
router.delete("/:id", deleteQuiz);

export default router;
