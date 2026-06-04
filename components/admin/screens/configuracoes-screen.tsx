import { AdminGlassCard } from "@/components/admin/ui/admin-glass-card";
import { AdminPageHeader } from "@/components/admin/ui/admin-page-header";
import { AdminRelatedLinks } from "@/components/admin/ui/admin-related-links";
import { AdminMockButton } from "@/components/admin/ui/admin-mock-button";

const TABS = ["Geral", "Horários", "Pagamentos", "Entrega", "Equipe"];
const SETTINGS = [
  { label: "Nome da loja", value: "Bigpizza do Gu", icon: "store" },
  { label: "Telefone", value: "(11) 3456-7890", icon: "call" },
  { label: "Endereço", value: "Av. Paulista, 1000 — São Paulo", icon: "location_on" },
  { label: "Raio de entrega", value: "8 km", icon: "distance" },
  { label: "Pedido mínimo", value: "R$ 35,00", icon: "shopping_bag" },
  { label: "Taxa de entrega", value: "R$ 6,90", icon: "delivery_dining" },
];

export function ConfiguracoesScreen() {
  return (
    <>
      <AdminPageHeader
        title="Configurações"
        description="Dados da loja, pagamentos, horários e equipe. Base para Impressoras e integrações."
        actions={<AdminMockButton icon="save">Salvar alterações</AdminMockButton>}
      />

      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            type="button"
            className={`shrink-0 px-4 py-2 rounded-xl text-sm font-bold ${
              i === 0 ? "bg-primary text-on-primary" : "admin-glass text-on-surface-variant"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AdminGlassCard>
          <h3 className="font-bold text-on-surface mb-4">Informações da loja</h3>
          <ul className="space-y-4">
            {SETTINGS.map((s) => (
              <li key={s.label} className="flex items-center gap-4">
                <span className="material-symbols-outlined text-on-surface-variant text-[22px]">{s.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-on-surface-variant font-semibold">{s.label}</p>
                  <p className="font-semibold text-on-surface truncate">{s.value}</p>
                </div>
                <AdminMockButton variant="ghost" className="py-2 px-3 text-xs shrink-0">
                  Editar
                </AdminMockButton>
              </li>
            ))}
          </ul>
        </AdminGlassCard>

        <div className="space-y-4">
          <AdminGlassCard>
            <h3 className="font-bold text-on-surface mb-3">Horário de funcionamento</h3>
            <div className="space-y-2 text-sm">
              {[
                { day: "Seg–Qui", hours: "18h – 23h" },
                { day: "Sex–Sáb", hours: "18h – 00h" },
                { day: "Dom", hours: "18h – 22h" },
              ].map((h) => (
                <p key={h.day} className="flex justify-between py-2 border-b border-outline-variant/20 last:border-0">
                  <span className="text-on-surface-variant">{h.day}</span>
                  <span className="font-semibold">{h.hours}</span>
                </p>
              ))}
            </div>
          </AdminGlassCard>
          <AdminGlassCard>
            <h3 className="font-bold text-on-surface mb-3">Integrações</h3>
            <ul className="space-y-3">
              {[
                { name: "WhatsApp Business", on: true },
                { name: "PIX automático", on: true },
                { name: "iFood", on: false },
              ].map((int) => (
                <li key={int.name} className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{int.name}</span>
                  <span
                    className={`w-10 h-6 rounded-full relative ${int.on ? "bg-primary" : "bg-surface-container-high"}`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${
                        int.on ? "left-5" : "left-1"
                      }`}
                    />
                  </span>
                </li>
              ))}
            </ul>
          </AdminGlassCard>
        </div>
      </div>

      <AdminRelatedLinks currentPath="/admin/configuracoes" />
    </>
  );
}
