"use client";

import { useParams } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-ui";
import { TopicForm } from "@/components/admin/TopicForm";

export default function NewTopicPage() {
  const { slug: langSlug } = useParams<{ slug: string }>();
  return (
    <div>
      <AdminPageHeader title="New topic" />
      <TopicForm langSlug={langSlug} />
    </div>
  );
}
