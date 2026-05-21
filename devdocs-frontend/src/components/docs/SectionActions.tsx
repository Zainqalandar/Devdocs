"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Bookmark, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { api } from "@/api/client";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";
import type { Section } from "@/types";

interface SectionActionsProps {
  section: Section;
  langSlug: string;
  topicSlug: string;
}

export function SectionActions({ section, langSlug, topicSlug }: SectionActionsProps) {
  const { isAuthenticated } = useAuthStore();
  const [completed, setCompleted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState<"complete" | "bookmark" | null>(null);

  const handleComplete = async () => {
    if (!isAuthenticated || loading) return;
    setLoading("complete");
    try {
      await api.markComplete(section._id);
      setCompleted(true);
    } catch {}
    setLoading(null);
  };

  const handleBookmark = async () => {
    if (!isAuthenticated || loading) return;
    setLoading("bookmark");
    try {
      const res = await api.toggleBookmark(section._id);
      if (res.data) setBookmarked(res.data.bookmarked);
    } catch {}
    setLoading(null);
  };

  const prevS = section.prevSection;
  const nextS = section.nextSection;

  return (
    <div className="mt-12 space-y-6">
      {/* Mark complete + bookmark */}
      {isAuthenticated && (
        <div className="flex items-center gap-3">
          <button
            onClick={handleComplete}
            disabled={completed || loading === "complete"}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all",
              completed
                ? "bg-green-500/10 border-green-500/30 text-green-400"
                : "border-border hover:border-primary/40 hover:bg-accent"
            )}
          >
            <CheckCircle2 className={cn("w-4 h-4", completed ? "text-green-400" : "text-muted-foreground")} />
            {completed ? "Completed!" : loading === "complete" ? "Saving…" : "Mark as Complete"}
          </button>
          <button
            onClick={handleBookmark}
            disabled={loading === "bookmark"}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all",
              bookmarked
                ? "bg-primary/10 border-primary/30 text-primary"
                : "border-border hover:border-primary/40 hover:bg-accent"
            )}
          >
            <Bookmark className={cn("w-4 h-4", bookmarked ? "fill-primary text-primary" : "text-muted-foreground")} />
            {bookmarked ? "Bookmarked" : loading === "bookmark" ? "…" : "Bookmark"}
          </button>
        </div>
      )}

      {/* Prev / Next */}
      <div className="flex items-center gap-4">
        {prevS ? (
          <Link
            href={`/docs/${langSlug}/topics/${topicSlug}/sections/${prevS.slug}`}
            className="group flex-1 flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-accent transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground mb-0.5">Previous</p>
              <p className="text-sm font-medium truncate">{prevS.title}</p>
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {nextS ? (
          <Link
            href={`/docs/${langSlug}/topics/${topicSlug}/sections/${nextS.slug}`}
            className="group flex-1 flex items-center justify-end gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-accent transition-all text-right"
          >
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground mb-0.5">Next</p>
              <p className="text-sm font-medium truncate">{nextS.title}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </div>
  );
}
