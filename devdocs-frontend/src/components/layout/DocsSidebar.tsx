"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Circle,
  Clock,
  Home,
  Layers,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Language, Topic, Section } from "@/types";

interface SidebarProps {
  language: Language;
  topics: (Topic & { sections: Pick<Section, "_id" | "slug" | "title" | "order" | "readingTimeMinutes" | "isFree">[] })[];
  activeLang: string;
  activeTopic?: string;
  activeSection?: string;
  completedSections?: string[];
  isOpen: boolean;
  onClose: () => void;
}

type SectionPick = Pick<Section, "_id" | "slug" | "title" | "order" | "readingTimeMinutes" | "isFree">;

function SectionItem({
  section,
  href,
  isActive,
  isCompleted,
  accentColor,
}: {
  section: SectionPick;
  href: string;
  isActive: boolean;
  isCompleted: boolean;
  accentColor: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-start gap-2.5 rounded-lg px-2.5 py-2 text-[13px] transition-all duration-200",
        isActive
          ? "bg-white/[0.06] text-foreground shadow-sm"
          : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
      )}
    >
      {isActive && (
        <span
          className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full"
          style={{ background: accentColor, boxShadow: `0 0 12px ${accentColor}88` }}
        />
      )}
      <span className="mt-0.5 shrink-0">
        {isCompleted ? (
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
        ) : (
          <Circle
            className={cn(
              "h-3.5 w-3.5 transition-colors",
              isActive ? "text-primary" : "text-muted-foreground/35 group-hover:text-muted-foreground/60"
            )}
          />
        )}
      </span>
      <span className="min-w-0 flex-1 leading-snug">
        <span className="line-clamp-2">{section.title}</span>
        <span className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground/80">
          <Clock className="h-2.5 w-2.5" />
          {section.readingTimeMinutes} min
        </span>
      </span>
      {!section.isFree && (
        <span className="mt-0.5 shrink-0 rounded border border-primary/25 bg-primary/10 px-1 py-px text-[9px] font-semibold uppercase tracking-wider text-primary">
          Pro
        </span>
      )}
    </Link>
  );
}

function TopicGroup({
  topic,
  sections,
  langSlug,
  activeTopic,
  activeSection,
  completedSections,
  defaultOpen,
  index,
  accentColor,
  forceOpen,
}: {
  topic: Topic;
  sections: SectionPick[];
  langSlug: string;
  activeTopic?: string;
  activeSection?: string;
  completedSections: string[];
  defaultOpen: boolean;
  index: number;
  accentColor: string;
  forceOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const expanded = forceOpen || isOpen;
  const isActiveTopic = activeTopic === topic.slug;
  const sorted = [...sections].sort((a, b) => a.order - b.order);
  const doneCount = sorted.filter((s) => completedSections.includes(s._id)).length;

  return (
    <div
      className="sidebar-topic-enter rounded-xl border border-transparent transition-colors duration-200"
      style={{
        animationDelay: `${index * 40}ms`,
        borderColor: isActiveTopic ? `${accentColor}22` : "transparent",
        background: isActiveTopic ? `${accentColor}08` : undefined,
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className={cn(
          "flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-left transition-colors",
          isActiveTopic ? "text-foreground" : "text-foreground/75 hover:bg-white/[0.03] hover:text-foreground"
        )}
      >
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-[10px] font-bold tabular-nums"
          style={{
            background: isActiveTopic ? `${accentColor}22` : "hsl(var(--muted) / 0.5)",
            color: isActiveTopic ? accentColor : "hsl(var(--muted-foreground))",
            border: `1px solid ${isActiveTopic ? `${accentColor}33` : "hsl(var(--border))"}`,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-semibold leading-tight">{topic.title}</span>
          <span className="mt-0.5 block text-[10px] text-muted-foreground">
            {sorted.length} section{sorted.length !== 1 ? "s" : ""}
            {doneCount > 0 && (
              <span className="text-emerald-400/90"> · {doneCount} done</span>
            )}
          </span>
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
            expanded && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-70"
        )}
      >
        <div className="overflow-hidden">
          {sorted.length > 0 ? (
            <div
              className="relative space-y-0.5 pb-2 pl-3 pr-1 pt-0.5"
              style={{ borderLeft: `2px solid ${accentColor}18` }}
            >
              <div
                className="pointer-events-none absolute bottom-2 left-[-1px] top-2 w-px"
                style={{ background: `linear-gradient(180deg, ${accentColor}55, transparent)` }}
              />
              {sorted.map((section) => (
                <SectionItem
                  key={section._id}
                  section={section}
                  href={`/docs/${langSlug}/topics/${topic.slug}/sections/${section.slug}`}
                  isActive={activeSection === section.slug}
                  isCompleted={completedSections.includes(section._id)}
                  accentColor={accentColor}
                />
              ))}
            </div>
          ) : (
            <p className="px-3 pb-2 text-[11px] text-muted-foreground">No sections yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function DocsSidebar({
  language,
  topics,
  activeLang,
  activeTopic,
  activeSection,
  completedSections = [],
  isOpen,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  const accentColor = language.color || "hsl(38 92% 50%)";

  const sortedTopics = useMemo(
    () => [...topics].sort((a, b) => a.order - b.order),
    [topics]
  );

  const filteredTopics = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sortedTopics;

    return sortedTopics
      .map((topic) => {
        const titleMatch = topic.title.toLowerCase().includes(q);
        const matchedSections = topic.sections.filter((s) => s.title.toLowerCase().includes(q));
        if (titleMatch) return topic;
        if (matchedSections.length === 0) return null;
        return { ...topic, sections: matchedSections };
      })
      .filter(Boolean) as typeof sortedTopics;
  }, [sortedTopics, query]);

  const totalSections = topics.reduce((acc, t) => acc + t.sections.length, 0);
  const completed = topics
    .flatMap((t) => t.sections)
    .filter((s) => completedSections.includes(s._id)).length;
  const progress = totalSections > 0 ? Math.round((completed / totalSections) * 100) : 0;

  const isSearching = query.trim().length > 0;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-[min(100vw,300px)] flex-col border-r border-white/[0.06] shadow-2xl shadow-black/40 transition-transform duration-300 ease-out",
          "sidebar-surface lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:w-[300px] lg:translate-x-0 lg:shadow-none",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-36"
          style={{
            background: `radial-gradient(ellipse 120% 90% at 50% -30%, ${accentColor}22, transparent 60%)`,
          }}
        />

        {/* Language header */}
        <div className="relative shrink-0 border-b border-white/[0.06] px-4 pb-4 pt-4">
          <div className="mb-4 flex items-start justify-between gap-2">
            <Link
              href={`/docs/${activeLang}`}
              className="group flex min-w-0 flex-1 items-center gap-3 rounded-xl p-1 -m-1 transition-colors hover:bg-white/[0.04]"
            >
              <div className="relative shrink-0">
                <div
                  className="absolute -inset-1 rounded-xl opacity-60 blur-md transition-opacity group-hover:opacity-80"
                  style={{ background: accentColor }}
                />
                <div
                  className="relative flex h-11 w-11 items-center justify-center rounded-xl font-mono text-sm font-black shadow-inner"
                  style={{
                    background: `linear-gradient(145deg, ${accentColor}33, ${accentColor}12)`,
                    color: accentColor,
                    border: `1px solid ${accentColor}44`,
                  }}
                >
                  {language.name.slice(0, 2).toUpperCase()}
                </div>
              </div>
              <div className="min-w-0">
                <p className="truncate font-mono text-[15px] font-bold leading-tight tracking-tight">
                  {language.name}
                </p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">{language.version}</p>
                <span
                  className="mt-1.5 inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium capitalize text-muted-foreground"
                >
                  <Sparkles className="h-2.5 w-2.5" style={{ color: accentColor }} />
                  {language.category}
                </span>
              </div>
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {totalSections > 0 && (
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 backdrop-blur-sm">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Your progress
                </span>
                <span
                  className="font-mono text-xs font-bold tabular-nums"
                  style={{ color: accentColor }}
                >
                  {progress}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-black/30">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${Math.max(progress, 2)}%`,
                    background: `linear-gradient(90deg, ${accentColor}cc, ${accentColor})`,
                    boxShadow: `0 0 14px ${accentColor}55`,
                  }}
                />
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">
                <span className="font-medium text-foreground/80">{completed}</span> of{" "}
                {totalSections} sections completed
              </p>
            </div>
          )}
        </div>

        {/* Search */}
        <div className="relative shrink-0 px-3 pb-2 pt-3">
          <Search className="pointer-events-none absolute left-6 top-[calc(50%-2px)] h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics & sections…"
            className="h-9 w-full rounded-lg border border-white/[0.06] bg-black/25 py-2 pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground/70 outline-none transition-[border-color,box-shadow] focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
          />
        </div>

        {/* Nav label */}
        <div className="flex shrink-0 items-center justify-between px-4 pb-1 pt-1">
          <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            <Layers className="h-3 w-3" />
            Curriculum
          </span>
          <span className="rounded-md bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            {filteredTopics.length}
          </span>
        </div>

        <nav className="sidebar-scroll flex-1 space-y-2 overflow-y-auto px-3 pb-4 pt-1">
          {filteredTopics.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/[0.08] px-4 py-10 text-center">
              <BookOpen className="mx-auto mb-2 h-8 w-8 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">
                {isSearching ? "No matches for your search" : "No topics yet"}
              </p>
            </div>
          ) : (
            filteredTopics.map((topic, index) => (
              <TopicGroup
                key={topic._id}
                topic={topic}
                sections={topic.sections}
                langSlug={activeLang}
                activeTopic={activeTopic}
                activeSection={activeSection}
                completedSections={completedSections}
                defaultOpen={activeTopic === topic.slug}
                forceOpen={isSearching}
                index={index}
                accentColor={accentColor}
              />
            ))
          )}
        </nav>

        {/* Footer */}
        <div className="shrink-0 space-y-0.5 border-t border-white/[0.06] bg-black/20 p-3">
          <Link
            href={`/docs/${activeLang}`}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors",
              pathname === `/docs/${activeLang}`
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
            )}
          >
            <Home className="h-3.5 w-3.5" />
            {language.name} overview
          </Link>
          <Link
            href="/docs"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-foreground"
          >
            <BookOpen className="h-3.5 w-3.5" />
            All languages
          </Link>
        </div>
      </aside>
    </>
  );
}
