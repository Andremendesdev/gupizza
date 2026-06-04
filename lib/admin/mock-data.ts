export const MOCK_STATS = [
  { label: "Pedidos hoje", value: "47", delta: "+12%", trend: "up" as const, icon: "receipt_long" },
  { label: "Faturamento", value: "R$ 3.842", delta: "+8%", trend: "up" as const, icon: "payments" },
  { label: "Ticket médio", value: "R$ 81,70", delta: "-2%", trend: "down" as const, icon: "sell" },
  { label: "Tempo médio", value: "28 min", delta: "-4 min", trend: "up" as const, icon: "schedule" },
];

export const MOCK_ORDERS = [
  { id: "#1042", client: "Maria S.", items: "2x Calabresa G", total: "R$ 89,90", status: "Preparando", time: "12 min", channel: "App" },
  { id: "#1041", client: "João P.", items: "1x Combo Família", total: "R$ 124,00", status: "No forno", time: "18 min", channel: "WhatsApp" },
  { id: "#1040", client: "Ana L.", items: "3x Mussarela M", total: "R$ 156,50", status: "Entrega", time: "32 min", channel: "App" },
  { id: "#1039", client: "Carlos M.", items: "1x Portuguesa G", total: "R$ 62,00", status: "Entregue", time: "45 min", channel: "App" },
  { id: "#1038", client: "Fernanda R.", items: "2x Frango c/ Catupiry", total: "R$ 98,00", status: "Pendente", time: "2 min", channel: "App" },
];

export const MOCK_MENU = [
  { name: "Calabresa Especial", category: "Tradicionais", price: "R$ 54,90", active: true, sales: 128 },
  { name: "Mussarela", category: "Tradicionais", price: "R$ 42,90", active: true, sales: 210 },
  { name: "Combo Família", category: "Combos", price: "R$ 119,90", active: true, sales: 86 },
  { name: "Portuguesa", category: "Tradicionais", price: "R$ 58,90", active: false, sales: 44 },
];

export const MOCK_CATEGORIES = [
  { name: "Tradicionais", items: 12, order: 1, visible: true },
  { name: "Especiais", items: 8, order: 2, visible: true },
  { name: "Combos", items: 5, order: 3, visible: true },
  { name: "Bebidas", items: 14, order: 4, visible: true },
  { name: "Sobremesas", items: 6, order: 5, visible: false },
];

export const MOCK_CLIENTS = [
  { name: "Maria Silva", phone: "(11) 98765-4321", orders: 24, spent: "R$ 1.940", last: "Hoje" },
  { name: "João Pedro", phone: "(11) 91234-5678", orders: 18, spent: "R$ 1.520", last: "Ontem" },
  { name: "Ana Lima", phone: "(11) 99876-1234", orders: 31, spent: "R$ 2.680", last: "Hoje" },
  { name: "Carlos Mendes", phone: "(11) 97654-3210", orders: 9, spent: "R$ 720", last: "3 dias" },
];

export const CHART_REVENUE = [42, 58, 45, 72, 68, 85, 78, 92, 88, 95, 102, 98];
export const CHART_ORDERS = [12, 18, 15, 22, 20, 28, 24, 30, 26, 32, 35, 31];
