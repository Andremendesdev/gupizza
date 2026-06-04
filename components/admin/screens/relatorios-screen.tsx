import { AdminBarChart, AdminLineChart } from "@/components/admin/ui/admin-chart";
import { AdminGlassCard } from "@/components/admin/ui/admin-glass-card";
import { AdminPageHeader } from "@/components/admin/ui/admin-page-header";
import { AdminRelatedLinks } from "@/components/admin/ui/admin-related-links";
import { AdminMockButton } from "@/components/admin/ui/admin-mock-button";
import { CHART_ORDERS, CHART_REVENUE } from "@/lib/admin/mock-data";

export function RelatoriosScreen() {
  return (
    <>
      <AdminPageHeader
        title="Relatórios"
        description="Métricas de vendas, produtos e canais. Dados cruzados com Pedidos e Clientes."
        actions={
          <>
            <AdminMockButton variant="ghost" icon="date_range">Últimos 30 dias</AdminMockButton>
            <AdminMockButton icon="download">Baixar PDF</AdminMockButton>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Receita", value: "R$ 48.2k" },
          { label: "Pedidos", value: "612" },
          { label: "Novos clientes", value: "94" },
          { label: "Taxa recompra", value: "42%" },
        ].map((m) => (
          <div key={m.label} className="admin-glass rounded-2xl p-4 text-center">
            <p className="text-xs text-on-surface-variant font-semibold">{m.label}</p>
            <p className="font-headline text-xl font-black text-on-surface mt-1">{m.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <AdminGlassCard>
          <AdminLineChart data={CHART_REVENUE} label="Receita mensal" height={180} />
        </AdminGlassCard>
        <AdminGlassCard>
          <AdminBarChart data={CHART_ORDERS} label="Volume de pedidos" color="secondary" height={180} />
        </AdminGlassCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Top produtos", items: ["Calabresa", "Mussarela", "Combo Família"] },
          { title: "Canais", items: ["App 52%", "WhatsApp 31%", "Balcão 17%"] },
          { title: "Horários pico", items: ["19h–21h", "12h–14h", "Sábado"] },
        ].map((block) => (
          <AdminGlassCard key={block.title}>
            <h3 className="font-bold text-on-surface mb-3">{block.title}</h3>
            <ul className="space-y-2">
              {block.items.map((item, i) => (
                <li key={item} className="flex items-center justify-between text-sm">
                  <span>{item}</span>
                  <div className="w-16 h-1.5 rounded-full bg-surface-container overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${100 - i * 25}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </AdminGlassCard>
        ))}
      </div>

      <AdminRelatedLinks currentPath="/admin/relatorios" />
    </>
  );
}
