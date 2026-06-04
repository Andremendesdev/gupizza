import { AdminGlassCard } from "@/components/admin/ui/admin-glass-card";
import { AdminPageHeader } from "@/components/admin/ui/admin-page-header";
import { AdminRelatedLinks } from "@/components/admin/ui/admin-related-links";
import { AdminMockButton } from "@/components/admin/ui/admin-mock-button";
import { MOCK_CLIENTS } from "@/lib/admin/mock-data";

export function ClientesScreen() {
  return (
    <>
      <AdminPageHeader
        title="Clientes"
        description="Base de clientes, histórico e preferências. Integra com Pedidos, Cupons e IA."
        actions={
          <>
            <AdminMockButton variant="ghost" icon="download">Exportar</AdminMockButton>
            <AdminMockButton icon="person_add">Novo cliente</AdminMockButton>
          </>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total clientes", value: "1.248", icon: "groups" },
          { label: "Recorrentes", value: "68%", icon: "repeat" },
          { label: "Novos este mês", value: "94", icon: "person_add" },
        ].map((s) => (
          <div key={s.label} className="admin-glass rounded-2xl p-5 flex items-center gap-4">
            <span className="material-symbols-outlined text-primary text-[28px]">{s.icon}</span>
            <div>
              <p className="text-xs text-on-surface-variant font-semibold">{s.label}</p>
              <p className="font-headline text-2xl font-black">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <AdminGlassCard>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-on-surface-variant border-b border-outline-variant/40">
                <th className="pb-3 font-semibold">Cliente</th>
                <th className="pb-3 font-semibold">Telefone</th>
                <th className="pb-3 font-semibold">Pedidos</th>
                <th className="pb-3 font-semibold">Gasto total</th>
                <th className="pb-3 font-semibold">Último pedido</th>
                <th className="pb-3 font-semibold" />
              </tr>
            </thead>
            <tbody>
              {MOCK_CLIENTS.map((c) => (
                <tr key={c.phone} className="border-b border-outline-variant/20 hover:bg-primary/5">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center font-bold text-primary text-xs">
                        {c.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <span className="font-bold">{c.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-on-surface-variant">{c.phone}</td>
                  <td className="py-4">{c.orders}</td>
                  <td className="py-4 font-semibold text-primary">{c.spent}</td>
                  <td className="py-4 text-on-surface-variant">{c.last}</td>
                  <td className="py-4">
                    <AdminMockButton variant="ghost" className="py-2 px-3 text-xs">
                      Ver
                    </AdminMockButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminGlassCard>

      <AdminRelatedLinks currentPath="/admin/clientes" />
    </>
  );
}
