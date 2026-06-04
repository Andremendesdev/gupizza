export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-headline text-2xl font-bold text-on-surface">Dashboard</h2>
        <p className="text-on-surface-variant mt-2">
          Área reservada para gestão de pedidos, cardápio e relatórios. Proteja esta rota com
          autenticação de administrador quando integrar o banco de dados.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Pedidos", desc: "Acompanhe pedidos em tempo real" },
          { title: "Cardápio", desc: "Gerencie itens, preços e categorias" },
          { title: "Clientes", desc: "Visualize histórico e preferências" },
        ].map((card) => (
          <div
            key={card.title}
            className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-variant shadow-soft"
          >
            <h3 className="font-bold text-on-surface">{card.title}</h3>
            <p className="text-sm text-on-surface-variant mt-2">{card.desc}</p>
            <span className="inline-block mt-4 text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
              Em breve
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
