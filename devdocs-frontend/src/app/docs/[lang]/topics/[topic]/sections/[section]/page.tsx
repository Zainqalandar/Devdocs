import { notFound } from "next/navigation";
import { Clock, Eye } from "lucide-react";
import type { Metadata } from "next";
import { ContentRenderer } from "@/components/docs/ContentRenderer";
import { ExamplesPanel } from "@/components/docs/ExamplesPanel";
import { QuizPanel } from "@/components/docs/QuizPanel";
import { SectionActions } from "@/components/docs/SectionActions";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function getSection(lang: string, topic: string, section: string) {
  try {
    const res = await fetch(`${API}/languages/${lang}/topics/${topic}/sections/${section}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()).data;
  } catch { return null; }
}

async function getExamples(lang: string, topic: string, section: string) {
  try {
    const res = await fetch(`${API}/languages/${lang}/topics/${topic}/sections/${section}/examples`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    return (await res.json()).data || [];
  } catch { return []; }
}

async function getQuiz(lang: string, topic: string, section: string) {
  try {
    const res = await fetch(`${API}/languages/${lang}/topics/${topic}/sections/${section}/quiz`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return (await res.json()).data || null;
  } catch { return null; }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; topic: string; section: string }>;
}): Promise<Metadata> {
  const { lang, topic, section } = await params;
  const data = await getSection(lang, topic, section);
  if (!data) return { title: "Not Found" };
  return {
    title: `${data.section.title} — ${data.language.name}`,
    description: data.section.metaDescription || data.section.title,
  };
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ lang: string; topic: string; section: string }>;
}) {
  const { lang, topic: topicSlug, section: sectionSlug } = await params;

  const [data, examples, quiz] = await Promise.all([
    getSection(lang, topicSlug, sectionSlug),
    getExamples(lang, topicSlug, sectionSlug),
    getQuiz(lang, topicSlug, sectionSlug),
  ]);

  if (!data) notFound();

  const { language, topic, section } = data;

  return (
    <div className="flex gap-0 min-h-full">
      {/* Main content */}
      <article className="flex-1 min-w-0 max-w-3xl mx-auto px-6 py-10 animate-in">
        {/* Section header */}
        <header className="mb-8 pb-6 border-b border-border">
          <h1 className="font-mono font-black text-3xl md:text-4xl mb-4 leading-tight">
            {section.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {section.readingTimeMinutes} min read
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              {section.viewCount.toLocaleString()} views
            </span>
            {!section.isFree && (
              <span className="text-xs border border-primary/30 text-primary px-2 py-0.5 rounded font-medium">
                PRO
              </span>
            )}
          </div>
        </header>

        {/* Content blocks */}
        <ContentRenderer blocks={section.contentBlocks} />

        {/* Examples */}
        <ExamplesPanel examples={examples} />

        {/* Quiz */}
        {quiz && <QuizPanel quiz={quiz} />}

        {/* Prev / Next nav + bookmark */}
        <SectionActions section={section} langSlug={lang} topicSlug={topicSlug} />
      </article>

      {/* Right table of contents (desktop) */}
      <aside className="hidden xl:block w-56 shrink-0 py-10 pr-6">
        <div className="sticky top-6">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">On this page</p>
          <nav className="space-y-1">
            {section.contentBlocks
              .filter((b: { type: string }) => b.type === "heading")
              .sort((a: { order: number }, b: { order: number }) => a.order - b.order)
              .map((b: { _id: string; content: string }) => (
                <a
                  key={b._id}
                  href={`#${b.content.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block text-xs text-muted-foreground hover:text-foreground transition-colors py-0.5 truncate"
                >
                  {b.content}
                </a>
              ))}
          </nav>
        </div>
      </aside>
    </div>
  );
}
