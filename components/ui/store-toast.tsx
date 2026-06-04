"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

type StoreToastProps = {
  message: string | null;
  onDismiss: () => void;
};

export function StoreToast({ message, onDismiss }: StoreToastProps) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 flex items-center gap-2.5 rounded-2xl bg-inverse-surface text-inverse-on-surface px-5 py-3.5 shadow-floating pointer-events-none"
        >
          <span className="material-symbols-outlined text-primary text-[22px]">check_circle</span>
          <span className="font-semibold text-sm">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
