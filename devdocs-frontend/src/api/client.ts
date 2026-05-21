import { API_BASE_URL, ApiResponse, Language, Topic, Section, Example, Quiz, User, SearchResult } from "@/types";

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("devdocs_token");
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== "undefined") {
      if (token) localStorage.setItem("devdocs_token", token);
      else localStorage.removeItem("devdocs_token");
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "API Error");
    }

    return data;
  }

  // ── Languages ────────────────────────────────────────────────────────────
  async getLanguages(params?: { category?: string; search?: string; page?: number }) {
    const query = new URLSearchParams({
      published: "true",
      limit: "50",
      ...(params?.category && { category: params.category }),
      ...(params?.search && { search: params.search }),
      ...(params?.page && { page: String(params.page) }),
    });
    return this.request<Language[]>(`/languages?${query}`);
  }

  async getLanguage(slug: string) {
    return this.request<{ language: Language; topics: Topic[] }>(`/languages/${slug}`);
  }

  async getLanguageStats() {
    return this.request<{ total: number; published: number; byCategory: Array<{ _id: string; count: number }> }>(
      "/languages/stats"
    );
  }

  // ── Topics ───────────────────────────────────────────────────────────────
  async getTopics(langSlug: string) {
    return this.request<Topic[]>(`/languages/${langSlug}/topics?limit=100`);
  }

  async getTopic(langSlug: string, topicSlug: string) {
    return this.request<{ language: Language; topic: Topic; sections: Section[] }>(
      `/languages/${langSlug}/topics/${topicSlug}`
    );
  }

  // ── Sections ─────────────────────────────────────────────────────────────
  async getSections(langSlug: string, topicSlug: string) {
    return this.request<Section[]>(
      `/languages/${langSlug}/topics/${topicSlug}/sections?limit=100`
    );
  }

  async getSection(langSlug: string, topicSlug: string, sectionSlug: string) {
    return this.request<{ language: Language; topic: Topic; section: Section }>(
      `/languages/${langSlug}/topics/${topicSlug}/sections/${sectionSlug}`
    );
  }

  // ── Examples ─────────────────────────────────────────────────────────────
  async getExamples(langSlug: string, topicSlug: string, sectionSlug: string) {
    return this.request<Example[]>(
      `/languages/${langSlug}/topics/${topicSlug}/sections/${sectionSlug}/examples`
    );
  }

  async likeExample(id: string) {
    return this.request<{ likeCount: number }>(`/examples/${id}/like`, { method: "POST" });
  }

  // ── Quiz ─────────────────────────────────────────────────────────────────
  async getQuiz(langSlug: string, topicSlug: string, sectionSlug: string) {
    return this.request<Quiz>(
      `/languages/${langSlug}/topics/${topicSlug}/sections/${sectionSlug}/quiz`
    );
  }

  async submitQuiz(quizId: string, answers: Array<{ questionId: string; selectedOptionIndex: number }>) {
    return this.request<{
      score: number;
      passed: boolean;
      correct: number;
      total: number;
      passingScore: number;
      results: Array<{
        questionId: string;
        question: string;
        selectedOptionIndex: number;
        correctOptionIndex: number;
        isCorrect: boolean;
        explanation: string;
      }>;
    }>(`/quiz/${quizId}/submit`, {
      method: "POST",
      body: JSON.stringify({ answers }),
    });
  }

  // ── Search ───────────────────────────────────────────────────────────────
  async search(q: string, lang?: string) {
    const query = new URLSearchParams({ q, ...(lang && { lang }) });
    return this.request<SearchResult[]>(`/search?${query}`);
  }

  // ── Auth ─────────────────────────────────────────────────────────────────
  async register(name: string, email: string, password: string) {
    const res = await this.request<{ token: string; user: User }>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    if (res.data?.token) this.setToken(res.data.token);
    return res;
  }

  async login(email: string, password: string) {
    const res = await this.request<{ token: string; user: User }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (res.data?.token) this.setToken(res.data.token);
    return res;
  }

  async getMe() {
    return this.request<User>("/auth/me");
  }

  async markComplete(sectionId: string) {
    return this.request("/auth/progress", {
      method: "POST",
      body: JSON.stringify({ sectionId }),
    });
  }

  async toggleBookmark(sectionId: string) {
    return this.request<{ bookmarked: boolean }>("/auth/bookmark", {
      method: "POST",
      body: JSON.stringify({ sectionId }),
    });
  }

  logout() {
    this.setToken(null);
  }
}

export const api = new ApiClient(API_BASE_URL);
