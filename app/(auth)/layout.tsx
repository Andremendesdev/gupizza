import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrar | Bigpizza do Gu",
  description: "Acesse sua conta para acompanhar pedidos e favoritos.",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
