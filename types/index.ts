export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Clássicas" | "Especiais" | "Doces" | "Bebidas" | "Promoção agora";
  originalPrice?: number;
  image: string;
  rating?: number;
  favorite?: boolean;
  ingredients?: string[];
}

export type PizzaAssemblyMode = "inteira" | "meia" | "tres";

export interface PizzaFlavorSelection {
  id: string;
  name: string;
  image: string;
  price: number;
}

export interface PizzaAssembly {
  mode: PizzaAssemblyMode;
  flavors: PizzaFlavorSelection[];
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  selectedSize: "Média" | "Grande" | "Família";
  selectedBorder: "Sem Borda" | "Borda de Catupiry" | "Borda de Chocolate" | "Borda de Cheddar";
  extraIngredients: string[];
  totalPrice: number;
  pizzaAssembly?: PizzaAssembly;
}

export interface Review {
  id: string;
  name: string;
  initials: string;
  rating: number;
  comment: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: "Pendente" | "Preparando" | "No Forno" | "Em Rota de Entrega" | "Entregue";
  createdAt: string;
  userName: string;
  userPhone: string;
  userAddress: string;
  deliveryMethod: "Entrega" | "Retirada";
  paymentMethod: "Cartão de Crédito" | "Cartão de Débito" | "Pix" | "Dinheiro";
}

export type StoreTab = "menu" | "deals" | "orders";
