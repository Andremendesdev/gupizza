type AdminStatCardProps = {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  icon: string;
};

export function AdminStatCard({ label, value, delta, trend, icon }: AdminStatCardProps) {
  const trendPositive = trend === "up";
  return (
    <div className="admin-glass rounded-2xl border border-white/60 p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">{label}</span>
        <span className="material-symbols-outlined text-primary/80 text-[22px]">{icon}</span>
      </div>
      <p className="font-headline text-2xl md:text-3xl font-black text-on-surface tracking-tight">{value}</p>
      <span
        className={`text-xs font-bold w-fit px-2 py-0.5 rounded-full ${
          trendPositive ? "bg-emerald-500/10 text-emerald-700" : "bg-amber-500/10 text-amber-800"
        }`}
      >
        {delta}
      </span>
    </div>
  );
}
