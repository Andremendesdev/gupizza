import { AdminGlassCard } from "@/components/admin/ui/admin-glass-card";
import { AdminPageHeader } from "@/components/admin/ui/admin-page-header";
import { AdminRelatedLinks } from "@/components/admin/ui/admin-related-links";
import { AdminMockButton } from "@/components/admin/ui/admin-mock-button";

const PRINTERS = [
  { name: "Cozinha — Principal", location: "Cozinha", status: "online", jobs: 3 },
  { name: "Balcão — Cliente", location: "Balcão", status: "online", jobs: 0 },
  { name: "Entrega — Comanda", location: "Expedição", status: "offline", jobs: 0 },
];

export function ImpressorasScreen() {
  return (
    <>
      <AdminPageHeader
        title="Impressoras"
        description="Impressão automática de pedidos na cozinha e balcão. Ligado ao módulo Pedidos."
        actions={<AdminMockButton icon="add">Adicionar impressora</AdminMockButton>}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PRINTERS.map((p) => (
          <AdminGlassCard key={p.name}>
            <div className="flex items-start justify-between">
              <span className="material-symbols-outlined text-[40px] text-on-surface-variant/40">print</span>
              <span
                className={`flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-full ${
                  p.status === "online" ? "bg-emerald-500/15 text-emerald-700" : "bg-red-500/15 text-red-700"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${p.status === "online" ? "bg-emerald-500" : "bg-red-500"}`}
                />
                {p.status === "online" ? "Online" : "Offline"}
              </span>
            </div>
            <h3 className="font-bold text-on-surface mt-4">{p.name}</h3>
            <p className="text-sm text-on-surface-variant">{p.location}</p>
            <p className="text-xs text-on-surface-variant mt-3">
              {p.jobs > 0 ? `${p.jobs} na fila de impressão` : "Sem jobs na fila"}
            </p>
            <AdminMockButton variant="ghost" className="w-full mt-4">
              Testar impressão
            </AdminMockButton>
          </AdminGlassCard>
        ))}
      </div>

      <AdminRelatedLinks currentPath="/admin/impressoras" />
    </>
  );
}
