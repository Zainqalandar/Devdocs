"use client";

import { useState, useEffect, useCallback } from "react";
import { Trophy, Timer, CheckCircle2, XCircle, ArrowRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { api } from "@/api/client";
import type { Quiz } from "@/types";

interface QuizResult {
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
}

export function QuizPanel({ quiz }: { quiz: Quiz }) {
  const [answers, setAnswers]     = useState<Record<string, number>>({});
  const [result, setResult]       = useState<QuizResult | null>(null);
  const [submitting, setSubmit]   = useState(false);
  const [timeLeft, setTimeLeft]   = useState(quiz.timeLimit > 0 ? quiz.timeLimit * 60 : 0);
  const [started, setStarted]     = useState(false);

  const handleSubmit = useCallback(async () => {
    if (submitting) return;
    setSubmit(true);
    try {
      const payload = Object.entries(answers).map(([questionId, selectedOptionIndex]) => ({
        questionId,
        selectedOptionIndex,
      }));
      const res = await api.submitQuiz(quiz._id, payload);
      if (res.data) setResult(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmit(false);
    }
  }, [answers, quiz._id, submitting]);

  useEffect(() => {
    if (!started || !quiz.timeLimit || timeLeft <= 0) return;
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { clearInterval(t); handleSubmit(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [started, quiz.timeLimit, timeLeft, handleSubmit]);

  const handleReset = () => {
    setAnswers({});
    setResult(null);
    setTimeLeft(quiz.timeLimit > 0 ? quiz.timeLimit * 60 : 0);
    setStarted(false);
  };

  const allAnswered = quiz.questions.every((q) => answers[q._id] !== undefined);
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  if (result) {
    return (
      <div className="mt-10 rounded-2xl border border-border bg-card overflow-hidden">
        <div className={cn("px-6 py-8 text-center border-b border-border", result.passed ? "bg-green-500/5" : "bg-red-500/5")}>
          <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4", result.passed ? "bg-green-500/15" : "bg-red-500/15")}>
            <Trophy className={cn("w-8 h-8", result.passed ? "text-green-400" : "text-red-400")} />
          </div>
          <h3 className="font-mono font-black text-3xl mb-1">{result.score}%</h3>
          <p className={cn("font-semibold text-lg mb-2", result.passed ? "text-green-400" : "text-red-400")}>
            {result.passed ? "🎉 Passed!" : "Keep practicing!"}
          </p>
          <p className="text-sm text-muted-foreground">
            {result.correct} out of {result.total} correct · Passing score: {result.passingScore}%
          </p>
        </div>

        <div className="p-6 space-y-4">
          {result.results.map((r, i) => (
            <div key={r.questionId} className={cn("rounded-xl border p-4", r.isCorrect ? "border-green-500/20 bg-green-500/5" : "border-red-500/20 bg-red-500/5")}>
              <div className="flex items-start gap-3 mb-3">
                {r.isCorrect
                  ? <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                  : <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />}
                <p className="text-sm font-medium">{i + 1}. {r.question}</p>
              </div>
              {!r.isCorrect && (
                <div className="ml-7 text-xs text-muted-foreground space-y-1">
                  <p>Your answer: <span className="text-red-400">{quiz.questions[i]?.options?.[r.selectedOptionIndex] ?? "—"}</span></p>
                  <p>Correct: <span className="text-green-400">{quiz.questions[i]?.options?.[r.correctOptionIndex]}</span></p>
                </div>
              )}
              {r.explanation && (
                <p className="ml-7 mt-2 text-xs text-muted-foreground italic leading-relaxed">{r.explanation}</p>
              )}
            </div>
          ))}
        </div>

        <div className="px-6 pb-6">
          <button onClick={handleReset} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 rounded-2xl border border-border bg-card overflow-hidden">
      {/* Quiz header */}
      <div className="px-6 py-5 border-b border-border flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-4 h-4 text-primary" />
            <h2 className="font-mono font-bold text-lg">{quiz.title}</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            {quiz.questions.length} questions · Pass at {quiz.passingScore}%
            {quiz.timeLimit > 0 && ` · ${quiz.timeLimit} min`}
          </p>
        </div>
        {started && quiz.timeLimit > 0 && (
          <div className={cn("flex items-center gap-1.5 font-mono font-bold text-sm px-3 py-1.5 rounded-lg border", timeLeft < 60 ? "text-red-400 border-red-400/30 bg-red-400/10" : "text-primary border-primary/30 bg-primary/10")}>
            <Timer className="w-3.5 h-3.5" />
            {formatTime(timeLeft)}
          </div>
        )}
      </div>

      {!started ? (
        <div className="p-8 text-center">
          {quiz.description && <p className="text-muted-foreground mb-6">{quiz.description}</p>}
          <button
            onClick={() => setStarted(true)}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all hover:gap-3"
          >
            Start Quiz <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="p-6 space-y-6">
          {quiz.questions.map((q, qi) => (
            <div key={q._id} className="space-y-3">
              <p className="font-medium text-sm">
                <span className="text-primary font-mono mr-2">{qi + 1}.</span>
                {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, oi) => (
                  <button
                    key={oi}
                    onClick={() => setAnswers((prev) => ({ ...prev, [q._id]: oi }))}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-xl border text-sm transition-all",
                      answers[q._id] === oi
                        ? "border-primary bg-primary/10 text-primary font-medium"
                        : "border-border hover:border-primary/40 hover:bg-accent"
                    )}
                  >
                    <span className="font-mono text-xs mr-2 text-muted-foreground">
                      {String.fromCharCode(65 + oi)}.
                    </span>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="pt-2 border-t border-border flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {Object.keys(answers).length} / {quiz.questions.length} answered
            </p>
            <button
              onClick={handleSubmit}
              disabled={!allAnswered || submitting}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting…" : "Submit Quiz"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
