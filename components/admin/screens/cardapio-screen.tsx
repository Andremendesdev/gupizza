import { AdminGlassCard } from "@/components/admin/ui/admin-glass-card";
import { AdminPageHeader } from "@/components/admin/ui/admin-page-header";
import { AdminRelatedLinks } from "@/components/admin/ui/admin-related-links";
import { AdminMockButton } from "@/components/admin/ui/admin-mock-button";
import { MOCK_MENU } from "@/lib/admin/mock-data";

export function CardapioScreen() {
  return (
    <>
      <AdminPageHeader
        title="Cardápio"
        description="Produtos, preços e disponibilidade. Ligado a Categorias, Promoções e Cupons."
        actions={
          <>
            <AdminMockButton variant="ghost" icon="auto_awesome">Criar com IA</AdminMockButton>
            <AdminMockButton icon="add">Novo item</AdminMockButton>
          </>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {MOCK_MENU.map((item) => (
          <AdminGlassCard key={item.name} padding="sm" className="group hover:border-primary/30 transition-colors">
            <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-primary/10 to-green-900/10 mb-4 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary/40 text-[48px]">local_pizza</span>
            </div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-bold text-on-surface">{item.name}</h3>
                <p className="text-xs text-on-surface-variant mt-0.5">{item.category}</p>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                  item.active ? "bg-emerald-500/15 text-emerald-700" : "bg-surface-container text-on-surface-variant"
                }`}
              >
                {item.active ? "Ativo" : "Pausado"}
              </span>
            </div>
            <p className="text-lg font-black text-primary mt-2">{item.price}</p>
            <p className="text-xs text-on-surface-variant mt-1">{item.sales} vendas no mês</p>
            <div className="flex gap-2 mt-4">
              <AdminMockButton variant="ghost" className="flex-1 text-xs py-2">
                Editar
              </AdminMockButton>
            </div>
          </AdminGlassCard>
        ))}
        <button
          type="button"
          className="admin-glass rounded-2xl border-2 border-dashed border-outline-variant/50 p-6 flex flex-col items-center justify-center gap-2 min-h-[280px] text-on-surface-variant hover:border-primary/40 hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-[40px]">add_circle</span>
          <span className="font-bold text-sm">Adicionar produto</span>
        </button>
      </div>

      <AdminRelatedLinks currentPath="/admin/cardapio" />
    </>
  );
}
