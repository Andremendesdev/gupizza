import type { ReactNode } from "react";

type AdminGlassCardProps = {
  children: ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
};

const paddingMap = { sm: "p-4", md: "p-5 md:p-6", lg: "p-6 md:p-8" };

export function AdminGlassCard({ children, className = "", padding = "md" }: AdminGlassCardProps) {
  return (
    <div
      className={`admin-glass rounded-2xl border border-white/60 ${paddingMap[padding]} ${className}`}
    >
      {children}
    </div>
  );
}
