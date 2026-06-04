import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="bg-surface-container-lowest p-8 rounded-3xl border border-surface-variant shadow-soft space-y-6">
      <div className="text-center space-y-2">
        <h1 className="font-headline text-2xl font-bold text-on-surface">Entrar</h1>
        <p className="text-sm text-on-surface-variant">
          Autenticação será integrada em breve. Esta rota já está preparada para NextAuth ou similar.
        </p>
      </div>

      <form className="space-y-4 opacity-60 pointer-events-none" aria-disabled="true">
        <div>
          <label className="block text-xs font-semibold text-on-surface-variant mb-1">E-mail</label>
          <input
            type="email"
            placeholder="seu@email.com"
            disabled
            className="w-full px-3 py-2.5 border border-outline/30 rounded-xl bg-surface-container-low text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-on-surface-variant mb-1">Senha</label>
          <input
            type="password"
            placeholder="••••••••"
            disabled
            className="w-full px-3 py-2.5 border border-outline/30 rounded-xl bg-surface-container-low text-sm"
          />
        </div>
        <button
          type="button"
          disabled
          className="w-full bg-primary text-on-primary font-semibold py-3 rounded-xl"
        >
          Entrar
        </button>
      </form>

      <p className="text-center text-sm text-on-surface-variant">
        <Link href="/" className="text-primary hover:underline font-medium">
          Voltar ao cardápio
        </Link>
      </p>
    </div>
  );
}
