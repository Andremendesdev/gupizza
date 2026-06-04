import { AdminGlassCard } from "@/components/admin/ui/admin-glass-card";
import { AdminPageHeader } from "@/components/admin/ui/admin-page-header";
import { AdminRelatedLinks } from "@/components/admin/ui/admin-related-links";
import { AdminMockButton } from "@/components/admin/ui/admin-mock-button";

const MOCK_COUPONS = [
  { code: "GU10", discount: "10% off", uses: "142 / 500", expires: "30/06/2026", active: true },
  { code: "PIZZA20", discount: "R$ 20 off", uses: "38 / 100", expires: "15/05/2026", active: true },
  { code: "BEMVINDO", discount: "15% primeira compra", uses: "89 / ∞", expires: "—", active: true },
  { code: "FERIADO", discount: "R$ 15 off", uses: "200 / 200", expires: "01/01/2026", active: false },
];

export function CuponsScreen() {
  return (
    <>
      <AdminPageHeader
        title="Cupons"
        description="Códigos de desconto para campanhas. Conecta com Promoções e Clientes."
        actions={<AdminMockButton icon="add">Criar cupom</AdminMockButton>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_COUPONS.map((c) => (
          <AdminGlassCard key={c.code} className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[100%]" />
            <div className="flex items-start justify-between relative">
              <div>
                <p className="font-mono text-2xl font-black text-primary tracking-wider">{c.code}</p>
                <p className="text-sm font-semibold text-on-surface mt-1">{c.discount}</p>
              </div>
              <span
                className={`text-xs font-bold px-2 py-1 rounded-full ${
                  c.active ? "bg-emerald-500/15 text-emerald-700" : "bg-surface-container text-on-surface-variant"
                }`}
              >
                {c.active ? "Ativo" : "Expirado"}
              </span>
            </div>
            <div className="mt-4 pt-4 border-t border-outline-variant/30 grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-on-surface-variant">Usos</p>
                <p className="font-bold text-on-surface">{c.uses}</p>
              </div>
              <div>
                <p className="text-on-surface-variant">Validade</p>
                <p className="font-bold text-on-surface">{c.expires}</p>
              </div>
            </div>
          </AdminGlassCard>
        ))}
      </div>

      <AdminRelatedLinks currentPath="/admin/cupons" />
    </>
  );
}
