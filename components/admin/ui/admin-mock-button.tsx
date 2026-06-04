import type { ReactNode } from "react";

type AdminMockButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: string;
  className?: string;
};

export function AdminMockButton({
  children,
  variant = "primary",
  icon,
  className = "",
}: AdminMockButtonProps) {
  const variants = {
    primary: "bg-primary text-on-primary shadow-glow hover:opacity-95",
    secondary: "bg-secondary-container text-on-secondary-container hover:opacity-95",
    ghost: "bg-white/50 border border-outline-variant/50 text-on-surface hover:bg-white/80",
  };

  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-default ${variants[variant]} ${className}`}
    >
      {icon && (
        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>
          {icon}
        </span>
      )}
      {children}
    </button>
  );
}
