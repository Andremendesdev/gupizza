export type AdminNavItem = {
  href: string;
  label: string;
  icon: string;
  description: string;
  group?: "operacao" | "marketing" | "sistema";
};

export const ADMIN_NAV: AdminNavItem[] = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: "dashboard",
    description: "Visão geral da operação",
    group: "operacao",
  },
  {
    href: "/admin/pedidos",
    label: "Pedidos",
    icon: "receipt_long",
    description: "Fila e status em tempo real",
    group: "operacao",
  },
  {
    href: "/admin/cardapio",
    label: "Cardápio",
    icon: "restaurant_menu",
    description: "Produtos, preços e disponibilidade",
    group: "operacao",
  },
  {
    href: "/admin/categorias",
    label: "Categorias",
    icon: "category",
    description: "Organização do menu",
    group: "operacao",
  },
  {
    href: "/admin/clientes",
    label: "Clientes",
    icon: "groups",
    description: "Base e histórico de compras",
    group: "operacao",
  },
  {
    href: "/admin/cupons",
    label: "Cupons",
    icon: "confirmation_number",
    description: "Códigos de desconto",
    group: "marketing",
  },
  {
    href: "/admin/promocoes",
    label: "Promoções",
    icon: "local_offer",
    description: "Combos e campanhas",
    group: "marketing",
  },
  {
    href: "/admin/impressoras",
    label: "Impressoras",
    icon: "print",
    description: "Cozinha e balcão",
    group: "sistema",
  },
  {
    href: "/admin/entregadores",
    label: "Entregadores",
    icon: "delivery_dining",
    description: "Rotas e disponibilidade",
    group: "sistema",
  },
  {
    href: "/admin/relatorios",
    label: "Relatórios",
    icon: "monitoring",
    description: "Métricas e exportação",
    group: "sistema",
  },
  {
    href: "/admin/ia",
    label: "IA",
    icon: "auto_awesome",
    description: "Assistente e automações",
    group: "sistema",
  },
  {
    href: "/admin/configuracoes",
    label: "Configurações",
    icon: "settings",
    description: "Loja, pagamentos e equipe",
    group: "sistema",
  },
];

export const ADMIN_NAV_BY_HREF = Object.fromEntries(ADMIN_NAV.map((item) => [item.href, item])) as Record<
  string,
  AdminNavItem
>;

export const ADMIN_RELATED: Record<string, string[]> = {
  "/admin": ["/admin/pedidos", "/admin/relatorios", "/admin/ia"],
  "/admin/pedidos": ["/admin/entregadores", "/admin/impressoras", "/admin/ia"],
  "/admin/cardapio": ["/admin/categorias", "/admin/promocoes", "/admin/cupons"],
  "/admin/categorias": ["/admin/cardapio", "/admin/promocoes"],
  "/admin/clientes": ["/admin/pedidos", "/admin/cupons", "/admin/ia"],
  "/admin/cupons": ["/admin/promocoes", "/admin/clientes"],
  "/admin/promocoes": ["/admin/cardapio", "/admin/cupons"],
  "/admin/impressoras": ["/admin/pedidos", "/admin/configuracoes"],
  "/admin/entregadores": ["/admin/pedidos", "/admin/relatorios"],
  "/admin/relatorios": ["/admin/pedidos", "/admin/clientes", "/admin/promocoes"],
  "/admin/ia": ["/admin/relatorios", "/admin/pedidos", "/admin/clientes"],
  "/admin/configuracoes": ["/admin/impressoras", "/admin/ia", "/admin/entregadores"],
};
