import Link from "next/link";
import { ArrowRight, BookOpen, Search } from "lucide-react";

async function getLanguages() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/languages?published=true&limit=50`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

const CATEGORIES = ["all", "language", "framework", "library", "database", "tool"] as const;

export default async function DocsIndexPage() {
  const languages = await getLanguages();

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5 font-mono font-bold text-lg">
            <span className="text-primary">&lt;</span><span>DevDocs</span><span className="text-primary">/&gt;</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/search" className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
              <Search className="w-4 h-4" />
            </Link>
            <Link href="/auth/login" className="text-sm text-muted-foreground hover:text-foreground px-3 py-1.5 transition-colors">Sign in</Link>
            <Link href="/auth/register" className="text-sm bg-primary text-primary-foreground px-3 py-1.5 rounded-md font-medium hover:bg-primary/90">Get Started</Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12">
          <h1 className="font-mono font-black text-4xl md:text-5xl mb-4">Documentation</h1>
          <p className="text-muted-foreground text-lg">
            {languages.length > 0
              ? `${languages.length} languages and frameworks available.`
              : "Explore all available programming languages and frameworks."}
          </p>
        </div>

        {languages.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-mono font-bold text-xl mb-2">No content yet</h2>
            <p className="text-muted-foreground mb-6">Run the seed script to populate the database.</p>
            <code className="bg-muted px-4 py-2 rounded-lg text-sm font-mono">npm run seed</code>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {languages.map((lang: {
              slug: string; color: string; name: string; icon: string;
              shortDescription: string; difficulty: string; totalTopics: number; version: string;
            }) => (
              <Link key={lang.slug} href={`/docs/${lang.slug}`}
                className="group p-6 rounded-xl border border-border bg-card hover:border-primary/40 transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/5">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center font-mono font-black text-sm"
                    style={{ background: `${lang.color}22`, color: lang.color, border: `1px solid ${lang.color}33` }}>
                    {lang.name.slice(0, 2).toUpperCase()}
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-mono font-bold text-lg">{lang.name}</h3>
                  <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{lang.version}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{lang.shortDescription}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="capitalize">{lang.difficulty}</span>
                  <span>{lang.totalTopics} topics</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
