"use client";

import { useState, useEffect, useMemo } from "react";
import { menuItems } from "@/lib/data/menu";
import type { MenuItem, CartItem, PizzaAssemblyMode, PizzaFlavorSelection } from "@/types";

interface CustomizeModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

const PIZZA_CATEGORIES = new Set<MenuItem["category"]>(["Clássicas", "Especiais", "Doces"]);
const DEFAULT_SIZE = "Grande" as const;

function toFlavorSelection(item: MenuItem): PizzaFlavorSelection {
  return { id: item.id, name: item.name, image: item.image, price: item.price };
}

function getAssemblyBasePrice(mode: PizzaAssemblyMode, flavors: (PizzaFlavorSelection | null)[], fallback: number) {
  const selected = flavors.filter(Boolean) as PizzaFlavorSelection[];
  if (mode === "inteira" || selected.length === 0) return fallback;
  return Math.max(...selected.map((f) => f.price));
}

function formatAssemblyLabel(assembly: CartItem["pizzaAssembly"]) {
  if (!assembly || assembly.mode === "inteira") return null;
  const names = assembly.flavors.map((f) => f.name.replace(/ Especial| Premium| Gourmet| D'Oro/g, "")).join(" / ");
  return assembly.mode === "meia" ? `Meia ${names}` : `3 sabores: ${names}`;
}

type PizzaVisualProps = {
  mode: PizzaAssemblyMode;
  flavors: (PizzaFlavorSelection | null)[];
  onSlotClick: (index: number) => void;
  onAddThird: () => void;
};

function PizzaVisual({ mode, flavors, onSlotClick, onAddThird }: PizzaVisualProps) {
  const size = 220;
  const center = size / 2;
  const radius = size / 2 - 4;

  const renderSliceImage = (index: number, clipId: string) => {
    const flavor = flavors[index];
    return (
      <g clipPath={`url(#${clipId})`}>
        {flavor ? (
          <image href={flavor.image} x={0} y={0} width={size} height={size} preserveAspectRatio="xMidYMid slice" />
        ) : (
          <>
            <rect x={0} y={0} width={size} height={size} fill="#e8e8e8" />
            <text x={center} y={center} textAnchor="middle" dominantBaseline="middle" fill="#916e6d" fontSize="12">
              +
            </text>
          </>
        )}
      </g>
    );
  };

  return (
    <div className="relative mx-auto w-[220px]">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto drop-shadow-premium">
        <defs>
          <clipPath id="half-left">
            <path d={`M ${center} ${center} L ${center} 4 A ${radius} ${radius} 0 0 0 ${center} ${size - 4} Z`} />
          </clipPath>
          <clipPath id="half-right">
            <path d={`M ${center} ${center} L ${center} 4 A ${radius} ${radius} 0 0 1 ${center} ${size - 4} Z`} />
          </clipPath>
          <clipPath id="slice-0">
            <path d={`M ${center} ${center} L ${center} 4 A ${radius} ${radius} 0 0 1 ${center + radius * 0.866} ${center + radius * 0.5} Z`} />
          </clipPath>
          <clipPath id="slice-1">
            <path
              d={`M ${center} ${center} L ${center + radius * 0.866} ${center + radius * 0.5} A ${radius} ${radius} 0 0 1 ${center - radius * 0.866} ${center + radius * 0.5} Z`}
            />
          </clipPath>
          <clipPath id="slice-2">
            <path d={`M ${center} ${center} L ${center - radius * 0.866} ${center + radius * 0.5} A ${radius} ${radius} 0 0 1 ${center} 4 Z`} />
          </clipPath>
        </defs>

        <circle cx={center} cy={center} r={radius} fill="#f3f3f3" stroke="#fff" strokeWidth="4" />

        {mode === "inteira" && flavors[0] && (
          <image href={flavors[0].image} x={0} y={0} width={size} height={size} clipPath="circle(50% at 50% 50%)" preserveAspectRatio="xMidYMid slice" />
        )}

        {mode === "meia" && (
          <>
            {renderSliceImage(0, "half-left")}
            {renderSliceImage(1, "half-right")}
            <line x1={center} y1={4} x2={center} y2={size - 4} stroke="#fff" strokeWidth="3" />
          </>
        )}

        {mode === "tres" && (
          <>
            {renderSliceImage(0, "slice-0")}
            {renderSliceImage(1, "slice-1")}
            {renderSliceImage(2, "slice-2")}
            <line x1={center} y1={4} x2={center} y2={size - 4} stroke="#fff" strokeWidth="2" />
            <line x1={center} y1={center} x2={center + radius * 0.866} y2={center + radius * 0.5} stroke="#fff" strokeWidth="2" />
            <line x1={center} y1={center} x2={center - radius * 0.866} y2={center + radius * 0.5} stroke="#fff" strokeWidth="2" />
          </>
        )}
      </svg>

      {/* Áreas clicáveis sobre cada fatia */}
      {mode === "meia" && (
        <>
          <button
            type="button"
            onClick={() => onSlotClick(0)}
            className="absolute top-0 left-0 w-1/2 h-full rounded-l-full cursor-pointer"
            aria-label="Editar primeira metade"
          />
          <button
            type="button"
            onClick={() => onSlotClick(1)}
            className="absolute top-0 right-0 w-1/2 h-full rounded-r-full cursor-pointer"
            aria-label="Escolher segunda metade"
          />
          <button
            type="button"
            onClick={onAddThird}
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-10 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-floating cursor-pointer hover:bg-surface-tint transition-colors"
            title="Adicionar 3º sabor"
          >
            <span className="material-symbols-outlined text-[22px]">add</span>
          </button>
        </>
      )}

      {mode === "tres" &&
        [0, 1, 2].map((index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSlotClick(index)}
            className="absolute inset-0 cursor-pointer"
            style={{
              clipPath:
                index === 0
                  ? "polygon(50% 50%, 50% 0%, 100% 25%, 50% 50%)"
                  : index === 1
                    ? "polygon(50% 50%, 100% 25%, 0% 75%, 50% 50%)"
                    : "polygon(50% 50%, 0% 75%, 50% 0%, 50% 50%)",
            }}
            aria-label={`Escolher sabor ${index + 1}`}
          />
        ))}

      {mode === "inteira" && (
        <button
          type="button"
          onClick={() => onSlotClick(0)}
          className="absolute inset-0 rounded-full cursor-pointer"
          aria-label="Sabor da pizza inteira"
        />
      )}
    </div>
  );
}

export function CustomizeModal({ item, onClose, onAddToCart }: CustomizeModalProps) {
  const [border, setBorder] = useState<"Sem Borda" | "Borda de Catupiry" | "Borda de Chocolate" | "Borda de Cheddar">("Sem Borda");
  const [extras, setExtras] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [assemblyMode, setAssemblyMode] = useState<PizzaAssemblyMode>("inteira");
  const [flavorSlots, setFlavorSlots] = useState<(PizzaFlavorSelection | null)[]>([null]);
  const [pickingSlot, setPickingSlot] = useState<number | null>(null);

  const isPizzaItem = item ? PIZZA_CATEGORIES.has(item.category) : false;
  const pizzaOptions = useMemo(
    () => menuItems.filter((m) => PIZZA_CATEGORIES.has(m.category)),
    [],
  );

  useEffect(() => {
    if (item) {
      setBorder("Sem Borda");
      setExtras([]);
      setQuantity(1);
      setPickingSlot(null);
      if (PIZZA_CATEGORIES.has(item.category)) {
        setAssemblyMode("meia");
        setFlavorSlots([toFlavorSelection(item), null]);
      } else {
        setAssemblyMode("inteira");
        setFlavorSlots([toFlavorSelection(item)]);
      }
    }
  }, [item]);

  useEffect(() => {
    if (!item) return;

    let total = getAssemblyBasePrice(assemblyMode, flavorSlots, item.price);

    if (border === "Borda de Catupiry") total += 8.0;
    else if (border === "Borda de Cheddar") total += 9.0;
    else if (border === "Borda de Chocolate") total += 10.0;

    extras.forEach((extra) => {
      if (extra === "Queijo Extra") total += 6.0;
      if (extra === "Bacon Crocante") total += 7.0;
      if (extra === "Tomate Seco") total += 5.0;
      if (extra === "Azeitonas Extras") total += 3.0;
      if (extra === "Orégano Especial") total += 1.5;
    });

    setCalculatedPrice(total * quantity);
  }, [item, border, extras, quantity, assemblyMode, flavorSlots]);

  if (!item) return null;

  const requiredSlots = assemblyMode === "inteira" ? 1 : assemblyMode === "meia" ? 2 : 3;
  const selectedFlavors = flavorSlots.filter(Boolean) as PizzaFlavorSelection[];
  const assemblyComplete = selectedFlavors.length >= requiredSlots;

  const handleModeChange = (mode: PizzaAssemblyMode) => {
    setAssemblyMode(mode);
    setPickingSlot(null);
    if (mode === "inteira") {
      setFlavorSlots([flavorSlots[0] ?? toFlavorSelection(item)]);
    } else if (mode === "meia") {
      setFlavorSlots([flavorSlots[0] ?? toFlavorSelection(item), flavorSlots[1] ?? null]);
    } else {
      setFlavorSlots([
        flavorSlots[0] ?? toFlavorSelection(item),
        flavorSlots[1] ?? null,
        flavorSlots[2] ?? null,
      ]);
    }
  };

  const handleSelectFlavor = (option: MenuItem) => {
    if (pickingSlot === null) return;
    const next = [...flavorSlots];
    next[pickingSlot] = toFlavorSelection(option);
    setFlavorSlots(next);
    setPickingSlot(null);
  };

  const handleExtraToggle = (topping: string) => {
    setExtras((prev) =>
      prev.includes(topping) ? prev.filter((e) => e !== topping) : [...prev, topping],
    );
  };

  const handleConfirm = () => {
    if (isPizzaItem && !assemblyComplete) {
      alert(`Escolha ${requiredSlots === 2 ? "as duas metades" : "os 3 sabores"} antes de adicionar.`);
      return;
    }

    const assemblyFlavors = (flavorSlots.filter(Boolean) as PizzaFlavorSelection[]).slice(0, requiredSlots);
    const pizzaAssembly = isPizzaItem
      ? { mode: assemblyMode, flavors: assemblyFlavors }
      : undefined;

    const cartItem: CartItem = {
      id: `${item.id}-${assemblyMode}-${assemblyFlavors.map((f) => f.id).join("-")}-${border}-${extras.sort().join("-")}-${Date.now()}`,
      menuItem: item,
      quantity,
      selectedSize: DEFAULT_SIZE,
      selectedBorder: border,
      extraIngredients: extras,
      totalPrice: calculatedPrice,
      pizzaAssembly,
    };
    onAddToCart(cartItem);
    onClose();
  };

  const previewImage =
    assemblyMode === "inteira" && flavorSlots[0]
      ? flavorSlots[0].image
      : item.image;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" id="custom-modal-overlay">
      <div
        className="relative bg-surface-container-lowest w-full max-w-2xl rounded-3xl overflow-hidden shadow-floating flex flex-col max-h-[90vh] animate-scale-up"
        id="custom-modal-content"
      >
        <div className="relative h-16 md:h-20 bg-surface-container overflow-hidden shrink-0">
          <img src={previewImage} alt={item.name} className="w-full h-full object-cover object-center" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <button
            type="button"
            onClick={onClose}
            className="absolute top-2 right-2 bg-black/40 hover:bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors"
            title="Fechar"
            id="btn-close-modal"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>

          <div className="absolute bottom-2 left-4 right-12 text-white">
            <span className="px-2 py-0.5 bg-primary text-on-primary font-label-sm text-[10px] rounded-full uppercase tracking-wider">
              {item.category}
            </span>
            <h3 className="font-headline text-sm md:text-base font-bold text-white mt-1 drop-shadow-sm truncate">
              {isPizzaItem && assemblyMode !== "inteira" && selectedFlavors.length > 0
                ? formatAssemblyLabel({ mode: assemblyMode, flavors: selectedFlavors }) ?? item.name
                : item.name}
            </h3>
          </div>
        </div>

        <div className="p-6 overflow-y-auto flex-grow space-y-6 text-on-surface font-sans" id="custom-modal-body">
          <p className="text-sm text-on-surface-variant italic leading-relaxed">{item.description}</p>

          {isPizzaItem && (
            <div className="space-y-4">
              <h4 className="font-semibold text-sm uppercase tracking-wide text-on-surface border-b pb-2">
                Montagem da Pizza
              </h4>

              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { mode: "inteira" as const, label: "Pizza Inteira" },
                    { mode: "meia" as const, label: "Meia a Meia" },
                    { mode: "tres" as const, label: "3 Sabores" },
                  ] as const
                ).map(({ mode, label }) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => handleModeChange(mode)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      assemblyMode === mode
                        ? "bg-primary text-on-primary shadow-sm"
                        : "bg-surface-container text-on-surface hover:bg-surface-variant"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <PizzaVisual
                mode={assemblyMode}
                flavors={flavorSlots}
                onSlotClick={(index) => setPickingSlot(index)}
                onAddThird={() => handleModeChange("tres")}
              />

              <div className="flex flex-wrap justify-center gap-2 text-center">
                {Array.from({ length: requiredSlots }).map((_, index) => {
                  const flavor = flavorSlots[index];
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setPickingSlot(index)}
                      className={`min-w-[100px] px-3 py-2 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                        pickingSlot === index
                          ? "border-primary bg-primary/5 text-primary ring-1 ring-primary"
                          : "border-outline-variant hover:border-outline bg-surface-container-lowest"
                      }`}
                    >
                      {flavor ? (
                        <span className="line-clamp-2">{flavor.name}</span>
                      ) : (
                        <span className="flex items-center justify-center gap-1 text-on-surface-variant">
                          <span className="material-symbols-outlined text-[16px]">add</span>
                          {assemblyMode === "inteira" ? "Sabor" : index === 0 ? "1ª metade" : index === 1 ? "2ª metade" : "3º sabor"}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {pickingSlot !== null && (
                <div className="rounded-2xl border border-outline-variant/50 bg-surface-container-low p-4 space-y-3 animate-scale-up">
                  <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                    Escolha o sabor {pickingSlot === 0 ? "da 1ª parte" : pickingSlot === 1 ? "da 2ª parte" : "do 3º pedaço"}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                    {pizzaOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => handleSelectFlavor(option)}
                        className="flex items-center gap-2 p-2 rounded-xl border border-outline-variant/40 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer text-left"
                      >
                        <img
                          src={option.image}
                          alt={option.name}
                          className="w-10 h-10 rounded-lg object-cover shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-[11px] font-semibold line-clamp-2 leading-tight">{option.name}</span>
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setPickingSlot(null)}
                    className="text-xs text-on-surface-variant hover:text-primary cursor-pointer"
                  >
                    Cancelar seleção
                  </button>
                </div>
              )}
            </div>
          )}

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wide text-on-surface border-b pb-2 mb-3">
              {isPizzaItem ? "1." : "1."} Borda Recheada
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Sem Borda", value: "Sem Borda" as const, price: "Grátis" },
                { label: "Catupiry", value: "Borda de Catupiry" as const, price: "+ R$ 8,00" },
                { label: "Cheddar", value: "Borda de Cheddar" as const, price: "+ R$ 9,00" },
                { label: "Chocolate", value: "Borda de Chocolate" as const, price: "+ R$ 10,00" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setBorder(opt.value)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col justify-center items-center ${
                    border === opt.value
                      ? "border-primary bg-primary/5 text-primary ring-1 ring-primary"
                      : "border-outline-variant hover:border-outline bg-surface-container-lowest"
                  }`}
                >
                  <span className="font-semibold text-xs truncate max-w-full">{opt.label}</span>
                  <span className="text-[10px] text-on-surface-variant mt-0.5">{opt.price}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wide text-on-surface border-b pb-2 mb-3">
              {isPizzaItem ? "2." : "2."} Adicionar Ingredientes Extras
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { label: "Queijo Extra (+ R$ 6,00)", value: "Queijo Extra" },
                { label: "Bacon Crocante (+ R$ 7,00)", value: "Bacon Crocante" },
                { label: "Tomate Seco (+ R$ 5,00)", value: "Tomate Seco" },
                { label: "Azeitonas Extras (+ R$ 3,00)", value: "Azeitonas Extras" },
                { label: "Orégano Especial (+ R$ 1,50)", value: "Orégano Especial" },
              ].map((opt) => {
                const isSelected = extras.includes(opt.value);
                return (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                      isSelected
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-outline-variant hover:border-outline"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleExtraToggle(opt.value)}
                      className="rounded border-outline text-primary focus:ring-primary h-4 w-4"
                    />
                    <span className="text-sm font-medium">{opt.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-surface-container-low">
            <span className="font-semibold text-sm">Quantidade</span>
            <div className="flex items-center gap-3 bg-surface-container p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-9 h-9 bg-surface-container-lowest hover:bg-primary-container hover:text-on-primary-container text-on-surface rounded-lg font-bold flex items-center justify-center transition-colors cursor-pointer"
              >
                -
              </button>
              <span className="w-8 text-center font-bold text-sm">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-9 h-9 bg-surface-container-lowest hover:bg-primary-container hover:text-on-primary-container text-on-surface rounded-lg font-bold flex items-center justify-center transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 bg-surface-container-low border-t border-surface-container flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="text-center sm:text-left">
            <span className="text-xs text-on-surface-variant block uppercase font-mono">Preço Total Estimado</span>
            <span className="font-headline-md text-headline-md text-primary">
              R$ {calculatedPrice.toFixed(2).replace(".", ",")}
            </span>
            {isPizzaItem && assemblyMode !== "inteira" && (
              <span className="text-[10px] text-on-surface-variant block mt-0.5">
                Cobrança pelo sabor de maior valor
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isPizzaItem && !assemblyComplete}
            className="w-full sm:w-auto bg-primary text-on-primary hover:bg-surface-tint disabled:opacity-50 disabled:cursor-not-allowed font-semibold font-label-md text-label-md px-8 py-3.5 rounded-xl cursor-pointer transition-colors shadow-floating flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">shopping_cart</span>
            Adicionar à Sacola
          </button>
        </div>
      </div>
    </div>
  );
}
