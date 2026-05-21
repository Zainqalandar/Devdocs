import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Clock, Lock } from "lucide-react";
import type { Metadata } from "next";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function getData(lang: string, topic: string) {
  try {
    const res = await fetch(`${API}/languages/${lang}/topics/${topic}`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const d = await res.json();
    return d.data;
  } catch { return null; }
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; topic: string }> }): Promise<Metadata> {
  const { lang, topic } = await params;
  const data = await getData(lang, topic);
  if (!data) return { title: "Not Found" };
  return { title: `${data.topic.title} — ${data.language.name}`, description: data.topic.description };
}

export default async function TopicPage({ params }: { params: Promise<{ lang: string; topic: string }> }) {
  const { lang, topic: topicSlug } = await params;
  const data = await getData(lang, topicSlug);
  if (!data) notFound();

  const { language, topic, sections } = data;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 animate-in">
      <div className="mb-8 pb-8 border-b border-border">
        <div className="text-sm text-muted-foreground mb-2">
          <Link href={`/docs/${lang}`} className="hover:text-foreground transition-colors">{language.name}</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{topic.title}</span>
        </div>
        <h1 className="font-mono font-black text-3xl md:text-4xl mb-3">{topic.title}</h1>
        {topic.description && <p className="text-muted-foreground">{topic.description}</p>}
      </div>

      <div className="space-y-2">
        {sections.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">No sections published yet.</p>
        ) : (
          sections.map((section: { _id: string; slug: string; title: string; readingTimeMinutes: number; isFree: boolean }, i: number) => (
            <Link
              key={section._id}
              href={`/docs/${lang}/topics/${topicSlug}/sections/${section.slug}`}
              className="group flex items-center justify-between px-5 py-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-accent/30 transition-all"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-sm text-muted-foreground w-6 text-right shrink-0">{i + 1}</span>
                <div>
                  <p className="font-medium group-hover:text-primary transition-colors">{section.title}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" /> {section.readingTimeMinutes} min read
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {!section.isFree && <Lock className="w-3.5 h-3.5 text-muted-foreground" />}
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
