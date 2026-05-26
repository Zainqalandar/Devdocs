"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/** Redirect to main languages page — create is handled in modal */
export default function NewLanguageRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/admin/languages");
  }, [router]);
  return null;
}
