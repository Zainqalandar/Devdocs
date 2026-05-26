"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/api/client";
import type { Language } from "@/types";
import { AdminPageHeader } from "@/components/admin/admin-ui";
import { LanguageForm } from "@/components/admin/LanguageForm";

export default function EditLanguagePage() {
  const { slug } = useParams<{ slug: string }>();
  const [language, setLanguage] = useState<Language | null>(null);

  useEffect(() => {
    api.getLanguage(slug).then((res) => {
      if (res.data?.language) setLanguage(res.data.language);
    });
  }, [slug]);

  if (!language) {
    return <p className="text-sm text-muted-foreground">Loading…</p>;
  }

  return (
    <div>
      <AdminPageHeader title={`Edit ${language.name}`} />
      <LanguageForm initial={language} slug={slug} />
    </div>
  );
}
