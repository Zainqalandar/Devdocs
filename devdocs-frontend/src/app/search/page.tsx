"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Search, Clock, ArrowRight, X } from "lucide-react";
import { api } from "@/api/client";
import type { SearchResult } from "@/types";

export default function SearchPage() {
  const [query, setQuery]     = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); setSearched(false); return; }
    setLoading(true);
    setSearched(true);
    try {
      const res = await api.search(q.trim());
      setResults(res.data || []);
    } catch { setResults([]); }
    setLoading(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => { if (query) doSearch(query); }, 400);
    return () => clearTimeout(timer);
  }, [query, doSearch]);

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 h-14 flex items-center gap-4">
          <Link href="/" className="font-mono font-bold text-sm flex items-center gap-1 shrink-0">
            <span className="text-primary">&lt;</span>DevDocs<span className="text-primary">/&gt;</span>
          </Link>
          <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Docs</Link>
        </div>
      </nav>

      <div className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="font-mono font-black text-4xl mb-8">Search</h1>

        {/* Search input */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            autoFocus
            placeholder="Search documentation…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-base transition-all"
          />
          {query && (
            <button onClick={() => { setQuery(""); setResults([]); setSearched(false); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-accent transition-colors">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Results */}
        {loading && (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 rounded-xl border border-border bg-card animate-pulse" />
            ))}
          </div>
        )}

        {!loading && searched && results.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
            <p className="font-medium mb-1">No results for "{query}"</p>
            <p className="text-sm text-muted-foreground">Try different keywords or browse the docs.</p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground mb-4">{results.length} results for "{query}"</p>
            {results.map((r) => (
              <Link
                key={r._id}
                href={`/docs/${r.language.slug}/topics/${r.topic.slug}/sections/${r.slug}`}
                className="group flex items-center justify-between p-5 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-accent/30 transition-all"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded text-primary bg-primary/10">
                      {r.language.name}
                    </span>
                    <span className="text-xs text-muted-foreground">{r.topic.title}</span>
                  </div>
                  <p className="font-semibold group-hover:text-primary transition-colors mb-1">{r.title}</p>
                  {r.metaDescription && (
                    <p className="text-sm text-muted-foreground line-clamp-1">{r.metaDescription}</p>
                  )}
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1.5">
                    <Clock className="w-3 h-3" /> {r.readingTimeMinutes} min read
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 ml-4" />
              </Link>
            ))}
          </div>
        )}

        {!searched && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">Start typing to search all documentation…</p>
          </div>
        )}
      </div>
    </div>
  );
}
