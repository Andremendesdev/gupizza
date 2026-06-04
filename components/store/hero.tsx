"use client";

import { motion, useScroll, useTransform } from "motion/react";

interface HeroProps {
  onOrderNowClick: () => void;
}

export function Hero({ onOrderNowClick }: HeroProps) {
  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 600], [0, -60]);
  const yBg = useTransform(scrollY, [0, 600], [0, 110]);
  const opacityBg = useTransform(scrollY, [0, 400], [1, 0.6]);

  return (
    <section className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background */}
      <motion.div style={{ y: yBg, opacity: opacityBg }} className="absolute inset-0 z-0">
        <img
          src="/fundo2.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          aria-hidden
        />
        {/* Camadas de overlay para profundidade */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-950/[0.97] via-green-900/82 to-green-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-green-950/70 via-green-900/20 to-transparent" />
        {/* Grain atmosférico */}
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />
        {/* Vinheta nas bordas */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,30,10,0.55)_100%)]" />
      </motion.div>

      <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* Conteúdo esquerdo */}
        <div className="flex flex-col items-start text-white">

          {/* Badge de status */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-2.5 px-4 py-2 mb-7 bg-white/10 border border-white/25 rounded-full backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-xs font-bold text-white uppercase tracking-widest font-sans">
              Entregando agora na sua região
            </span>
          </motion.div>

          {/* Título principal */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
            className="font-headline font-black mb-5 text-white tracking-tight leading-[1.05] text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl"
          >
            <span className="block text-primary text-neon-primary relative w-fit">
              Bigpizza
              <svg
                className="absolute -bottom-1.5 left-0 w-full opacity-50"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
              >
                <path d="M0,6 Q25,12 50,6 Q75,0 100,6" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              </svg>
            </span>
            <span className="block mt-2 text-balance text-white">
              <span className="text-neon-white">esfirraria do </span>
              <span className="text-primary text-neon-primary">Gu</span>
            </span>
          </motion.h1>

          {/* Parágrafo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: "easeOut" }}
            className="text-base md:text-lg mb-9 text-white/75 leading-relaxed font-sans max-w-md font-normal"
          >
            Pizzas feitas na hora, com ingredientes de qualidade e sabor que
            conquista na primeira mordida. Peça e receba quentinho.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto"
          >
            <motion.button
              type="button"
              onClick={onOrderNowClick}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="bg-primary text-white neon-red-button px-7 py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2.5 cursor-pointer font-sans w-full sm:w-auto"
            >
              <span
                className="material-symbols-outlined text-[22px] text-white"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                restaurant_menu
              </span>
              Pedir Agora
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.08)" }}
              whileTap={{ scale: 0.96 }}
              onClick={() => window.scrollBy({ top: 800, behavior: "smooth" })}
              className="flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-bold text-base cursor-pointer font-sans w-full sm:w-auto border border-white/30 text-white/90 bg-white/5 backdrop-blur-sm transition-colors"
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                storefront
              </span>
              Venha nos conhecer
            </motion.button>
          </motion.div>

          {/* Micro-copy de confiança */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            className="flex items-center gap-4 mt-6 text-white/45 text-xs font-sans"
          >
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-amber-400/70" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              Entrega em ~30 min
            </span>
            <span className="w-px h-3 bg-white/20" />
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-amber-400/70" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              Ingredientes frescos
            </span>
            <span className="w-px h-3 bg-white/20 hidden sm:block" />
            <span className="hidden sm:flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-amber-400/70" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              4.9 no app
            </span>
          </motion.div>
        </div>

        {/* Pizza flutuante */}
        <motion.div
          style={{ y: yImage }}
          initial={{ opacity: 0, scale: 0.82, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.15, type: "spring", bounce: 0.35 }}
          className="relative hidden md:flex justify-center items-center h-full pt-6 pb-6"
        >
          <div className="relative w-full max-w-[500px] lg:max-w-[540px] aspect-square flex items-center justify-center">

            {/* Glow duplo atrás da pizza */}
            <div className="absolute inset-[10%] bg-amber-400/18 rounded-full blur-[70px]" />
            <div className="absolute inset-[20%] bg-primary/20 rounded-full blur-[50px]" />

            {/* Pizza girando */}
            <motion.img
              animate={{ rotate: 360 }}
              transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop"
              alt="Pizza deliciosa"
              className="w-[88%] h-[88%] object-cover rounded-full z-10 relative bg-surface-container-lowest"
              style={{
                clipPath: "circle(50% at 50% 50%)",
                boxShadow: "0 0 0 10px rgba(255,255,255,0.08), 0 24px 80px -12px rgba(0,0,0,0.55), 0 0 60px -10px rgba(185,28,28,0.3)",
              }}
            />

            {/* Badge avaliação */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 lg:-left-8 top-20 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl z-20 flex items-center gap-3"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
            >
              <span
                className="material-symbols-outlined text-amber-400 text-[28px] shrink-0"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <div className="flex flex-col">
                <span className="font-black text-lg text-on-surface leading-none">4.9/5</span>
                <span className="text-[11px] text-on-surface-variant font-semibold mt-0.5">Avaliação App</span>
              </div>
            </motion.div>

            {/* Badge entrega */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="absolute -right-2 lg:-right-6 bottom-24 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl z-20 flex items-center gap-3"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
            >
              <div className="bg-primary/10 p-2 rounded-xl">
                <span className="material-symbols-outlined text-primary text-[24px]">local_shipping</span>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg text-on-surface leading-none">~30 min</span>
                <span className="text-[11px] text-on-surface-variant font-semibold mt-0.5">Entrega Média</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="material-symbols-outlined text-white/35 text-[28px]">keyboard_arrow_down</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
