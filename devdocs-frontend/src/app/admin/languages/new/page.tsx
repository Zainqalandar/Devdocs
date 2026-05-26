"use client";

import { AdminPageHeader } from "@/components/admin/admin-ui";
import { LanguageForm } from "@/components/admin/LanguageForm";

export default function NewLanguagePage() {
  return (
    <div>
      <AdminPageHeader title="New language" description="Add a new documentation track." />
      <LanguageForm />
    </div>
  );
}
