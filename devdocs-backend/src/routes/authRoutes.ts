import { Router } from "express";
import {
  register,
  login,
  getMe,
  markSectionComplete,
  toggleBookmark,
  updateProfile,
} from "../controllers/authController";
import { protect } from "../middleware/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.use(protect);
router.get("/me", getMe);
router.patch("/me", updateProfile);
router.post("/progress", markSectionComplete);
router.post("/bookmark", toggleBookmark);

export default router;
