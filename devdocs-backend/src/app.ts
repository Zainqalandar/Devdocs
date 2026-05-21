import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";

import languageRoutes from "./routes/languageRoutes";
import authRoutes from "./routes/authRoutes";
import { searchSections } from "./controllers/sectionController";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";

const app: Application = express();

// ── Security & utility middleware ───────────────────────────────────────────
app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests. Please try again later." },
});
app.use("/api", limiter);

// Body parsing
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV !== "test") {
  app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));
}

// ── Health check ────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "DevDocs API is running",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// ── API Routes ───────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/languages", languageRoutes);
app.get("/api/search", searchSections);

// ── API info route ────────────────────────────────────────────────────────────
app.get("/api", (_req, res) => {
  res.json({
    success: true,
    message: "Welcome to DevDocs API",
    version: "1.0.0",
    endpoints: {
      health: "GET /health",
      auth: {
        register: "POST /api/auth/register",
        login: "POST /api/auth/login",
        profile: "GET /api/auth/me",
        progress: "POST /api/auth/progress",
        bookmark: "POST /api/auth/bookmark",
      },
      languages: {
        list: "GET /api/languages",
        detail: "GET /api/languages/:slug",
        stats: "GET /api/languages/stats",
        create: "POST /api/languages [admin]",
        update: "PATCH /api/languages/:slug [admin]",
        delete: "DELETE /api/languages/:slug [admin]",
      },
      topics: {
        list: "GET /api/languages/:langSlug/topics",
        detail: "GET /api/languages/:langSlug/topics/:topicSlug",
        create: "POST /api/languages/:langSlug/topics [admin]",
        update: "PATCH /api/languages/:langSlug/topics/:topicSlug [admin]",
        delete: "DELETE /api/languages/:langSlug/topics/:topicSlug [admin]",
      },
      sections: {
        list: "GET /api/languages/:langSlug/topics/:topicSlug/sections",
        detail: "GET /api/languages/:langSlug/topics/:topicSlug/sections/:sectionSlug",
        create: "POST /api/languages/:langSlug/topics/:topicSlug/sections [admin]",
        update: "PATCH /api/languages/:langSlug/topics/:topicSlug/sections/:sectionSlug [admin]",
        delete: "DELETE /api/languages/:langSlug/topics/:topicSlug/sections/:sectionSlug [admin]",
      },
      examples: {
        list: "GET /api/languages/:langSlug/topics/:topicSlug/sections/:sectionSlug/examples",
        create: "POST /api/languages/:langSlug/topics/:topicSlug/sections/:sectionSlug/examples [admin]",
        like: "POST /api/examples/:id/like",
      },
      quiz: {
        get: "GET /api/languages/:langSlug/topics/:topicSlug/sections/:sectionSlug/quiz",
        create: "POST /api/languages/:langSlug/topics/:topicSlug/sections/:sectionSlug/quiz [admin]",
        submit: "POST /api/quiz/:id/submit",
      },
      search: "GET /api/search?q=keyword&lang=javascript",
    },
  });
});

// ── 404 & Error handlers ─────────────────────────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
