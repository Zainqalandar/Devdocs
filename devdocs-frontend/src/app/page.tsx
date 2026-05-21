import Link from "next/link";
import { ArrowRight, Code2, BookOpen, Zap, Trophy, Search, ChevronRight } from "lucide-react";

const FEATURED_LANGS = [
  { name: "JavaScript", slug: "javascript", color: "#F7DF1E", bg: "from-yellow-500/20 to-yellow-600/5", icon: "JS", desc: "The language of the web. Build anything." },
  { name: "Python",     slug: "python",     color: "#3776AB", bg: "from-blue-500/20 to-blue-600/5",   icon: "PY", desc: "Simple syntax. Powerful applications."  },
  { name: "TypeScript", slug: "typescript", color: "#3178C6", bg: "from-blue-400/20 to-blue-500/5",   icon: "TS", desc: "JavaScript with static typing."         },
  { name: "React",      slug: "react",      color: "#61DAFB", bg: "from-cyan-400/20 to-cyan-500/5",   icon: "⚛",  desc: "Build interactive UIs effortlessly."   },
  { name: "Node.js",    slug: "nodejs",     color: "#68A063", bg: "from-green-500/20 to-green-600/5", icon: "N",  desc: "Server-side JavaScript runtime."       },
  { name: "SQL",        slug: "sql",        color: "#336791", bg: "from-indigo-500/20 to-indigo-600/5",icon:"SQ", desc: "Query and manage databases."           },
];

const FEATURES = [
  { icon: BookOpen, title: "Structured Learning",   desc: "Topics organized from beginner to advanced with clear progression."        },
  { icon: Code2,    title: "Live Code Examples",    desc: "Every concept backed by runnable, real-world code examples."               },
  { icon: Trophy,   title: "Section Quizzes",       desc: "Auto-graded MCQ quizzes after each section to test your knowledge."        },
  { icon: Zap,      title: "Track Progress",        desc: "Sign in to track completed sections and bookmark your favorite pages."     },
];

export default function HomePage() {
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
            <Link href="/auth/login"    className="text-sm text-muted-foreground hover:text-foreground px-3 py-1.5 transition-colors">Sign in</Link>
            <Link href="/auth/register" className="text-sm bg-primary text-primary-foreground px-3 py-1.5 rounded-md font-medium hover:bg-primary/90 transition-colors">Get Started</Link>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden pt-24 pb-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Free documentation for every developer
          </div>
          <h1 className="font-mono font-black text-5xl md:text-7xl leading-tight tracking-tight mb-6">
            Learn to Code<br /><span className="text-primary">the Right Way.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Structured documentation for every major programming language and framework. Clear examples, instant quizzes, zero fluff.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/docs" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all hover:gap-3">
              Browse Documentation <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/docs/javascript" className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-lg font-medium hover:bg-accent transition-colors">
              Start with JavaScript
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-mono font-bold text-3xl mb-2">Pick a Language</h2>
              <p className="text-muted-foreground">Start your journey with any of these technologies.</p>
            </div>
            <Link href="/docs" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
              View all <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURED_LANGS.map((lang) => (
              <Link key={lang.slug} href={`/docs/${lang.slug}`}
                className={`group relative p-6 rounded-xl border border-border bg-gradient-to-br ${lang.bg} hover:border-primary/40 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center font-mono font-black text-sm"
                    style={{ background: `${lang.color}22`, color: lang.color, border: `1px solid ${lang.color}33` }}>
                    {lang.icon}
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-mono font-bold text-lg mb-1">{lang.name}</h3>
                <p className="text-sm text-muted-foreground">{lang.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <h2 className="font-mono font-bold text-3xl mb-3">Built for Developers</h2>
            <p className="text-muted-foreground text-lg">Everything you need to learn, practice, and master programming.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-12">
            <h2 className="font-mono font-black text-4xl mb-4">Start Learning Today</h2>
            <p className="text-muted-foreground text-lg mb-8">No signup required. Just pick a language and start reading.</p>
            <Link href="/docs/javascript" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all hover:scale-105">
              Learn JavaScript <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 px-6">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="font-mono font-bold text-foreground/70">&lt;DevDocs /&gt;</Link>
          <p className="text-sm text-muted-foreground">Open documentation for everyone.</p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/docs"   className="hover:text-foreground transition-colors">Docs</Link>
            <Link href="/search" className="hover:text-foreground transition-colors">Search</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
