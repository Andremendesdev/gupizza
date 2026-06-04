import { AdminGlassCard } from "@/components/admin/ui/admin-glass-card";
import { AdminPageHeader } from "@/components/admin/ui/admin-page-header";
import { AdminRelatedLinks } from "@/components/admin/ui/admin-related-links";
import { AdminMockButton } from "@/components/admin/ui/admin-mock-button";
import { MOCK_ORDERS } from "@/lib/admin/mock-data";

const COLUMNS = [
  { title: "Pendente", color: "border-amber-400/50", orders: MOCK_ORDERS.filter((o) => o.status === "Pendente") },
  { title: "Preparando", color: "border-blue-400/50", orders: MOCK_ORDERS.filter((o) => o.status === "Preparando") },
  { title: "No forno", color: "border-orange-400/50", orders: MOCK_ORDERS.filter((o) => o.status === "No forno") },
  { title: "Entrega", color: "border-primary/50", orders: MOCK_ORDERS.filter((o) => o.status === "Entrega") },
  { title: "Entregue", color: "border-emerald-400/50", orders: MOCK_ORDERS.filter((o) => o.status === "Entregue") },
];

export function PedidosScreen() {
  return (
    <>
      <AdminPageHeader
        title="Pedidos"
        description="Gerencie a fila da cozinha e entregas. Conecta com Impressoras, Entregadores e IA."
        actions={
          <>
            <AdminMockButton variant="ghost" icon="filter_list">Filtros</AdminMockButton>
            <AdminMockButton icon="refresh">Atualizar</AdminMockButton>
          </>
        }
      />

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {["Todos", "App", "WhatsApp"].map((tab, i) => (
          <button
            key={tab}
            type="button"
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-colors ${
              i === 0 ? "bg-primary text-on-primary" : "bg-white/60 text-on-surface-variant border border-outline-variant/40"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 overflow-x-auto">
        {COLUMNS.map((col) => (
          <div key={col.title} className={`admin-glass rounded-2xl border-2 ${col.color} p-4 min-w-[220px]`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-on-surface">{col.title}</h3>
              <span className="text-xs font-bold bg-surface-container px-2 py-0.5 rounded-full">
                {col.orders.length}
              </span>
            </div>
            <div className="space-y-3">
              {col.orders.length === 0 ? (
                <p className="text-xs text-on-surface-variant text-center py-6">Nenhum pedido</p>
              ) : (
                col.orders.map((o) => (
                  <div
                    key={o.id}
                    className="p-3 rounded-xl bg-surface-container-lowest/90 border border-outline-variant/30 shadow-soft"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-sm">{o.id}</span>
                      <span className="text-[10px] text-on-surface-variant">{o.time}</span>
                    </div>
                    <p className="text-xs font-semibold text-on-surface">{o.client}</p>
                    <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">{o.items}</p>
                    <p className="text-sm font-bold text-primary mt-2">{o.total}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      <AdminRelatedLinks currentPath="/admin/pedidos" />
    </>
  );
}
