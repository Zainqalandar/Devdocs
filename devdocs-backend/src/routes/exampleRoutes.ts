import { Router } from "express";
import {
  getExamplesBySection,
  getExampleById,
  createExample,
  updateExample,
  deleteExample,
  likeExample,
} from "../controllers/exampleController";
import { protect, restrictTo } from "../middleware/auth";

const router = Router({ mergeParams: true });

router.get("/", getExamplesBySection);
router.get("/:id", getExampleById);
router.post("/:id/like", likeExample);

router.use(protect, restrictTo("admin"));
router.post("/", createExample);
router.patch("/:id", updateExample);
router.delete("/:id", deleteExample);

export default router;
