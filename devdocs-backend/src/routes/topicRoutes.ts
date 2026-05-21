import { Router } from "express";
import {
  getTopicsByLanguage,
  getTopicBySlug,
  createTopic,
  updateTopic,
  deleteTopic,
} from "../controllers/topicController";
import { protect, restrictTo } from "../middleware/auth";
import sectionRouter from "./sectionRoutes";

const router = Router({ mergeParams: true }); // mergeParams to access :langSlug

router.use("/:topicSlug/sections", sectionRouter);

router.get("/", getTopicsByLanguage);
router.get("/:topicSlug", getTopicBySlug);

router.use(protect, restrictTo("admin"));
router.post("/", createTopic);
router.patch("/:topicSlug", updateTopic);
router.delete("/:topicSlug", deleteTopic);

export default router;
