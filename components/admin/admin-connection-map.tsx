import Link from "next/link";
import { ADMIN_NAV } from "@/lib/admin/navigation";

export function AdminConnectionMap() {
  return (
    <div className="admin-glass rounded-2xl border border-white/60 p-6 md:p-8">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h3 className="font-headline text-lg font-bold text-on-surface">Mapa do painel</h3>
          <p className="text-sm text-on-surface-variant mt-1">
            Todas as telas compartilham o mesmo menu lateral. Use os atalhos abaixo para navegar entre módulos
            relacionados.
          </p>
        </div>
        <span className="material-symbols-outlined text-primary/60 text-[32px]">hub</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {ADMIN_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex flex-col gap-2 p-4 rounded-xl bg-surface-container-low/60 border border-outline-variant/30 hover:border-primary/35 hover:bg-primary/5 transition-all"
          >
            <span
              className="material-symbols-outlined text-primary text-[24px] group-hover:scale-110 transition-transform"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {item.icon}
            </span>
            <span className="text-sm font-bold text-on-surface leading-tight">{item.label}</span>
            <span className="text-[10px] text-on-surface-variant leading-snug line-clamp-2">
              {item.description}
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-outline-variant/30 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-on-surface-variant">
        <div className="flex gap-2">
          <span className="w-2 h-2 rounded-full bg-primary mt-1 shrink-0" />
          <p>
            <strong className="text-on-surface">Operação</strong> — Pedidos alimentam Impressoras e Entregadores.
          </p>
        </div>
        <div className="flex gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary-container mt-1 shrink-0" />
          <p>
            <strong className="text-on-surface">Marketing</strong> — Cupons e Promoções ligam ao Cardápio e Clientes.
          </p>
        </div>
        <div className="flex gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0" />
          <p>
            <strong className="text-on-surface">Sistema</strong> — IA, Impressoras e Entregadores ligam operação e Relatórios.
          </p>
        </div>
      </div>
    </div>
  );
}
