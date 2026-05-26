import {
  API_BASE_URL,
  ApiResponse,
  Language,
  Topic,
  Section,
  Example,
  Quiz,
  User,
  SearchResult,
  ContentBlockInput,
  AdminQuiz,
} from "@/types";

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

  // ── Admin: Languages ─────────────────────────────────────────────────────
  async getLanguagesAdmin(params?: { search?: string; published?: "all" | "true" | "false" }) {
    const query = new URLSearchParams({ limit: "100" });
    if (params?.search) query.set("search", params.search);
    if (params?.published && params.published !== "all") {
      query.set("published", params.published);
    }
    return this.request<Language[]>(`/languages?${query}`);
  }

  async createLanguage(body: Partial<Language>) {
    return this.request<Language>("/languages", { method: "POST", body: JSON.stringify(body) });
  }

  async updateLanguage(slug: string, body: Partial<Language>) {
    return this.request<Language>(`/languages/${slug}`, { method: "PATCH", body: JSON.stringify(body) });
  }

  async deleteLanguage(slug: string) {
    return this.request<null>(`/languages/${slug}`, { method: "DELETE" });
  }

  // ── Admin: Topics ────────────────────────────────────────────────────────
  async getTopicsAdmin(langSlug: string) {
    return this.request<Topic[]>(`/languages/${langSlug}/topics?limit=100`);
  }

  async createTopic(langSlug: string, body: Partial<Topic>) {
    return this.request<Topic>(`/languages/${langSlug}/topics`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  async updateTopic(langSlug: string, topicSlug: string, body: Partial<Topic>) {
    return this.request<Topic>(`/languages/${langSlug}/topics/${topicSlug}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  }

  async deleteTopic(langSlug: string, topicSlug: string) {
    return this.request<null>(`/languages/${langSlug}/topics/${topicSlug}`, { method: "DELETE" });
  }

  // ── Admin: Sections ──────────────────────────────────────────────────────
  async getSectionsAdmin(langSlug: string, topicSlug: string) {
    return this.request<Section[]>(
      `/languages/${langSlug}/topics/${topicSlug}/sections?limit=200`
    );
  }

  async createSection(
    langSlug: string,
    topicSlug: string,
    body: {
      title: string;
      metaDescription?: string;
      contentBlocks?: ContentBlockInput[];
      order?: number;
      isPublished?: boolean;
      isFree?: boolean;
      readingTimeMinutes?: number;
    }
  ) {
    return this.request<Section>(`/languages/${langSlug}/topics/${topicSlug}/sections`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  async updateSection(
    langSlug: string,
    topicSlug: string,
    sectionSlug: string,
    body: Record<string, unknown>
  ) {
    return this.request<Section>(
      `/languages/${langSlug}/topics/${topicSlug}/sections/${sectionSlug}`,
      { method: "PATCH", body: JSON.stringify(body) }
    );
  }

  async deleteSection(langSlug: string, topicSlug: string, sectionSlug: string) {
    return this.request<null>(
      `/languages/${langSlug}/topics/${topicSlug}/sections/${sectionSlug}`,
      { method: "DELETE" }
    );
  }

  // ── Admin: Examples ────────────────────────────────────────────────────────
  async getExamplesAdmin(langSlug: string, topicSlug: string, sectionSlug: string) {
    return this.request<Example[]>(
      `/languages/${langSlug}/topics/${topicSlug}/sections/${sectionSlug}/examples?limit=50`
    );
  }

  async createExample(
    langSlug: string,
    topicSlug: string,
    sectionSlug: string,
    body: Partial<Example>
  ) {
    return this.request<Example>(
      `/languages/${langSlug}/topics/${topicSlug}/sections/${sectionSlug}/examples`,
      { method: "POST", body: JSON.stringify(body) }
    );
  }

  async updateExample(id: string, body: Partial<Example>) {
    return this.request<Example>(`/examples/${id}`, { method: "PATCH", body: JSON.stringify(body) });
  }

  async deleteExample(id: string) {
    return this.request<null>(`/examples/${id}`, { method: "DELETE" });
  }

  // ── Admin: Quiz ────────────────────────────────────────────────────────────
  async getAdminQuiz(langSlug: string, topicSlug: string, sectionSlug: string) {
    return this.request<AdminQuiz>(
      `/languages/${langSlug}/topics/${topicSlug}/sections/${sectionSlug}/quiz/manage`
    );
  }

  async createQuiz(
    langSlug: string,
    topicSlug: string,
    sectionSlug: string,
    body: Partial<AdminQuiz>
  ) {
    return this.request<AdminQuiz>(
      `/languages/${langSlug}/topics/${topicSlug}/sections/${sectionSlug}/quiz`,
      { method: "POST", body: JSON.stringify(body) }
    );
  }

  async updateQuiz(id: string, body: Partial<AdminQuiz>) {
    return this.request<AdminQuiz>(`/quiz/${id}`, { method: "PATCH", body: JSON.stringify(body) });
  }

  async deleteQuiz(id: string) {
    return this.request<null>(`/quiz/${id}`, { method: "DELETE" });
  }
}

export const api = new ApiClient(API_BASE_URL);
