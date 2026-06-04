"use client";

import { useState, useMemo } from "react";
import type { MenuItem } from "@/types";
import { motion, AnimatePresence } from "motion/react";

interface MenuSectionProps {
  menuItems: MenuItem[];
  onAddClick: (item: MenuItem) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  cartMenuIds?: string[];
}

export function MenuSection({
  menuItems,
  onAddClick,
  favorites,
  onToggleFavorite,
  cartMenuIds = [],
}: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<"Clássicas" | "Especiais" | "Doces" | "Bebidas">("Clássicas");
  const [searchQuery, setSearchQuery] = useState("");

  const categories: ("Clássicas" | "Especiais" | "Doces" | "Bebidas")[] = [
    "Clássicas",
    "Especiais",
    "Doces",
    "Bebidas",
  ];

  // Filtering based on search query and category pill
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchCategory = item.category === selectedCategory;
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [menuItems, selectedCategory, searchQuery]);

  return (
    <section className="py-16 md:py-24 bg-green-900" id="menu-section">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="font-headline-md text-headline-md text-white" id="menu-heading">
            Destaques do Menu
          </h2>
          <p className="text-sm text-green-100 font-sans mt-1">
            Escolha sua favorita e customize do seu jeito
          </p>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Buscar pizza, doces, bebidas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-outline/30 rounded-xl bg-surface-container-lowest text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-sans"
            id="menu-search-input"
          />
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[20px]">
            search
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-2.5 text-on-surface-variant hover:text-primary"
              id="clear-search"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex gap-4 overflow-x-auto pb-4 mb-8 scrollbar-hide" id="category-selector">
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => {
                setSelectedCategory(category);
                // We keep some items even on empty search
              }}
              className={`px-6 py-2.5 rounded-full font-label-md text-label-md whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-primary text-on-primary shadow-md font-bold"
                  : "bg-surface-container text-on-surface hover:bg-surface-variant"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter" id="pizza-grid">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => {
            const isFav = favorites.includes(item.id);
            return (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="bg-surface-container-lowest rounded-[32px] overflow-hidden shadow-soft hover:shadow-premium flex flex-col group border border-surface-variant/30 transition-all"
              >
                {/* Pizza Image container */}
                <div className="relative h-64 overflow-hidden bg-surface-container/50 m-2 rounded-[24px]">
                  <img
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    src={item.image}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  
                  {/* Rating Tag */}
                  {item.rating && (
                    <div className="absolute top-3 left-3 bg-surface-container-lowest/90 glass text-on-surface px-3 py-1.5 rounded-xl font-bold text-xs shadow-sm flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-secondary-container-dim" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>{" "}
                      {item.rating.toFixed(1)}
                    </div>
                  )}

                  {/* Favorite Toggle Button */}
                  <button
                    type="button"
                    onClick={() => onToggleFavorite(item.id)}
                    className="absolute top-3 right-3 bg-surface-container-lowest/90 glass text-on-surface p-2 rounded-xl shadow-sm cursor-pointer hover:bg-surface-container-lowest transition-all hover:scale-110 active:scale-95"
                    title={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                  >
                    <span 
                      className="material-symbols-outlined text-[20px]"
                      style={{ 
                        fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0",
                        color: isFav ? "#b91c1c" : "inherit"
                      }}
                    >
                      {isFav ? "favorite" : "favorite_border"}
                    </span>
                  </button>
                </div>

                {/* Card Content area */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-headline-sm text-xl font-bold text-on-surface group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-sm text-on-surface-variant mb-6 flex-grow font-sans leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-surface-container-low">
                    <span className="font-headline-md text-2xl font-black text-on-surface">
                      R$ {item.price.toFixed(2).replace(".", ",")}
                    </span>

                    {/* Quick Add Button opens customization modal */}
                    <button
                      type="button"
                      onClick={() => onAddClick(item)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                        cartMenuIds.includes(item.id)
                          ? "bg-primary text-on-primary"
                          : "bg-primary/10 text-primary shadow-sm group-hover:bg-primary group-hover:text-on-primary"
                      }`}
                      title="Adicionar / Customizar Pizza"
                    >
                      <span className="material-symbols-outlined">
                        {cartMenuIds.includes(item.id) ? "shopping_cart" : "add"}
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* EXACT SKELETON CARD (Visible for Category symmetry layout matching 100% igual mockup) */}
          {filteredItems.length < 3 && (
            <div 
              className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-soft flex flex-col group border border-surface-variant"
              id="pizza-skeleton-placeholder"
            >
              {/* Image box placeholder */}
              <div className="relative h-64 overflow-hidden bg-surface-variant flex items-center justify-center">
                <span className="material-symbols-outlined text-display-lg text-tertiary-fixed-dim">
                  local_pizza
                </span>
              </div>
              
              {/* Content box placeholder with glowing pulse effects */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="h-6 bg-surface-variant rounded w-3/4 mb-4 animate-pulse"></div>
                <div className="h-4 bg-surface-variant rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-surface-variant rounded w-5/6 mb-6 animate-pulse"></div>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-surface-container-low">
                  <div className="h-8 bg-surface-variant rounded w-1/3 animate-pulse"></div>
                  <div className="w-12 h-12 bg-surface-variant rounded-xl animate-pulse"></div>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* Empty Search State */}
        {filteredItems.length === 0 && (
          <div className="col-span-full py-12 text-center bg-surface-container-low rounded-2xl" id="empty-search-alert">
            <span className="material-symbols-outlined text-primary text-[48px] mb-2">
              sentiment_dissatisfied
            </span>
            <p className="text-on-surface font-semibold font-sans">Nenhuma pizza encontrada para sua busca.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Clássicas");
              }}
              className="mt-4 text-xs font-semibold text-primary underline"
              id="btn-all-pizzas-reset"
            >
              Ver todas as pizzas clássicas
            </button>
          </div>
        )}
      </div>

      </div>
    </section>
  );
}
