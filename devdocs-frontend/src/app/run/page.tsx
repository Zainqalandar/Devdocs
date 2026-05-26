import { Suspense } from "react";
import { RunPageClient } from "./RunPageClient";

export const metadata = {
  title: "Run Code | DevDocs",
  description: "Execute code examples from DevDocs",
};

export default function RunPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground text-sm">
          Loading runner…
        </div>
      }
    >
      <RunPageClient />
    </Suspense>
  );
}
