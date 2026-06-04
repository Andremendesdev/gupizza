"use client";

import { ADMIN_NAV_BY_HREF } from "@/lib/admin/navigation";

type AdminTopbarProps = {
  pathname: string;
  onMenuClick: () => void;
};

export function AdminTopbar({ pathname, onMenuClick }: AdminTopbarProps) {
  const current = ADMIN_NAV_BY_HREF[pathname] ?? ADMIN_NAV_BY_HREF["/admin"];
  const crumbs =
    pathname === "/admin"
      ? ["Admin", "Dashboard"]
      : ["Admin", current.label];

  return (
    <header className="sticky top-0 z-30 admin-glass border-b border-white/50 px-4 md:px-6 py-3 md:py-4">
      <div className="flex items-center gap-3 md:gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface"
          aria-label="Abrir menu"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        <div className="flex-1 min-w-0">
          <nav className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium mb-0.5">
            {crumbs.map((crumb, i) => (
              <span key={crumb} className="flex items-center gap-1.5">
                {i > 0 && <span className="opacity-40">/</span>}
                <span className={i === crumbs.length - 1 ? "text-on-surface font-semibold" : ""}>
                  {crumb}
                </span>
              </span>
            ))}
          </nav>
          <h2 className="font-headline text-lg md:text-xl font-bold text-on-surface truncate">
            {current.label}
          </h2>
        </div>

        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-low/80 border border-outline-variant/30">
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">search</span>
            <span className="text-sm text-on-surface-variant/60">Buscar pedidos, clientes...</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            className="relative w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface"
            aria-label="Notificações"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
          </button>
          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-outline-variant/40">
            <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-sm">
              GU
            </div>
            <div className="text-left hidden md:block">
              <p className="text-xs font-bold text-on-surface leading-none">Admin Gu</p>
              <p className="text-[10px] text-on-surface-variant mt-0.5">Gerente</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
