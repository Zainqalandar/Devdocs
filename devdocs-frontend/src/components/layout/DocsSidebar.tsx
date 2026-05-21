"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, CheckCircle2, Circle, BookOpen, X } from "lucide-react";
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

function SectionItem({
  section,
  href,
  isActive,
  isCompleted,
}: {
  section: Pick<Section, "_id" | "title" | "slug" | "readingTimeMinutes" | "isFree">;
  href: string;
  isActive: boolean;
  isCompleted: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all",
        isActive
          ? "bg-primary/15 text-primary font-medium"
          : "text-muted-foreground hover:text-foreground hover:bg-accent"
      )}
    >
      <span className="shrink-0">
        {isCompleted ? (
          <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
        ) : (
          <Circle className={cn("w-3.5 h-3.5", isActive ? "text-primary" : "text-muted-foreground/40")} />
        )}
      </span>
      <span className="truncate">{section.title}</span>
      {!section.isFree && (
        <span className="ml-auto shrink-0 text-[10px] border border-primary/30 text-primary px-1 rounded">PRO</span>
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
}: {
  topic: Topic;
  sections: Pick<Section, "_id" | "slug" | "title" | "order" | "readingTimeMinutes" | "isFree">[];
  langSlug: string;
  activeTopic?: string;
  activeSection?: string;
  completedSections: string[];
  defaultOpen: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const isActive = activeTopic === topic.slug;

  return (
    <div className="mb-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between gap-2 px-3 py-2 rounded-md text-sm font-semibold transition-all",
          isActive
            ? "text-foreground"
            : "text-foreground/70 hover:text-foreground hover:bg-accent"
        )}
      >
        <span className="truncate text-left">{topic.title}</span>
        <span className="shrink-0 text-muted-foreground">
          {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </span>
      </button>

      {isOpen && sections.length > 0 && (
        <div className="ml-3 mt-0.5 pl-3 border-l border-border space-y-0.5">
          {sections
            .sort((a, b) => a.order - b.order)
            .map((section) => (
              <SectionItem
                key={section._id}
                section={section}
                href={`/docs/${langSlug}/topics/${topic.slug}/sections/${section.slug}`}
                isActive={activeSection === section.slug}
                isCompleted={completedSections.includes(section._id)}
              />
            ))}
        </div>
      )}
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
  const totalSections = topics.reduce((acc, t) => acc + t.sections.length, 0);
  const completed = topics
    .flatMap((t) => t.sections)
    .filter((s) => completedSections.includes(s._id)).length;
  const progress = totalSections > 0 ? Math.round((completed / totalSections) * 100) : 0;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full z-50 w-72 flex flex-col border-r border-border bg-code-bg transition-transform duration-300",
          "lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-mono font-black text-xs shrink-0"
              style={{
                background: `${language.color}22`,
                color: language.color,
                border: `1px solid ${language.color}33`,
              }}
            >
              {language.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="font-mono font-bold text-sm leading-none">{language.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{language.version}</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-1.5 rounded-md hover:bg-accent transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress bar */}
        {totalSections > 0 && (
          <div className="px-4 py-3 border-b border-border shrink-0">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{completed}/{totalSections} sections</span>
            </div>
            <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">{progress}% complete</p>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5 scrollbar-thin">
          {topics.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No topics yet</p>
            </div>
          ) : (
            topics
              .sort((a, b) => a.order - b.order)
              .map((topic) => (
                <TopicGroup
                  key={topic._id}
                  topic={topic}
                  sections={topic.sections}
                  langSlug={activeLang}
                  activeTopic={activeTopic}
                  activeSection={activeSection}
                  completedSections={completedSections}
                  defaultOpen={activeTopic === topic.slug}
                />
              ))
          )}
        </nav>
      </aside>
    </>
  );
}
