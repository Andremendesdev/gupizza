import { AdminGlassCard } from "@/components/admin/ui/admin-glass-card";
import { AdminPageHeader } from "@/components/admin/ui/admin-page-header";
import { AdminRelatedLinks } from "@/components/admin/ui/admin-related-links";
import { AdminMockButton } from "@/components/admin/ui/admin-mock-button";

const DRIVERS = [
  { name: "Pedro R.", status: "Em rota", orders: 2, eta: "12 min" },
  { name: "Lucas M.", status: "Disponível", orders: 0, eta: "—" },
  { name: "Rafael S.", status: "Em rota", orders: 1, eta: "8 min" },
  { name: "Bruno K.", status: "Offline", orders: 0, eta: "—" },
];

export function EntregadoresScreen() {
  return (
    <>
      <AdminPageHeader
        title="Entregadores"
        description="Equipe de entrega, rotas e disponibilidade. Sincroniza com Pedidos e Relatórios."
        actions={<AdminMockButton icon="person_add">Cadastrar entregador</AdminMockButton>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <AdminGlassCard className="lg:col-span-3 min-h-[320px] flex flex-col">
          <p className="text-xs font-bold uppercase text-on-surface-variant mb-4">Mapa de entregas</p>
          <div className="flex-1 rounded-xl bg-gradient-to-br from-green-900/20 via-green-800/10 to-primary/10 border border-outline-variant/30 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: "radial-gradient(circle at 20% 30%, #b91c1c 0%, transparent 40%), radial-gradient(circle at 70% 60%, #166534 0%, transparent 35%)",
            }} />
            <div className="relative text-center">
              <span className="material-symbols-outlined text-primary text-[48px]">map</span>
              <p className="text-sm font-semibold text-on-surface-variant mt-2">Visualização de rotas (preview)</p>
            </div>
            {[20, 45, 65, 30].map((left, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-primary shadow-glow"
                style={{ left: `${left}%`, top: `${30 + i * 12}%` }}
              />
            ))}
          </div>
        </AdminGlassCard>

        <div className="lg:col-span-2 space-y-3">
          {DRIVERS.map((d) => (
            <AdminGlassCard key={d.name} padding="sm">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary/15 flex items-center justify-center font-bold text-primary">
                  {d.name[0]}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{d.name}</p>
                  <p className="text-xs text-on-surface-variant">{d.status}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-primary">{d.orders} pedidos</p>
                  <p className="text-[10px] text-on-surface-variant">{d.eta}</p>
                </div>
              </div>
            </AdminGlassCard>
          ))}
        </div>
      </div>

      <AdminRelatedLinks currentPath="/admin/entregadores" />
    </>
  );
}
