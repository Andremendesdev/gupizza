"use client";

import Link from "next/link";
import type { Order } from "@/types";

interface OrderTrackerProps {
  orders: Order[];
  onAdvanceStatus: (orderId: string) => void;
  onClearOrders: () => void;
}

export function OrderTracker({
  orders,
  onAdvanceStatus,
  onClearOrders,
}: OrderTrackerProps) {
  
  if (orders.length === 0) {
    return (
      <div className="py-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center font-sans mt-12 bg-surface-container-low rounded-3xl" id="order-empty-container">
        <span className="material-symbols-outlined text-[72px] text-primary mb-4 animate-pulse">
          receipt_long
        </span>
        <h3 className="font-headline-sm text-headline-sm mb-2 text-on-surface">Nenhum Pedido Ativo</h3>
        <p className="text-on-surface-variant text-sm max-w-md mx-auto mb-8 leading-relaxed">
          Você ainda não realizou nenhum pedido hoje. Navegue pelos destaques do nosso cardápio de pizzas napolitanas para fazer sua primeira escolha!
        </p>
        <Link
          href="/"
          className="bg-primary text-on-primary font-semibold font-label-md text-label-md px-8 py-3.5 rounded-xl cursor-pointer hover:bg-surface-tint transition-colors shadow-floating inline-flex items-center gap-2"
          id="btn-empty-orders-menu"
        >
          <span className="material-symbols-outlined text-[18px]">local_pizza</span>
          Ver Cardápio Completo
        </Link>
      </div>
    );
  }

  // Get most recent order on top
  const activeOrder = orders[orders.length - 1];

  const steps = [
    { label: "Pendente", desc: "Pedido Recebido", status: "Pendente", icon: "schedule" },
    { label: "Preparando", desc: "Montando Ingredientes", status: "Preparando", icon: "restaurant" },
    { label: "No Forno", desc: "Forno a Lenha 420°C", status: "No Forno", icon: "local_fire_department" },
    { label: "Em Rota", desc: "Saiu com Entregador", status: "Em Rota de Entrega", icon: "delivery_dining" },
    { label: "Entregue", desc: "Bom apetite!", status: "Entregue", icon: "check_circle" },
  ];

  // Helper helper to color status steps
  const getStepIndex = (status: string) => {
    if (status === "Pendente") return 0;
    if (status === "Preparando") return 1;
    if (status === "No Forno") return 2;
    if (status === "Em Rota de Entrega") return 3;
    if (status === "Entregue") return 4;
    return -1;
  };

  const currentIndex = getStepIndex(activeOrder.status);

  return (
    <div className="py-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto space-y-10 mt-12" id="order-tracker-section">
      
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-surface-container pb-6 gap-4">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface"> Acompanhe Seu Pedido</h2>
          <p className="text-sm text-on-surface-variant font-sans mt-1">
            Status em tempo real da sua pizza artesanal
          </p>
        </div>

        {/* Clear/Reset buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClearOrders}
            className="px-4 py-2 border border-outline/30 rounded-xl text-xs hover:bg-surface-container transition-colors cursor-pointer text-on-surface font-sans"
            id="btn-clear-history"
          >
            Limpar Histórico
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Tracking Timeline Column */}
        <div className="col-span-1 lg:col-span-2 bg-surface-container-lowest rounded-3xl p-6 md:p-8 border border-surface-variant/40 shadow-soft space-y-8">
          
          {/* Main info header */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-surface-container-low p-4 rounded-2xl text-sm font-sans">
            <div>
              <span className="text-xs text-on-surface-variant font-mono">ID DO PEDIDO</span>
              <p className="font-bold text-primary font-mono text-base">{activeOrder.id}</p>
            </div>
            <div>
              <span className="text-xs text-on-surface-variant">HORÁRIO</span>
              <p className="font-bold">{activeOrder.createdAt}</p>
            </div>
            <div>
              <span className="text-xs text-on-surface-variant">PAGAMENTO</span>
              <p className="font-bold">{activeOrder.paymentMethod}</p>
            </div>
            <div>
              <span className="text-xs text-on-surface-variant">STATUS ATUAL</span>
              <span className="ml-1 px-2.5 py-0.5 bg-primary/10 text-primary font-bold rounded-full text-xs">
                {activeOrder.status}
              </span>
            </div>
          </div>

          {/* Graphical timeline */}
          <div className="relative pt-4 pb-4">
            
            {/* Center connector visual bar */}
            <div className="absolute left-[26px] md:left-auto md:top-[38px] md:left-8 md:right-8 h-[75%] md:h-1 bg-surface-container w-1 md:w-auto -z-10 rounded" />

            {/* Filled connector path depending on current status index */}
            <div 
              className="absolute left-[26px] md:left-auto md:top-[38px] md:left-8 h-1 bg-primary -z-10 rounded hidden md:block transition-all duration-500" 
              style={{ width: `${(currentIndex / 4) * 82}%` }}
            />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4 font-sans">
              {steps.map((step, idx) => {
                const isCompleted = idx <= currentIndex;
                const isActive = idx === currentIndex;
                
                return (
                  <div key={idx} className="flex md:flex-col items-center gap-4 md:gap-2 text-left md:text-center flex-grow group">
                    
                    {/* Circle icon marker */}
                    <div 
                      className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        isActive 
                          ? "bg-primary text-on-primary border-primary scale-110 ring-4 ring-primary/20"
                          : isCompleted
                            ? "bg-primary-container text-on-primary-container border-primary"
                            : "bg-surface-container-lowest text-on-surface-variant border-surface-container"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[24px]">
                        {step.icon}
                      </span>
                    </div>

                    {/* Step tag titles */}
                    <div className="flex flex-col md:items-center">
                      <span className={`text-sm font-bold ${isCompleted ? "text-on-surface" : "text-on-surface-variant"}`}>
                        {step.label}
                      </span>
                      <span className="text-[11px] text-on-surface-variant/80 mt-0.5 max-w-[120px] font-medium leading-tight">
                        {step.desc}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

          {/* Interactive Simulation Panel */}
          {activeOrder.status !== "Entregue" ? (
            <div className="bg-primary/5 p-5 rounded-2xl border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-4 font-sans">
              <div className="text-center md:text-left">
                <p className="font-bold text-sm text-primary flex items-center justify-center md:justify-start gap-1">
                  <span className="material-symbols-outlined text-[18px]">bolt</span>
                  Simulador de Entrega Ativo
                </p>
                <p className="text-xs text-on-surface-variant/90 mt-1 max-w-md">
                  Quer ver como sua pizza avança no forno e ruma até sua casa? Use o botão ao lado para avançar o andamento da simulação!
                </p>
              </div>

              <button
                type="button"
                onClick={() => onAdvanceStatus(activeOrder.id)}
                className="bg-primary text-on-primary font-semibold text-xs py-3 px-5 rounded-xl cursor-pointer hover:bg-surface-tint transition-colors flex items-center gap-1.5 shadow-sm active:scale-95"
                id="btn-simulate-status"
              >
                Avançar Status <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          ) : (
            <div className="bg-emerald-500/10 p-5 rounded-2xl border border-emerald-500/20 text-center font-sans">
              <p className="font-bold text-sm text-emerald-800 flex items-center justify-center gap-1">
                <span className="material-symbols-outlined">celebration</span>
                Sua pizza foi entregue!
              </p>
              <p className="text-xs text-on-surface-variant/90 mt-1 max-w-md mx-auto">
                Esperamos que você ame a verdadeira experiência Pizzeria Moderno. Não se esqueça de deixar sua avaliação.
              </p>
              <Link
                href="/"
                className="mt-4 inline-block bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Pedir Novamente
              </Link>
            </div>
          )}

        </div>

        {/* Order Details Column */}
        <div className="col-span-1 bg-surface-container-lowest rounded-3xl p-6 border border-surface-variant/40 shadow-soft space-y-6 font-sans">
          <h4 className="font-bold text-sm uppercase tracking-wider border-b pb-2">
            Resumo do Pedido
          </h4>

          {/* Itemized list display */}
          <div className="divide-y divide-surface-container-low space-y-3">
            {activeOrder.items.map((item) => (
              <div key={item.id} className="pt-3 flex justify-between items-start text-sm">
                <div>
                  <p className="font-bold">
                    {item.quantity}x {item.menuItem.name}
                  </p>
                  <p className="text-[11px] text-on-surface-variant">
                    {item.selectedSize} | {item.selectedBorder}
                  </p>
                  {item.extraIngredients.length > 0 && (
                    <p className="text-[10px] text-on-surface-variant/70">
                      Extras: {item.extraIngredients.join(", ")}
                    </p>
                  )}
                </div>
                <span className="font-semibold text-xs">
                  R$ {item.totalPrice.toFixed(2).replace(".", ",")}
                </span>
              </div>
            ))}
          </div>

          {/* Delivery location info */}
          <div className="pt-4 border-t border-surface-container-low text-xs space-y-1.5">
            <span className="block font-semibold uppercase tracking-wider text-on-surface-variant">Local de Entrega</span>
            <div className="flex items-start gap-1 pb-1">
              <span className="material-symbols-outlined text-primary text-[16px] mt-0.5">location_on</span>
              <p className="text-on-surface font-medium leading-relaxed">
                {activeOrder.userAddress}
              </p>
            </div>
            
            <div className="pt-2">
              <span className="block font-semibold uppercase tracking-wider text-on-surface-variant">Destinatário</span>
              <p className="text-on-surface font-semibold">{activeOrder.userName}</p>
              <p className="text-on-surface-variant">{activeOrder.userPhone}</p>
            </div>
          </div>

          {/* Subtotal table calculation */}
          <div className="pt-4 border-t border-surface-container-low text-xs space-y-2 bg-surface-container-low/50 p-4 rounded-2xl">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>R$ {activeOrder.subtotal.toFixed(2).replace(".", ",")}</span>
            </div>
            {activeOrder.deliveryFee > 0 && (
              <div className="flex justify-between">
                <span>Taxa de Entrega</span>
                <span>R$ {activeOrder.deliveryFee.toFixed(2).replace(".", ",")}</span>
              </div>
            )}
            {activeOrder.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Cupons</span>
                <span>- R$ {activeOrder.discount.toFixed(2).replace(".", ",")}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-sm text-primary pt-2 border-t border-outline/10">
              <span>Valor Pago</span>
              <span>R$ {activeOrder.total.toFixed(2).replace(".", ",")}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
