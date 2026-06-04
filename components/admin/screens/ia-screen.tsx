import { AdminGlassCard } from "@/components/admin/ui/admin-glass-card";
import { AdminPageHeader } from "@/components/admin/ui/admin-page-header";
import { AdminRelatedLinks } from "@/components/admin/ui/admin-related-links";
import { AdminMockButton } from "@/components/admin/ui/admin-mock-button";

const SUGGESTIONS = [
  { icon: "trending_up", title: "Previsão de demanda", desc: "Sábado 19h: +35% pedidos esperados" },
  { icon: "chat", title: "Resposta automática", desc: "12 mensagens WhatsApp podem ser automatizadas" },
];

const AI_MESSAGES = [
  { role: "assistant", text: "Olá! Sou o assistente da Bigpizza do Gu. Posso ajudar com pedidos, relatórios e sugestões de promoção." },
  { role: "user", text: "Quais foram os 3 produtos mais vendidos esta semana?" },
  { role: "assistant", text: "1. Mussarela (210 un.) · 2. Calabresa Especial (128) · 3. Combo Família (86). Quer criar uma promoção com base nisso?" },
];

export function IaScreen() {
  return (
    <>
      <AdminPageHeader
        title="IA"
        description="Assistente inteligente, automações e insights. Conecta Relatórios, Pedidos e Clientes."
        actions={<AdminMockButton icon="auto_awesome">Nova automação</AdminMockButton>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <AdminGlassCard className="min-h-[400px] flex flex-col">
            <div className="flex items-center gap-3 pb-4 border-b border-outline-variant/30">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-green-900 flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary">auto_awesome</span>
              </div>
              <div>
                <p className="font-bold">Assistente Gu</p>
                <p className="text-xs text-on-surface-variant">Powered by IA — apenas visual</p>
              </div>
            </div>
            <div className="flex-1 py-4 space-y-4">
              {AI_MESSAGES.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-surface-container text-on-surface"
                        : "bg-primary/10 border border-primary/20 text-on-surface"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 pt-4 border-t border-outline-variant/30">
              <div className="flex-1 px-4 py-3 rounded-xl bg-surface-container-low text-sm text-on-surface-variant">
                Pergunte sobre vendas, cardápio, clientes...
              </div>
              <AdminMockButton icon="send">Enviar</AdminMockButton>
            </div>
          </AdminGlassCard>
        </div>

        <div className="space-y-4">
          {SUGGESTIONS.map((s) => (
            <AdminGlassCard key={s.title} padding="sm">
              <span className="material-symbols-outlined text-primary text-[24px]">{s.icon}</span>
              <h3 className="font-bold text-sm mt-2">{s.title}</h3>
              <p className="text-xs text-on-surface-variant mt-1">{s.desc}</p>
            </AdminGlassCard>
          ))}
          <AdminGlassCard padding="sm" className="bg-primary/5 border-primary/20">
            <p className="text-xs font-bold uppercase text-primary mb-2">Automações ativas</p>
            <ul className="text-sm space-y-2 text-on-surface">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Confirmação WhatsApp
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Resumo diário 22h
              </li>
            </ul>
          </AdminGlassCard>
        </div>
      </div>

      <AdminRelatedLinks currentPath="/admin/ia" />
    </>
  );
}
