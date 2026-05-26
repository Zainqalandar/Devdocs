"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ExternalLink, Plus, Save, Trash2 } from "lucide-react";
import { api } from "@/api/client";
import type { Section, Example, ContentBlockInput, AdminQuiz, AdminQuizQuestion } from "@/types";
import {
  AdminCard,
  AdminPageHeader,
  AdminLabel,
  AdminInput,
  AdminTextarea,
  AdminBtn,
  AdminSelect,
} from "@/components/admin/admin-ui";
import { ContentBlocksEditor } from "@/components/admin/ContentBlocksEditor";
import { cn } from "@/lib/utils";

type Tab = "content" | "meta" | "examples" | "quiz";

const emptyQuestion = (order: number): AdminQuizQuestion => ({
  question: "",
  options: ["", "", "", ""],
  correctOptionIndex: 0,
  explanation: "",
  order,
});

export default function SectionEditorPage() {
  const { slug: langSlug, topicSlug, sectionSlug } = useParams<{
    slug: string;
    topicSlug: string;
    sectionSlug: string;
  }>();

  const [tab, setTab] = useState<Tab>("content");
  const [section, setSection] = useState<Section | null>(null);
  const [blocks, setBlocks] = useState<ContentBlockInput[]>([]);
  const [meta, setMeta] = useState({
    title: "",
    metaDescription: "",
    order: 0,
    readingTimeMinutes: 5,
    isPublished: false,
    isFree: true,
  });
  const [examples, setExamples] = useState<Example[]>([]);
  const [quiz, setQuiz] = useState<AdminQuiz | null>(null);
  const [quizForm, setQuizForm] = useState({
    title: "",
    description: "",
    passingScore: 70,
    timeLimit: 0,
    isPublished: false,
    questions: [emptyQuestion(0)],
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const secRes = await api.getSection(langSlug, topicSlug, sectionSlug);
      const s = secRes.data?.section;
      if (!s) return;
      setSection(s);
      setMeta({
        title: s.title,
        metaDescription: s.metaDescription,
        order: s.order,
        readingTimeMinutes: s.readingTimeMinutes,
        isPublished: s.isPublished,
        isFree: s.isFree,
      });
      setBlocks(
        (s.contentBlocks || []).map((b, i) => ({
          _id: b._id,
          type: b.type,
          content: b.content,
          language: b.language,
          caption: b.caption,
          items: b.items,
          headers: b.headers,
          rows: b.rows,
          order: b.order ?? i,
        }))
      );

      const exRes = await api.getExamplesAdmin(langSlug, topicSlug, sectionSlug);
      setExamples(exRes.data || []);

      try {
        const qRes = await api.getAdminQuiz(langSlug, topicSlug, sectionSlug);
        if (qRes.data) {
          setQuiz(qRes.data);
          setQuizForm({
            title: qRes.data.title,
            description: qRes.data.description,
            passingScore: qRes.data.passingScore,
            timeLimit: qRes.data.timeLimit,
            isPublished: qRes.data.isPublished,
            questions: qRes.data.questions.length
              ? qRes.data.questions.map((q, i) => ({ ...q, order: q.order ?? i }))
              : [emptyQuestion(0)],
          });
        }
      } catch {
        setQuiz(null);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load");
    }
  }, [langSlug, topicSlug, sectionSlug]);

  useEffect(() => {
    load();
  }, [load]);

  const saveSection = async () => {
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const payload = {
        ...meta,
        contentBlocks: blocks.map((b, i) => {
          const { _id, ...rest } = b;
          return { ...rest, order: i, ...(_id ? { _id } : {}) };
        }),
      };
      await api.updateSection(langSlug, topicSlug, sectionSlug, payload);
      setMessage("Section saved successfully.");
      load();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Save failed");
    }
    setSaving(false);
  };

  const saveExample = async (ex: Example, index: number) => {
    try {
      if (ex._id && !ex._id.startsWith("new-")) {
        await api.updateExample(ex._id, ex);
      } else {
        const { _id, likeCount, ...body } = ex;
        await api.createExample(langSlug, topicSlug, sectionSlug, body);
      }
      load();
      setMessage(`Example ${index + 1} saved.`);
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Save example failed");
    }
  };

  const deleteExample = async (id: string) => {
    if (!confirm("Delete this example?")) return;
    await api.deleteExample(id);
    load();
  };

  const addExample = () => {
    setExamples([
      ...examples,
      {
        _id: `new-${Date.now()}`,
        title: "New example",
        description: "",
        code: 'console.log("Hello");',
        expectedOutput: "",
        codeLanguage: "javascript",
        difficulty: "beginner",
        tags: [],
        isRunnable: true,
        isPublished: true,
        likeCount: 0,
        order: examples.length,
      },
    ]);
  };

  const saveQuiz = async () => {
    setSaving(true);
    try {
      const body = {
        ...quizForm,
        questions: quizForm.questions.map((q, i) => ({ ...q, order: i })),
      };
      if (quiz?._id) {
        await api.updateQuiz(quiz._id, body);
      } else {
        await api.createQuiz(langSlug, topicSlug, sectionSlug, body);
      }
      setMessage("Quiz saved.");
      load();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Quiz save failed");
    }
    setSaving(false);
  };

  const deleteQuiz = async () => {
    if (!quiz?._id || !confirm("Delete quiz for this section?")) return;
    await api.deleteQuiz(quiz._id);
    setQuiz(null);
    setQuizForm({
      title: "",
      description: "",
      passingScore: 70,
      timeLimit: 0,
      isPublished: false,
      questions: [emptyQuestion(0)],
    });
  };

  if (!section && !error) {
    return <p className="text-sm text-muted-foreground">Loading section…</p>;
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "content", label: "Content blocks" },
    { id: "meta", label: "Settings" },
    { id: "examples", label: `Examples (${examples.length})` },
    { id: "quiz", label: quiz ? "Quiz" : "Quiz +" },
  ];

  return (
    <div className="max-w-4xl">
      <AdminPageHeader
        title={meta.title || "Edit section"}
        description={`/${sectionSlug}`}
        actions={
          <>
            <Link
              href={`/docs/${langSlug}/topics/${topicSlug}/sections/${sectionSlug}`}
              target="_blank"
            >
              <AdminBtn variant="ghost">
                <ExternalLink className="h-4 w-4" />
                Preview
              </AdminBtn>
            </Link>
            <AdminBtn variant="primary" onClick={saveSection} disabled={saving}>
              <Save className="h-4 w-4" />
              {saving ? "Saving…" : "Save section"}
            </AdminBtn>
          </>
        }
      />

      <div className="mb-4">
        <Link
          href={`/admin/languages/${langSlug}/topics/${topicSlug}/sections`}
          className="text-xs text-muted-foreground hover:text-primary"
        >
          ← All sections
        </Link>
      </div>

      {message && (
        <p className="mb-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
          {message}
        </p>
      )}
      {error && (
        <p className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="mb-6 flex flex-wrap gap-1 border-b border-white/[0.08] pb-px">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px",
              tab === t.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "content" && (
        <AdminCard className="p-5">
          <ContentBlocksEditor blocks={blocks} onChange={setBlocks} />
        </AdminCard>
      )}

      {tab === "meta" && (
        <AdminCard className="space-y-4 p-5">
          <div>
            <AdminLabel>Title</AdminLabel>
            <AdminInput value={meta.title} onChange={(e) => setMeta({ ...meta, title: e.target.value })} />
          </div>
          <div>
            <AdminLabel>Meta description</AdminLabel>
            <AdminTextarea
              value={meta.metaDescription}
              onChange={(e) => setMeta({ ...meta, metaDescription: e.target.value })}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <AdminLabel>Order</AdminLabel>
              <AdminInput
                type="number"
                value={meta.order}
                onChange={(e) => setMeta({ ...meta, order: Number(e.target.value) })}
              />
            </div>
            <div>
              <AdminLabel>Reading time (minutes)</AdminLabel>
              <AdminInput
                type="number"
                value={meta.readingTimeMinutes}
                onChange={(e) => setMeta({ ...meta, readingTimeMinutes: Number(e.target.value) })}
              />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={meta.isPublished}
              onChange={(e) => setMeta({ ...meta, isPublished: e.target.checked })}
            />
            Published on docs site
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={meta.isFree}
              onChange={(e) => setMeta({ ...meta, isFree: e.target.checked })}
            />
            Free content (not PRO)
          </label>
        </AdminCard>
      )}

      {tab === "examples" && (
        <div className="space-y-4">
          <AdminBtn type="button" variant="primary" onClick={addExample}>
            <Plus className="h-4 w-4" />
            Add example
          </AdminBtn>
          {examples.map((ex, i) => (
            <AdminCard key={ex._id} className="space-y-3 p-5">
              <div className="flex justify-between gap-2">
                <AdminInput
                  value={ex.title}
                  onChange={(e) => {
                    const next = [...examples];
                    next[i] = { ...ex, title: e.target.value };
                    setExamples(next);
                  }}
                  placeholder="Title"
                />
                {ex._id && !ex._id.startsWith("new-") && (
                  <AdminBtn variant="danger" type="button" onClick={() => deleteExample(ex._id)}>
                    <Trash2 className="h-4 w-4" />
                  </AdminBtn>
                )}
              </div>
              <AdminTextarea
                value={ex.code}
                onChange={(e) => {
                  const next = [...examples];
                  next[i] = { ...ex, code: e.target.value };
                  setExamples(next);
                }}
                rows={6}
                className="font-mono text-xs"
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <AdminLabel>Language</AdminLabel>
                  <AdminInput
                    value={ex.codeLanguage}
                    onChange={(e) => {
                      const next = [...examples];
                      next[i] = { ...ex, codeLanguage: e.target.value };
                      setExamples(next);
                    }}
                  />
                </div>
                <div>
                  <AdminLabel>Difficulty</AdminLabel>
                  <AdminSelect
                    value={ex.difficulty}
                    onChange={(e) => {
                      const next = [...examples];
                      next[i] = {
                        ...ex,
                        difficulty: e.target.value as Example["difficulty"],
                      };
                      setExamples(next);
                    }}
                  >
                    <option value="beginner">beginner</option>
                    <option value="intermediate">intermediate</option>
                    <option value="advanced">advanced</option>
                  </AdminSelect>
                </div>
              </div>
              <AdminBtn type="button" variant="default" onClick={() => saveExample(ex, i)}>
                Save example
              </AdminBtn>
            </AdminCard>
          ))}
        </div>
      )}

      {tab === "quiz" && (
        <AdminCard className="space-y-4 p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <AdminLabel>Quiz title</AdminLabel>
              <AdminInput
                value={quizForm.title}
                onChange={(e) => setQuizForm({ ...quizForm, title: e.target.value })}
              />
            </div>
            <div>
              <AdminLabel>Passing score %</AdminLabel>
              <AdminInput
                type="number"
                value={quizForm.passingScore}
                onChange={(e) =>
                  setQuizForm({ ...quizForm, passingScore: Number(e.target.value) })
                }
              />
            </div>
          </div>
          <div>
            <AdminLabel>Description</AdminLabel>
            <AdminTextarea
              value={quizForm.description}
              onChange={(e) => setQuizForm({ ...quizForm, description: e.target.value })}
            />
          </div>

          {quizForm.questions.map((q, qi) => (
            <div key={qi} className="rounded-lg border border-white/[0.08] p-4 space-y-3">
              <AdminLabel>Question {qi + 1}</AdminLabel>
              <AdminInput
                value={q.question}
                onChange={(e) => {
                  const questions = [...quizForm.questions];
                  questions[qi] = { ...q, question: e.target.value };
                  setQuizForm({ ...quizForm, questions });
                }}
              />
              {q.options.map((opt, oi) => (
                <AdminInput
                  key={oi}
                  value={opt}
                  placeholder={`Option ${oi + 1}`}
                  onChange={(e) => {
                    const questions = [...quizForm.questions];
                    const options = [...q.options];
                    options[oi] = e.target.value;
                    questions[qi] = { ...q, options };
                    setQuizForm({ ...quizForm, questions });
                  }}
                />
              ))}
              <div>
                <AdminLabel>Correct option (0-based index)</AdminLabel>
                <AdminInput
                  type="number"
                  min={0}
                  max={3}
                  value={q.correctOptionIndex}
                  onChange={(e) => {
                    const questions = [...quizForm.questions];
                    questions[qi] = { ...q, correctOptionIndex: Number(e.target.value) };
                    setQuizForm({ ...quizForm, questions });
                  }}
                />
              </div>
              <AdminTextarea
                placeholder="Explanation"
                value={q.explanation}
                onChange={(e) => {
                  const questions = [...quizForm.questions];
                  questions[qi] = { ...q, explanation: e.target.value };
                  setQuizForm({ ...quizForm, questions });
                }}
                rows={2}
              />
            </div>
          ))}

          <AdminBtn
            type="button"
            variant="ghost"
            onClick={() =>
              setQuizForm({
                ...quizForm,
                questions: [...quizForm.questions, emptyQuestion(quizForm.questions.length)],
              })
            }
          >
            <Plus className="h-4 w-4" />
            Add question
          </AdminBtn>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={quizForm.isPublished}
              onChange={(e) => setQuizForm({ ...quizForm, isPublished: e.target.checked })}
            />
            Quiz published
          </label>

          <div className="flex gap-2 pt-2">
            <AdminBtn type="button" variant="primary" onClick={saveQuiz} disabled={saving}>
              Save quiz
            </AdminBtn>
            {quiz && (
              <AdminBtn type="button" variant="danger" onClick={deleteQuiz}>
                Delete quiz
              </AdminBtn>
            )}
          </div>
        </AdminCard>
      )}
    </div>
  );
}
