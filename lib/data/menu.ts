import type { MenuItem } from "@/types";

export const menuItems: MenuItem[] = [
  {
    id: "margherita-especial",
    name: "Margherita Especial",
    description:
      "Molho de tomate pelati, mozzarella de búfala fresca, manjericão selecionado e azeite extravirgem.",
    price: 59.9,
    category: "Clássicas",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC2sUO3kCkIM_nWraKnVYCrufYWwYF8rbQvmqeBvX48-9WdJqG_H9ibYTx7AurMmuCsrStAHdX-1yb40XBGG09_canN8nAO1ABI-4AVnHa7FqHp3vKh20i9ZC7WqYGohWclX2hZ-It8bRMJrJOQKitEGqRPfMevRM6JZgaj7zWXEUlM8YWA7_WYjgQSxUA7Le-DbsdFucys_kgckexZweS-VD6uL6kT4mdpLQUGSjXSEXFZobp6m29Q-RNHDrsGJeuKXYc1YHYEtF0",
    rating: 4.9,
    favorite: false,
    ingredients: [
      "Molho de Tomate Pelati",
      "Mozzarella de Búfala",
      "Manjericão Fresco",
      "Azeite Extravirgem",
    ],
  },
  {
    id: "pepperoni-premium",
    name: "Pepperoni Premium",
    description:
      "Generosas fatias de pepperoni artesanal, mozzarella derretida sobre nossa base de tomate secreto.",
    price: 64.9,
    category: "Clássicas",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAKgCbenkSgNZN5rpEYBpwo4Cr2ZqgUQiBguwwZ0ain_uM1KyjV1CropgJ6l0WlW9pnz7t9p-YdgEoWIFT4x5ppuEMktU0Cx0Mo6Zhad4YUzY6MLjBPTw83_ZSVT37qO86oJ8fNJlSuRyCmO7IsETG4-MPuWA2Epy3fyy7sJa3S8iXwRoc7gSdifReIa1dmmwM7M8bFvTEL1ChO--OTgytEOEOkFKftYAZhgpF68bvJmrOFDXdaaq3lmXlFijLzE1f6g8CplVWI_yU",
    rating: 4.8,
    favorite: true,
    ingredients: ["Molho Secreto", "Mozzarella Especial", "Pepperoni Artesanal", "Orégano"],
  },
  {
    id: "quatro-queijos-doro",
    name: "Quatro Queijos D'Oro",
    description:
      "Combinação nobre de mozzarella derretida, gorgonzola dolce, provolone premium defumado e o legítimo catupiry.",
    price: 68.9,
    category: "Clássicas",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60",
    rating: 4.7,
    favorite: false,
    ingredients: ["Mozzarella", "Gorgonzola Dolce", "Provolone Defumado", "Catupiry Legítimo"],
  },
  {
    id: "calabresa-gourmet",
    name: "Calabresa Gourmet",
    description:
      "Calabresa artesanal defumada de alta qualidade, cebola roxa bem fininha e azeitonas azapa selecionadas.",
    price: 58.9,
    category: "Clássicas",
    image:
      "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60",
    rating: 4.6,
    favorite: false,
    ingredients: [
      "Molho de Tomate",
      "Mozzarella",
      "Calabresa Defumada",
      "Cebola Roxa",
      "Azeitonas Pretas",
    ],
  },
  {
    id: "frango-com-catupiry",
    name: "Frango com Catupiry",
    description:
      "Peito de frango desfiado temperado com ervas finas, milho verde cozido e catupiry cremoso original.",
    price: 62.9,
    category: "Especiais",
    image:
      "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=500&auto=format&fit=crop&q=60",
    rating: 4.8,
    favorite: false,
    ingredients: ["Molho de Tomate", "Mozzarella", "Frango Desfiado", "Catupiry", "Milho Verde"],
  },
  {
    id: "basilica-parme",
    name: "Basílica & Parme",
    description:
      "Molho rústico, presunto de Parma curado, rúcula baby fresca, lascas de parmesão de 12 meses e redução de vinagre balsâmico.",
    price: 74.9,
    category: "Especiais",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&auto=format&fit=crop&q=60",
    rating: 4.9,
    favorite: true,
    ingredients: ["Presunto Parma", "Rúcula Selvagem", "Lascas de Parmesão", "Redução de Balsâmico"],
  },
  {
    id: "trufada-cogumelos",
    name: "Trufada de Cogumelos",
    description:
      "Mix com cogumelos Shimeji e Paris salteados no azeite de trufas brancas, coberto com mozzarella fresca de búfala.",
    price: 76.9,
    category: "Especiais",
    image:
      "https://images.unsplash.com/photo-1604917621956-10dfa7cce2e7?w=500&auto=format&fit=crop&q=60",
    rating: 4.9,
    favorite: false,
    ingredients: ["Cogumelos Paris", "Cogumelos Shimeji", "Azeite Trufado", "Búfala Fresca"],
  },
  {
    id: "brigadeiro-belga",
    name: "Brigadeiro Belga",
    description:
      "Creme aveludado de chocolate belga ao leite, flocos de chocolate nobre e morangos frescos e suculentos na massa crocante.",
    price: 54.9,
    category: "Doces",
    image:
      "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=500&auto=format&fit=crop&q=60",
    rating: 4.8,
    favorite: false,
    ingredients: ["Creme de Chocolate Belga", "Raspas de Chocolate", "Morangos Selecionados"],
  },
  {
    id: "banana-com-canela",
    name: "Banana com Canela",
    description:
      "Fatias de banana assadas no forno a lenha, queijo leve, açúcar mascavo caramelizado, canela em pó e mel silvestre.",
    price: 49.9,
    category: "Doces",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=500&auto=format&fit=crop&q=60",
    rating: 4.5,
    favorite: false,
    ingredients: ["Bananas", "Açúcar Mascavo", "Canela", "Mel Silvestre"],
  },
  {
    id: "refrigerante-lata",
    name: "Refrigerante Lata",
    description:
      "Escolha entre Coca-Cola original, Coca-Cola Zero, Guaraná Antarctica ou Fanta Laranja super gelados.",
    price: 7.9,
    category: "Bebidas",
    image:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=60",
    ingredients: ["Lata de 350ml"],
  },
  {
    id: "suco-natural",
    name: "Suco Natural de Uva",
    description:
      "Suco integral natural de uvas selecionadas da serra gaúcha. Sem adição de açúcar ou conservantes.",
    price: 12.9,
    category: "Bebidas",
    image:
      "https://images.unsplash.com/photo-1543531400-764a5117945d?w=500&auto=format&fit=crop&q=60",
    ingredients: ["Integral 300ml"],
  },
  {
    id: "promo-combo-casal",
    name: "Combo Casal — Promoção Agora",
    description:
      "1 Pizza Margherita Especial Grande + 1 refrigerante lata gelado. Ideal para dois — preço especial por tempo limitado.",
    price: 59.9,
    originalPrice: 67.8,
    category: "Promoção agora",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC2sUO3kCkIM_nWraKnVYCrufYWwYF8rbQvmqeBvX48-9WdJqG_H9ibYTx7AurMmuCsrStAHdX-1yb40XBGG09_canN8nAO1ABI-4AVnHa7FqHp3vKh20i9ZC7WqYGohWclX2hZ-It8bRMJrJOQKitEGqRPfMevRM6JZgaj7zWXEUlM8YWA7_WYjgQSxUA7Le-DbsdFucys_kgckexZweS-VD6uL6kT4mdpLQUGSjXSEXFZobp6m29Q-RNHDrsGJeuKXYc1YHYEtF0",
    rating: 5,
    favorite: true,
  },
  {
    id: "promo-combo-familia",
    name: "Combo Família — Promoção Agora",
    description:
      "2 pizzas grandes (Margherita com borda de catupiry + Pepperoni) + 2 refrigerantes. Festa completa com desconto.",
    price: 119.9,
    originalPrice: 148.6,
    category: "Promoção agora",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60",
    rating: 4.9,
    favorite: true,
  },
  {
    id: "promo-calabresa",
    name: "Calabresa Gourmet em Promo",
    description:
      "Calabresa artesanal defumada com cebola roxa e azeitonas — oferta exclusiva da aba Promoção agora.",
    price: 49.9,
    originalPrice: 58.9,
    category: "Promoção agora",
    image:
      "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60",
    rating: 4.8,
    favorite: false,
    ingredients: [
      "Molho de Tomate",
      "Mozzarella",
      "Calabresa Defumada",
      "Cebola Roxa",
      "Azeitonas Pretas",
    ],
  },
  {
    id: "cerveja-artesanal",
    name: "Cerveja Artesanal IPA",
    description:
      "Cerveja artesanal local India Pale Ale encorpada, refrescante e aromática com lúpulos americanos marcantes.",
    price: 18.9,
    category: "Bebidas",
    image:
      "https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=500&auto=format&fit=crop&q=60",
    ingredients: ["Garrafa 500ml"],
  },
];

export function getMenuItems(): MenuItem[] {
  return menuItems;
}
