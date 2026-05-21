import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center">
        <p className="font-mono font-black text-8xl text-primary/20 mb-4">404</p>
        <h1 className="font-mono font-black text-3xl mb-3">Page not found</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/docs" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Docs
        </Link>
      </div>
    </div>
  );
}
