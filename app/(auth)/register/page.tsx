import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="bg-surface-container-lowest p-8 rounded-3xl border border-surface-variant shadow-soft space-y-6">
      <div className="text-center space-y-2">
        <h1 className="font-headline text-2xl font-bold text-on-surface">Criar conta</h1>
        <p className="text-sm text-on-surface-variant">
          Cadastro de clientes será habilitado quando a autenticação for configurada.
        </p>
      </div>

      <form className="space-y-4 opacity-60 pointer-events-none" aria-disabled="true">
        <div>
          <label className="block text-xs font-semibold text-on-surface-variant mb-1">Nome</label>
          <input
            type="text"
            placeholder="Seu nome"
            disabled
            className="w-full px-3 py-2.5 border border-outline/30 rounded-xl bg-surface-container-low text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-on-surface-variant mb-1">E-mail</label>
          <input
            type="email"
            placeholder="seu@email.com"
            disabled
            className="w-full px-3 py-2.5 border border-outline/30 rounded-xl bg-surface-container-low text-sm"
          />
        </div>
        <button
          type="button"
          disabled
          className="w-full bg-primary text-on-primary font-semibold py-3 rounded-xl"
        >
          Cadastrar
        </button>
      </form>

      <p className="text-center text-sm text-on-surface-variant">
        Já tem conta?{" "}
        <Link href="/login" className="text-primary hover:underline font-medium">
          Entrar
        </Link>
      </p>
    </div>
  );
}
