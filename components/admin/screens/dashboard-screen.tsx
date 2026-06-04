import { AdminConnectionMap } from "@/components/admin/admin-connection-map";
import { AdminBarChart, AdminLineChart } from "@/components/admin/ui/admin-chart";
import { AdminGlassCard } from "@/components/admin/ui/admin-glass-card";
import { AdminPageHeader } from "@/components/admin/ui/admin-page-header";
import { AdminRelatedLinks } from "@/components/admin/ui/admin-related-links";
import { AdminStatCard } from "@/components/admin/ui/admin-stat-card";
import { AdminMockButton } from "@/components/admin/ui/admin-mock-button";
import { CHART_ORDERS, CHART_REVENUE, MOCK_ORDERS, MOCK_STATS } from "@/lib/admin/mock-data";

const STATUS_COLORS: Record<string, string> = {
  Pendente: "bg-amber-500/15 text-amber-800",
  Preparando: "bg-blue-500/15 text-blue-800",
  "No forno": "bg-orange-500/15 text-orange-800",
  Entrega: "bg-primary/15 text-primary",
  Entregue: "bg-emerald-500/15 text-emerald-800",
};

export function DashboardScreen() {
  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description="Visão geral da operação em tempo real — pedidos, faturamento e desempenho do dia."
        actions={
          <>
            <AdminMockButton variant="ghost" icon="calendar_today">
              Hoje
            </AdminMockButton>
            <AdminMockButton icon="download">Exportar</AdminMockButton>
          </>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {MOCK_STATS.map((s) => (
          <AdminStatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <AdminGlassCard>
          <AdminLineChart data={CHART_REVENUE} label="Faturamento — últimos 12 meses" height={160} />
        </AdminGlassCard>
        <AdminGlassCard>
          <AdminBarChart data={CHART_ORDERS} label="Pedidos — últimos 12 meses" color="secondary" height={160} />
        </AdminGlassCard>
      </div>

      <AdminGlassCard className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-headline font-bold text-on-surface">Pedidos recentes</h3>
          <AdminMockButton variant="ghost" icon="arrow_forward">
            Ver todos
          </AdminMockButton>
        </div>
        <div className="overflow-x-auto -mx-2">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-on-surface-variant border-b border-outline-variant/40">
                <th className="pb-3 px-2 font-semibold">Pedido</th>
                <th className="pb-3 px-2 font-semibold">Cliente</th>
                <th className="pb-3 px-2 font-semibold">Itens</th>
                <th className="pb-3 px-2 font-semibold">Total</th>
                <th className="pb-3 px-2 font-semibold">Status</th>
                <th className="pb-3 px-2 font-semibold">Canal</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ORDERS.map((o) => (
                <tr key={o.id} className="border-b border-outline-variant/20 hover:bg-primary/5 transition-colors">
                  <td className="py-3 px-2 font-bold text-on-surface">{o.id}</td>
                  <td className="py-3 px-2">{o.client}</td>
                  <td className="py-3 px-2 text-on-surface-variant">{o.items}</td>
                  <td className="py-3 px-2 font-semibold">{o.total}</td>
                  <td className="py-3 px-2">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${STATUS_COLORS[o.status] ?? ""}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-on-surface-variant">{o.channel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminGlassCard>

      <AdminConnectionMap />
      <AdminRelatedLinks currentPath="/admin" />
    </>
  );
}
