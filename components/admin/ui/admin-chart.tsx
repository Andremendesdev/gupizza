type AdminBarChartProps = {
  data: number[];
  label: string;
  color?: "primary" | "secondary";
  height?: number;
};

export function AdminBarChart({ data, label, color = "primary", height = 120 }: AdminBarChartProps) {
  const max = Math.max(...data, 1);
  const fill = color === "primary" ? "var(--color-primary)" : "var(--color-secondary-container)";

  return (
    <div className="w-full">
      <p className="text-xs font-semibold text-on-surface-variant mb-4">{label}</p>
      <div className="flex items-end gap-1.5 md:gap-2" style={{ height }}>
        {data.map((value, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1 min-w-0">
            <div
              className="w-full rounded-t-md transition-all duration-300 opacity-90 hover:opacity-100"
              style={{
                height: `${(value / max) * 100}%`,
                minHeight: 4,
                background: `linear-gradient(180deg, ${fill} 0%, color-mix(in srgb, ${fill} 65%, transparent) 100%)`,
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-[10px] text-on-surface-variant/70 font-medium">
        <span>Jan</span>
        <span>Jun</span>
        <span>Dez</span>
      </div>
    </div>
  );
}

type AdminLineChartProps = {
  data: number[];
  label: string;
  height?: number;
};

export function AdminLineChart({ data, label, height = 140 }: AdminLineChartProps) {
  const max = Math.max(...data, 1);
  const w = 100;
  const h = 40;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - (v / max) * h;
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = `0,${h} ${points} ${w},${h}`;

  return (
    <div className="w-full">
      <p className="text-xs font-semibold text-on-surface-variant mb-3">{label}</p>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }} preserveAspectRatio="none">
        <defs>
          <linearGradient id="adminLineFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b91c1c" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#b91c1c" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={areaPoints} fill="url(#adminLineFill)" />
        <polyline
          points={points}
          fill="none"
          stroke="#b91c1c"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
