import type { Review } from "@/types";

export const reviews: Review[] = [
  {
    id: "rev-1",
    name: "Mariana R.",
    initials: "MR",
    rating: 5,
    comment:
      "Melhor massa que já comi! A borda é incrivelmente leve e os ingredientes são nitidamente de primeira qualidade.",
  },
  {
    id: "rev-2",
    name: "João P.",
    initials: "JP",
    rating: 5,
    comment: "Entrega super rápida, a pizza chegou pelando. A Pepperoni Premium vale cada centavo.",
  },
  {
    id: "rev-3",
    name: "Carlos S.",
    initials: "CS",
    rating: 5,
    comment:
      "O ambiente é fantástico e a carta de vinhos combina perfeitamente com o cardápio. Retornarei.",
  },
];

export function getReviews(): Review[] {
  return reviews;
}
