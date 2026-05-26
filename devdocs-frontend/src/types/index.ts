// ─── API Config ──────────────────────────────────────────────────────────────
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  pagination?: Pagination;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface Language {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  icon: string;
  color: string;
  category: "language" | "framework" | "library" | "database" | "tool";
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  version: string;
  officialWebsite: string;
  logoUrl: string;
  isPublished: boolean;
  order: number;
  totalTopics: number;
  totalExamples: number;
  createdAt: string;
  updatedAt: string;
}

export interface Topic {
  _id: string;
  language: string;
  title: string;
  slug: string;
  description: string;
  order: number;
  icon: string;
  isPublished: boolean;
  totalSections: number;
  createdAt: string;
  updatedAt: string;
}

export interface ContentBlock {
  _id: string;
  type:
    | "text"
    | "code"
    | "note"
    | "warning"
    | "tip"
    | "table"
    | "image"
    | "heading"
    | "list"
    | "quiz_prompt";
  content: string;
  language?: string;
  caption?: string;
  items?: string[];
  headers?: string[];
  rows?: string[][];
  order: number;
}

export interface Section {
  _id: string;
  topic: string | Topic;
  language: string | Language;
  title: string;
  slug: string;
  metaDescription: string;
  contentBlocks: ContentBlock[];
  order: number;
  isPublished: boolean;
  isFree: boolean;
  readingTimeMinutes: number;
  viewCount: number;
  nextSection?: { _id: string; title: string; slug: string } | null;
  prevSection?: { _id: string; title: string; slug: string } | null;
  createdAt: string;
  updatedAt: string;
}

export interface Example {
  _id: string;
  title: string;
  description: string;
  code: string;
  expectedOutput: string;
  codeLanguage: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  isRunnable: boolean;
  isPublished?: boolean;
  likeCount: number;
  order: number;
}

export type ContentBlockInput = Omit<ContentBlock, "_id"> & { _id?: string };

export interface AdminQuizQuestion {
  _id?: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  order: number;
}

export interface AdminQuiz {
  _id: string;
  title: string;
  description: string;
  questions: AdminQuizQuestion[];
  passingScore: number;
  timeLimit: number;
  isPublished: boolean;
  totalAttempts: number;
}

export interface QuizQuestion {
  _id: string;
  question: string;
  options: string[];
  order: number;
}

export interface Quiz {
  _id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit: number;
  totalAttempts: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  avatar: string;
  completedSections: Array<{ section: string | Section; completedAt: string }>;
  bookmarkedSections: Array<string | Section>;
}

export interface SearchResult {
  _id: string;
  title: string;
  slug: string;
  metaDescription: string;
  readingTimeMinutes: number;
  topic: Pick<Topic, "_id" | "title" | "slug">;
  language: Pick<Language, "_id" | "name" | "slug" | "color">;
}
