"use client";

import type { MenuItem, CartItem } from "@/types";

interface DealsSectionProps {
  onApplyPromoCode: (code: string) => void;
  onAddComboToCart: (combo: CartItem[]) => void;
  menuItems: MenuItem[];
}

export function DealsSection({
  onApplyPromoCode,
  onAddComboToCart,
  menuItems,
}: DealsSectionProps) {
  
  const handleAddCasalCombo = () => {
    // Find Margherita (id: margherita-especial) & Refrigerante (id: refrigerante-lata)
    const margherita = menuItems.find(m => m.id === "margherita-especial");
    const refri = menuItems.find(m => m.id === "refrigerante-lata");

    if (!margherita || !refri) return;

    const items: CartItem[] = [
      {
        id: `combo-casal-pizz-${Date.now()}`,
        menuItem: margherita,
        quantity: 1,
        selectedSize: "Grande",
        selectedBorder: "Sem Borda",
        extraIngredients: [],
        totalPrice: margherita.price,
      },
      {
        id: `combo-casal-ref-${Date.now()}`,
        menuItem: refri,
        quantity: 1,
        selectedSize: "Grande", // Default/fallback
        selectedBorder: "Sem Borda",
        extraIngredients: [],
        totalPrice: refri.price,
      }
    ];

    onAddComboToCart(items);
    alert("Combo Casal (1 Pizza Margherita Grande + 1 Refrigerante Lata) adicionado ao carrinho!");
  };

  const handleAddFamiliaCombo = () => {
    // Find Margherita & Pepperoni & Refrigerante
    const margherita = menuItems.find(m => m.id === "margherita-especial");
    const pepper = menuItems.find(m => m.id === "pepperoni-premium");
    const refri = menuItems.find(m => m.id === "refrigerante-lata");

    if (!margherita || !pepper || !refri) return;

    const items: CartItem[] = [
      {
        id: `combo-fam-pizz1-${Date.now()}`,
        menuItem: margherita,
        quantity: 1,
        selectedSize: "Grande",
        selectedBorder: "Borda de Catupiry", // Gourmet bonus
        extraIngredients: [],
        totalPrice: margherita.price + 8.0, // Stuffed crust included
      },
      {
        id: `combo-fam-pizz2-${Date.now()}`,
        menuItem: pepper,
        quantity: 1,
        selectedSize: "Grande",
        selectedBorder: "Sem Borda",
        extraIngredients: [],
        totalPrice: pepper.price,
      },
      {
        id: `combo-fam-ref-${Date.now()}`,
        menuItem: refri,
        quantity: 2, // Double beverage
        selectedSize: "Grande",
        selectedBorder: "Sem Borda",
        extraIngredients: [],
        totalPrice: refri.price * 2,
      }
    ];

    onAddComboToCart(items);
    alert("Combo Família Completo (1 Margherita com Borda, 1 Pepperoni Grande, e 2 Refrigerantes) adicionado ao carrinho!");
  };

  return (
    <div className="py-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto space-y-12 mt-12 font-sans" id="deals-section">
      
      {/* Title block */}
      <div className="border-b border-surface-container pb-6 text-center md:text-left">
        <h2 className="font-headline-md text-headline-md text-on-surface">🏷️ Promoções & Cupons Especiais</h2>
        <p className="text-sm text-on-surface-variant mt-1">
          Aproveite fatias deliciosas com preços irresistíveis
        </p>
      </div>

      {/* Grid of Coupons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Coupon 1 */}
        <div className="bg-gradient-to-r from-red-700 to-red-600 text-white p-6 rounded-3xl relative overflow-hidden shadow-floating flex flex-col justify-between h-48 group">
          <div className="space-y-1">
            <span className="px-2.5 py-0.5 bg-black/30 font-bold text-[10px] uppercase rounded-full tracking-wider">
              10% DE DESCONTO
            </span>
            <h4 className="font-bold text-xl font-headline text-white">Cupom de Boas-vindas</h4>
            <p className="text-white/80 text-xs">Válido no valor total dos produtos.</p>
          </div>

          <div className="flex items-center justify-between border-t border-white/20 pt-4 mt-4">
            <div>
              <span className="text-[10px] text-white/70 block uppercase font-mono">CÓDIGO</span>
              <span className="font-bold font-mono text-lg tracking-wider text-secondary-container">PIZZA10</span>
            </div>
            <button
              onClick={() => onApplyPromoCode("PIZZA10")}
              className="bg-white text-primary font-bold text-xs px-4 py-2 rounded-xl cursor-pointer hover:bg-neutral-100 transition-colors"
            >
              Aplicar Cupom
            </button>
          </div>
        </div>

        {/* Coupon 2 */}
        <div className="bg-gradient-to-r from-[#1a1c1c] to-[#404343] text-white p-6 rounded-3xl relative overflow-hidden shadow-floating flex flex-col justify-between h-48 group">
          <div className="space-y-1">
            <span className="px-2.5 py-0.5 bg-primary/20 font-bold text-[10px] uppercase rounded-full tracking-wider text-primary-fixed">
              TAXA GRÁTIS
            </span>
            <h4 className="font-bold text-xl font-headline text-white">Entrega Grátis</h4>
            <p className="text-white/80 text-xs">Desconto equivalente ao frete de entrega.</p>
          </div>

          <div className="flex items-center justify-between border-t border-white/20 pt-4 mt-4">
            <div>
              <span className="text-[10px] text-white/70 block uppercase font-mono">CÓDIGO</span>
              <span className="font-bold font-mono text-lg tracking-wider text-secondary-container">FRETEGRATIS</span>
            </div>
            <button
              onClick={() => onApplyPromoCode("FRETEGRATIS")}
              className="bg-white text-on-surface font-bold text-xs px-4 py-2 rounded-xl cursor-pointer hover:bg-neutral-100 transition-colors"
            >
              Aplicar Cupom
            </button>
          </div>
        </div>

      </div>

      {/* Combos portion */}
      <div className="space-y-6 pt-6">
        <h4 className="font-bold text-lg text-on-surface uppercase tracking-wide border-b pb-2">
          Combos Exclusivos (Adição em 1 Clique)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Combo 1 Card */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-variant flex flex-col justify-between gap-6 shadow-soft">
            <div className="space-y-2">
              <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container rounded-md font-bold text-[10px] uppercase">
                MAIS VENDIDO 💑
              </span>
              <h5 className="font-bold text-base text-on-surface">Combo Casal Moderno</h5>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Leve 1 Pizza Margherita Especial Grande (8 fatias) de fermentação natural + 1 Latinha de Refrigerante gelada! Jantar ideal para dois.
              </p>
            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <div>
                <span className="text-xs text-on-surface-variant block">De R$ 67,80 por</span>
                <span className="font-bold text-xl text-primary font-headline">R$ 59,90</span>
              </div>
              <button
                onClick={handleAddCasalCombo}
                className="bg-primary text-on-primary font-semibold text-xs px-5 py-3 rounded-xl cursor-pointer hover:bg-surface-tint transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                Adicionar Combo
              </button>
            </div>
          </div>

          {/* Combo 2 Card */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-variant flex flex-col justify-between gap-6 shadow-soft">
            <div className="space-y-2">
              <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-md font-bold text-[10px] uppercase">
                FESTA COMPLETA 🍕✨
              </span>
              <h5 className="font-bold text-base text-on-surface">Combo Super Família</h5>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Leve 1 Pizza Margherita Grande recheada com Borda de Catupiry + 1 Pizza Pepperoni Premium Grande tradicional + 2 Refrigerantes lata de 350ml por preço único reduzido!
              </p>
            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <div>
                <span className="text-xs text-on-surface-variant block">De R$ 148,60 por</span>
                <span className="font-bold text-xl text-primary font-headline">R$ 119,90</span>
              </div>
              <button
                onClick={handleAddFamiliaCombo}
                className="bg-primary text-on-primary font-semibold text-xs px-5 py-3 rounded-xl cursor-pointer hover:bg-surface-tint transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                Adicionar Combo
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
