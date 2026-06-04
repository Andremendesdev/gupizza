"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_NAV, type AdminNavItem } from "@/lib/admin/navigation";

const GROUP_LABELS: Record<NonNullable<AdminNavItem["group"]>, string> = {
  operacao: "Operação",
  marketing: "Marketing",
  sistema: "Sistema",
};

type AdminSidebarProps = {
  open: boolean;
  onClose: () => void;
};

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const groups = ["operacao", "marketing", "sistema"] as const;

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Fechar menu"
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-[280px] flex flex-col border-r border-white/10 bg-[#0f1412] text-white transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-3 group" onClick={onClose}>
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-glow shrink-0">
              <span className="material-symbols-outlined text-on-primary text-[22px]">local_pizza</span>
            </div>
            <div>
              <p className="font-headline font-black text-sm leading-tight tracking-tight">Bigpizza do Gu</p>
              <p className="text-[10px] text-white/45 uppercase tracking-widest font-semibold">Painel Admin</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6 scrollbar-hide">
          {groups.map((group) => (
            <div key={group}>
              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-white/35">
                {GROUP_LABELS[group]}
              </p>
              <ul className="space-y-0.5">
                {ADMIN_NAV.filter((item) => item.group === group).map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                          active
                            ? "bg-primary text-on-primary shadow-glow"
                            : "text-white/70 hover:bg-white/8 hover:text-white"
                        }`}
                      >
                        <span
                          className="material-symbols-outlined text-[22px] shrink-0"
                          style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}
                        >
                          {item.icon}
                        </span>
                        <span className="truncate">{item.label}</span>
                        {active && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/8 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">storefront</span>
            Ver loja
          </Link>
        </div>
      </aside>
    </>
  );
}
