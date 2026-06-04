import { AdminGlassCard } from "@/components/admin/ui/admin-glass-card";
import { AdminPageHeader } from "@/components/admin/ui/admin-page-header";
import { AdminRelatedLinks } from "@/components/admin/ui/admin-related-links";
import { AdminMockButton } from "@/components/admin/ui/admin-mock-button";
import { MOCK_CATEGORIES } from "@/lib/admin/mock-data";

export function CategoriasScreen() {
  return (
    <>
      <AdminPageHeader
        title="Categorias"
        description="Organize o cardápio por seções. Ordem reflete diretamente na loja."
        actions={<AdminMockButton icon="add">Nova categoria</AdminMockButton>}
      />

      <AdminGlassCard>
        <ul className="divide-y divide-outline-variant/30">
          {MOCK_CATEGORIES.map((cat) => (
            <li
              key={cat.name}
              className="flex items-center gap-4 py-4 first:pt-0 last:pb-0 group hover:bg-primary/5 -mx-2 px-2 rounded-xl transition-colors"
            >
              <span className="material-symbols-outlined text-on-surface-variant/50 cursor-grab">drag_indicator</span>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                {cat.order}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-on-surface">{cat.name}</p>
                <p className="text-xs text-on-surface-variant">{cat.items} itens</p>
              </div>
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  cat.visible ? "bg-emerald-500/15 text-emerald-700" : "bg-surface-container text-on-surface-variant"
                }`}
              >
                {cat.visible ? "Visível" : "Oculta"}
              </span>
              <AdminMockButton variant="ghost" className="py-2 px-3 text-xs">
                Editar
              </AdminMockButton>
            </li>
          ))}
        </ul>
      </AdminGlassCard>

      <AdminRelatedLinks currentPath="/admin/categorias" />
    </>
  );
}
