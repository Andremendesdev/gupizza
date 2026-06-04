"use client";

import { motion, useScroll, useTransform } from "motion/react";

interface HeroProps {
  onOrderNowClick: () => void;
}

export function Hero({ onOrderNowClick }: HeroProps) {
  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 500], [0, -50]);
  const yBg = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden pt-20 pb-20 lg:pb-0">
      {/* Background image + overlay */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
        <img
          src="/fundo2.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 via-green-900/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-green-800/50 via-transparent to-transparent" />
      </motion.div>

      <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="flex flex-col items-start text-white mt-8 md:mt-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2.5 px-4 py-1.5 mb-8 bg-white/10 border border-white/20 rounded-full shadow-sm inline-flex backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="font-label-sm text-xs font-bold text-amber-400 uppercase tracking-wider">
              Entregando agora na sua região
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-headline font-black mb-6 text-white tracking-tight leading-[1.1] text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl max-w-full"
          >
            <span className="block text-red-700 relative w-fit">
              Bigpizza
              <svg className="absolute -bottom-2 left-0 w-full opacity-60" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,10 Q50,20 100,10" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
            <span className="block mt-1 lg:mt-2 text-balance text-white">
              esfirraria do <span className="text-red-700">Gu</span>
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl mb-24 text-white/60 leading-relaxed font-sans max-w-lg font-normal"
          >
            Peça agora e receba pizzas feitas na hora, com ingredientes de qualidade e sabor que conquista na primeira mordida.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto mt-4"
          >
            <motion.button 
              type="button"
              onClick={onOrderNowClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-amber-400 neon-red-button px-6 py-3.5 rounded-xl font-label-md text-base transition-all flex items-center justify-center gap-2.5 cursor-pointer border border-transparent font-sans font-bold w-full sm:w-auto"
            >
              <span className="material-symbols-outlined text-[24px] text-amber-400" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant_menu</span>
              Pedir Agora
            </motion.button>
            
            <motion.button 
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                // Tenta achar a seção ou só dar scroll um pouco pra baixo
                window.scrollBy({ top: 800, behavior: "smooth" });
              }}
              className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-amber-400 rounded-xl shadow-soft border border-transparent text-white font-sans font-bold text-base cursor-pointer hover:bg-amber-300 transition-all w-full sm:w-auto"
            >
              <span className="material-symbols-outlined text-[24px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>storefront</span>
              Venha nos conhecer
            </motion.button>
          </motion.div>
        </div>

        {/* Right Content - Floating Pizza */}
        <motion.div 
          style={{ y: yImage }}
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="relative hidden lg:flex justify-center items-center h-full pt-10"
        >
          {/* Main Pizza Image */}
          <div className="relative w-full max-w-[550px] aspect-square flex items-center justify-center">
            
            <div className="absolute inset-0 bg-secondary-container/20 rounded-full blur-[80px]"></div>

            <motion.img 
              animate={{ rotate: 360 }}
              transition={{ duration: 160, repeat: Infinity, ease: "linear" }}
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop" 
              alt="Pizza deliciosa" 
              className="w-[90%] h-[90%] object-cover rounded-full shadow-premium border-[12px] border-surface-container-lowest/90 drop-shadow-2xl z-10 relative bg-surface-container-lowest"
              style={{ clipPath: "circle(50% at 50% 50%)" }}
            />
            
            {/* Floating Badges */}
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-6 top-24 bg-surface-container-lowest/90 glass p-4 rounded-2xl shadow-premium z-20 flex items-center gap-3 border border-surface-variant/50"
            >
              <span className="material-symbols-outlined text-secondary-container text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-on-surface leading-none">4.9/5</span>
                <span className="text-xs text-on-surface-variant font-semibold">Avaliação App</span>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-4 bottom-28 bg-surface-container-lowest/90 glass p-4 rounded-2xl shadow-premium z-20 flex items-center gap-3 border border-surface-variant/50"
            >
              <div className="bg-primary/10 p-2.5 rounded-xl text-primary">
                <span className="material-symbols-outlined text-[28px]">local_shipping</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-on-surface leading-none">30 min</span>
                <span className="text-xs text-on-surface-variant font-semibold">Entrega Média</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
