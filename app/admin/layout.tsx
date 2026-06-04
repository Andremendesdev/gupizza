import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin | Bigpizza do Gu",
  description: "Painel administrativo da pizzaria.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-container-low">
      <header className="bg-surface-container-lowest border-b border-outline-variant px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-on-surface-variant font-semibold">
              Painel Admin
            </p>
            <h1 className="font-headline text-xl font-bold text-on-surface">Bigpizza do Gu</h1>
          </div>
          <Link href="/" className="text-sm text-primary hover:underline font-medium">
            Voltar ao site
          </Link>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
