"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { DocsSidebar } from "@/components/layout/DocsSidebar";
import { DocsTopbar } from "@/components/layout/DocsTopbar";
import { api } from "@/api/client";
import type { Language, Topic, Section } from "@/types";

type TopicWithSections = Topic & {
  sections: Pick<Section, "_id" | "slug" | "title" | "order" | "readingTimeMinutes" | "isFree">[];
};

interface DocsLayoutClientProps {
  language: Language;
  langSlug: string;
  children: React.ReactNode;
}

export function DocsLayoutClient({ language, langSlug, children }: DocsLayoutClientProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [topics, setTopics] = useState<TopicWithSections[]>([]);

  // Parse active topic/section from pathname
  // e.g. /docs/javascript/topics/js-basics/sections/javascript-variables
  const parts = pathname.split("/").filter(Boolean);
  const topicsIdx = parts.indexOf("topics");
  const sectionsIdx = parts.indexOf("sections");
  const activeTopic = topicsIdx !== -1 ? parts[topicsIdx + 1] : undefined;
  const activeSection = sectionsIdx !== -1 ? parts[sectionsIdx + 1] : undefined;

  // Human-readable breadcrumb from topics state
  const activeTopicObj = topics.find((t) => t.slug === activeTopic);
  const activeSectionObj = activeTopicObj?.sections.find((s) => s.slug === activeSection);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    async function loadTopics() {
      try {
        const res = await api.getTopics(langSlug);
        if (!res.data) return;
        const withSections = await Promise.all(
          res.data.map(async (topic) => {
            try {
              const sr = await api.getSections(langSlug, topic.slug);
              return { ...topic, sections: sr.data || [] };
            } catch {
              return { ...topic, sections: [] };
            }
          })
        );
        setTopics(withSections);
      } catch {}
    }
    loadTopics();
  }, [langSlug]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DocsSidebar
        language={language}
        topics={topics}
        activeLang={langSlug}
        activeTopic={activeTopic}
        activeSection={activeSection}
        completedSections={[]}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DocsTopbar
          langName={language.name}
          langSlug={langSlug}
          topicTitle={activeTopicObj?.title}
          topicSlug={activeTopic}
          sectionTitle={activeSectionObj?.title}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
