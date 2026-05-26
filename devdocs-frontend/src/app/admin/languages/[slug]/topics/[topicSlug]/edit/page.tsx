"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/api/client";
import type { Topic } from "@/types";
import { AdminPageHeader } from "@/components/admin/admin-ui";
import { TopicForm } from "@/components/admin/TopicForm";

export default function EditTopicPage() {
  const { slug: langSlug, topicSlug } = useParams<{ slug: string; topicSlug: string }>();
  const [topic, setTopic] = useState<Topic | null>(null);

  useEffect(() => {
    api.getTopic(langSlug, topicSlug).then((res) => {
      if (res.data?.topic) setTopic(res.data.topic);
    });
  }, [langSlug, topicSlug]);

  if (!topic) return <p className="text-sm text-muted-foreground">Loading…</p>;

  return (
    <div>
      <AdminPageHeader title={`Edit: ${topic.title}`} />
      <TopicForm langSlug={langSlug} initial={topic} topicSlug={topicSlug} />
    </div>
  );
}
