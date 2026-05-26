"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

/** Redirect to main languages page — edit is handled in modal */
export default function EditLanguageRedirectPage() {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();
  useEffect(() => {
    router.replace("/admin/languages");
  }, [router, slug]);
  return null;
}
