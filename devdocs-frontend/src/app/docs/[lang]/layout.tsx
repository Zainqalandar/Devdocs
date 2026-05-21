import { notFound } from "next/navigation";
import { DocsLayoutClient } from "@/components/layout/DocsLayoutClient";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function getLanguage(slug: string) {
  try {
    const res = await fetch(`${API}/languages/${slug}`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data?.language ?? null;
  } catch { return null; }
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const language = await getLanguage(lang);
  if (!language) notFound();

  return (
    <DocsLayoutClient language={language} langSlug={lang}>
      {children}
    </DocsLayoutClient>
  );
}
