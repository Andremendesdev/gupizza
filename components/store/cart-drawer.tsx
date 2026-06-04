"use client";

import { useState, useEffect, type FormEvent } from "react";
import type { CartItem, Order } from "@/types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, q: number) => void;
  userAddress: string;
  setUserAddress: (address: string) => void;
  onPlaceOrder: (order: Order) => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  userAddress,
  setUserAddress,
  onPlaceOrder,
}: CartDrawerProps) {
  const [deliveryMethod, setDeliveryMethod] = useState<"Entrega" | "Retirada">("Entrega");
  const [paymentMethod, setPaymentMethod] = useState<"Cartão de Crédito" | "Cartão de Débito" | "Pix" | "Dinheiro">("Cartão de Crédito");
  
  // Checkout credentials
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  
  // Coupon state
  const [coupon, setCoupon] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0); // R$ deduction
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  // Subtotal calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const deliveryFee = deliveryMethod === "Entrega" ? 8.0 : 0.0;
  
  // Recalculate coupons based on subtotal change
  useEffect(() => {
    if (appliedDiscount > 0 && subtotal === 0) {
      setAppliedDiscount(0);
      setCouponSuccess("");
    }
  }, [subtotal, appliedDiscount]);

  if (!isOpen) return null;

  const handleApplyCoupon = () => {
    setCouponError("");
    setCouponSuccess("");
    
    const formatted = coupon.trim().toUpperCase();
    if (formatted === "PIZZA10") {
      const disc = subtotal * 0.1;
      setAppliedDiscount(disc);
      setCouponSuccess("Cupom PIZZA10 aplicado! 10% de desconto.");
    } else if (formatted === "FRETEGRATIS") {
      if (deliveryMethod === "Entrega") {
        setAppliedDiscount(8.0);
        setCouponSuccess("Cupom FRETEGRATIS aplicado! R$ 8,00 de desconto.");
      } else {
        setCouponError("Cupom válido somente para entregas domiciliares.");
      }
    } else {
      setCouponError("Cupom inválido. Tente 'PIZZA10' ou 'FRETEGRATIS'.");
    }
  };

  const total = Math.max(0, subtotal + deliveryFee - appliedDiscount);

  const handleSubmitOrder = (e: FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    
    if (!userName.trim()) {
      alert("Por favor, preencha o seu nome.");
      return;
    }
    if (!userPhone.trim()) {
      alert("Por favor, informe seu telefone de contato.");
      return;
    }
    if (deliveryMethod === "Entrega" && !userAddress.trim()) {
      alert("Por favor, forneça o endereço de entrega do pedido.");
      return;
    }

    const newOrder: Order = {
      id: `MODERNO-${Math.floor(1000 + Math.random() * 9000)}`,
      items: cartItems,
      subtotal,
      deliveryFee,
      discount: appliedDiscount,
      total,
      status: "Pendente",
      createdAt: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      userName,
      userPhone,
      userAddress: deliveryMethod === "Entrega" ? userAddress : "Retirada na Pizzaria",
      deliveryMethod,
      paymentMethod,
    };

    onPlaceOrder(newOrder);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fade-in" id="cart-drawer-overlay">
      
      {/* Backdrop Close trigger */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />

      {/* Drawer Panel */}
      <div 
        className="bg-surface-container-lowest w-full max-w-md h-full shadow-floating flex flex-col animate-slide-left text-on-surface font-sans"
        id="cart-drawer-panel"
      >
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-surface-container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">shopping_bag</span>
            <h3 className="font-headline-sm text-headline-sm">Sua Sacola</h3>
            <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
              {cartItems.reduce((acc, current) => acc + current.quantity, 0)}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-on-surface-variant hover:text-primary p-1 cursor-pointer transition-colors"
            title="Fechar Sacola"
            id="btn-close-cart"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6" id="cart-drawer-scroll-container">
          
          {/* Cart item list */}
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-[64px] text-outline-variant mb-3">
                shopping_cart_checkout
              </span>
              <p className="font-semibold text-base">Sua sacola está vazia</p>
              <p className="text-xs max-w-[240px] mt-1">
                Adicione deliciosas fatias artesanais das seções do menu para começar!
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 bg-primary text-on-primary px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-surface-tint cursor-pointer transition-colors"
                id="btn-cart-back-to-menu"
              >
                Escolher Pizzas
              </button>
            </div>
          ) : (
            <div className="divide-y divide-surface-container space-y-4" id="cart-items-list">
              {cartItems.map((item, idx) => (
                <div key={item.id} className={`flex gap-3 pt-4 ${idx === 0 ? "pt-0" : ""}`}>
                  {/* Item Image representation */}
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    className="w-16 h-16 rounded-xl object-cover"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Configuration detail description */}
                  <div className="flex-grow min-w-0">
                    <h5 className="font-semibold text-sm truncate">
                      {item.pizzaAssembly && item.pizzaAssembly.mode !== "inteira"
                        ? item.pizzaAssembly.flavors.map((f) => f.name).join(" / ")
                        : item.menuItem.name}
                    </h5>
                    {item.pizzaAssembly && item.pizzaAssembly.mode !== "inteira" && (
                      <p className="text-[10px] text-primary font-medium mt-0.5">
                        {item.pizzaAssembly.mode === "meia" ? "Pizza meia a meia" : "Pizza 3 sabores"}
                      </p>
                    )}
                    <p className="text-[11px] text-on-surface-variant font-medium mt-0.5">
                      Tamanho: <span className="text-primary">{item.selectedSize}</span> | Borda: {item.selectedBorder}
                    </p>
                    {item.extraIngredients.length > 0 && (
                      <p className="text-[10px] text-on-surface-variant/80 truncate mt-0.5">
                        Extras: {item.extraIngredients.join(", ")}
                      </p>
                    )}
                    
                    {/* Item action controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 bg-surface-container rounded-lg p-0.5">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-6 h-6 bg-surface-container-lowest hover:bg-primary-container hover:text-on-primary text-xs font-bold rounded flex items-center justify-center transition-colors cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-5 text-center text-xs font-semibold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 bg-surface-container-lowest hover:bg-primary-container hover:text-on-primary text-xs font-bold rounded flex items-center justify-center transition-colors cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-primary">
                          R$ {item.totalPrice.toFixed(2).replace(".", ",")}
                        </span>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer p-1"
                          title="Remover Item"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="space-y-6 pt-6 border-t border-surface-container" id="cart-form-fields">
              
              {/* Delivery method options */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface mb-3">
                  Método de Retirada
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod("Entrega")}
                    className={`py-2 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                      deliveryMethod === "Entrega"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-outline-variant hover:border-outline"
                    }`}
                  >
                    Entrega Em Domicílio
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod("Retirada")}
                    className={`py-2 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                      deliveryMethod === "Retirada"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-outline-variant hover:border-outline"
                    }`}
                  >
                    Buscar Na Pizzaria
                  </button>
                </div>
              </div>

              {/* Promo Coupon handler */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface mb-2">
                  Cupom de Desconto
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Ex: PIZZA10, FRETEGRATIS"
                    className="flex-grow px-3 py-2 border border-outline/30 rounded-xl bg-surface-container-lowest text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-primary text-on-primary hover:bg-surface-tint rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Aplicar
                  </button>
                </div>
                {couponError && <p className="text-red-700 text-xs mt-1 font-medium">{couponError}</p>}
                {couponSuccess && <p className="text-emerald-700 text-xs mt-1 font-medium">{couponSuccess}</p>}
                
                {/* Visual helper promo cue */}
                <p className="text-[10px] text-on-surface-variant/80 mt-1.5 font-sans italic">
                  Dica: Use <span className="font-bold text-primary">PIZZA10</span> para 10% de desconto no subtotal!
                </p>
              </div>

              {/* Checkout Form */}
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-wider border-b pb-1">
                  Dados de Entrega & Pagamento
                </h4>

                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1">Seu Nome</label>
                  <input
                    type="text"
                    required
                    placeholder="Seu nome completo"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-3 py-2 border border-outline/30 rounded-xl bg-surface-container-lowest text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1">Telefone WhatsApp</label>
                  <input
                    type="tel"
                    required
                    placeholder="(00) 00000-0000"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-outline/30 rounded-xl bg-surface-container-lowest text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {deliveryMethod === "Entrega" && (
                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant mb-1">Endereço Completo</label>
                    <textarea
                      required
                      placeholder="Rua, número, complemento e bairro"
                      value={userAddress}
                      onChange={(e) => setUserAddress(e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-outline/30 rounded-xl bg-surface-container-lowest text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1">Forma de Pagamento</label>
                  <select
                    value={paymentMethod}
                    onChange={(e: any) => setPaymentMethod(e.target.value)}
                    className="w-full px-3 py-2 border border-outline/30 rounded-xl bg-surface-container-lowest text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="Cartão de Crédito">Cartão de Crédito (na entrega)</option>
                    <option value="Cartão de Débito">Cartão de Débito (na entrega)</option>
                    <option value="Pix">Pix no site</option>
                    <option value="Dinheiro">Dinheiro</option>
                  </select>
                </div>

                {/* Pricing summary */}
                <div className="bg-surface-container rounded-2xl p-4 space-y-2 mt-4 font-sans text-sm">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Subtotal</span>
                    <span className="font-medium">R$ {subtotal.toFixed(2).replace(".", ",")}</span>
                  </div>
                  {deliveryMethod === "Entrega" && (
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Taxa de Entrega</span>
                      <span className="font-medium">R$ {deliveryFee.toFixed(2).replace(".", ",")}</span>
                    </div>
                  )}
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Descontos</span>
                      <span>- R$ {appliedDiscount.toFixed(2).replace(".", ",")}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-outline/25 pt-2 mt-2 font-bold text-base text-primary">
                    <span>Total Geral</span>
                    <span>R$ {total.toFixed(2).replace(".", ",")}</span>
                  </div>
                </div>

                {/* Place Order CTA button */}
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-surface-tint text-on-primary font-semibold py-3.5 px-6 rounded-xl cursor-pointer transition-colors shadow-floating text-center block mt-6"
                  id="btn-cart-submit-order"
                >
                  Finalizar Pedido • R$ {total.toFixed(2).replace(".", ",")}
                </button>
              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
