import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function getData(slug: string) {
  try {
    const res = await fetch(`${API}/languages/${slug}`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const d = await res.json();
    return d.data;
  } catch { return null; }
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const data = await getData(lang);
  if (!data) return { title: "Not Found" };
  return { title: data.language.name, description: data.language.shortDescription };
}

export default async function LangPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const data = await getData(lang);
  if (!data) notFound();

  const { language, topics } = data;

  const DIFF_MAP: Record<string, string> = {
    beginner:     "bg-green-500/10 text-green-400 border-green-500/20",
    intermediate: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    advanced:     "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 animate-in">
      {/* Header */}
      <div className="flex items-start gap-5 mb-10 pb-10 border-b border-border">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center font-mono font-black text-xl shrink-0"
          style={{ background: `${language.color}20`, color: language.color, border: `1px solid ${language.color}30` }}
        >
          {language.name.slice(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <h1 className="font-mono font-black text-4xl">{language.name}</h1>
            <span className="text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded">{language.version}</span>
            <span className={`text-xs px-2.5 py-0.5 rounded-full border capitalize font-medium ${DIFF_MAP[language.difficulty]}`}>
              {language.difficulty}
            </span>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">{language.shortDescription}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
            <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" />{language.totalTopics} topics</span>
            {language.officialWebsite && (
              <a href={language.officialWebsite} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 text-primary hover:underline">
                Official docs <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Topics */}
      <div className="mb-8">
        <h2 className="font-mono font-bold text-xl mb-5">Topics</h2>
        <div className="space-y-3">
          {topics.length === 0 ? (
            <div className="text-center py-12 rounded-xl border border-border">
              <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No topics published yet.</p>
            </div>
          ) : (
            topics.map((topic: { _id: string; slug: string; title: string; description: string; totalSections: number }) => (
              <Link
                key={topic._id}
                href={`/docs/${lang}/topics/${topic.slug}`}
                className="group flex items-center justify-between p-5 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-accent/30 transition-all"
              >
                <div className="min-w-0">
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{topic.title}</h3>
                  {topic.description && (
                    <p className="text-sm text-muted-foreground truncate">{topic.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> {topic.totalSections}
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Description */}
      {language.description && (
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-mono font-bold text-lg mb-3">About {language.name}</h2>
          <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {language.description}
          </div>
        </div>
      )}
    </div>
  );
}
