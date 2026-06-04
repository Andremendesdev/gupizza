import { AdminGlassCard } from "@/components/admin/ui/admin-glass-card";
import { AdminPageHeader } from "@/components/admin/ui/admin-page-header";
import { AdminRelatedLinks } from "@/components/admin/ui/admin-related-links";
import { AdminMockButton } from "@/components/admin/ui/admin-mock-button";

const MOCK_PROMOS = [
  { title: "Combo Família", desc: "2 pizzas G + refri 2L", price: "R$ 119,90", badge: "Mais vendido", active: true },
  { title: "Terça em Dobro", desc: "Segunda pizza metade do preço", price: "—", badge: "Agendada", active: true },
  { title: "Happy Hour", desc: "15% off das 17h às 19h", price: "—", badge: "Recorrente", active: false },
];

export function PromocoesScreen() {
  return (
    <>
      <AdminPageHeader
        title="Promoções"
        description="Combos e campanhas sazonais. Exibidas na loja e vinculadas ao Cardápio."
        actions={<AdminMockButton icon="campaign">Nova promoção</AdminMockButton>}
      />

      <div className="space-y-4">
        {MOCK_PROMOS.map((p) => (
          <AdminGlassCard key={p.title} className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="w-full md:w-32 h-24 md:h-20 rounded-xl bg-gradient-to-br from-secondary-container/40 to-primary/20 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-[36px]">local_offer</span>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-bold text-lg text-on-surface">{p.title}</h3>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-secondary-container/30 text-on-secondary-container">
                  {p.badge}
                </span>
              </div>
              <p className="text-sm text-on-surface-variant mt-1">{p.desc}</p>
              {p.price !== "—" && <p className="text-primary font-black mt-2">{p.price}</p>}
            </div>
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full shrink-0 ${
                p.active ? "bg-emerald-500/15 text-emerald-700" : "bg-surface-container"
              }`}
            >
              {p.active ? "Ativa" : "Pausada"}
            </span>
            <AdminMockButton variant="ghost">Editar</AdminMockButton>
          </AdminGlassCard>
        ))}
      </div>

      <AdminRelatedLinks currentPath="/admin/promocoes" />
    </>
  );
}
