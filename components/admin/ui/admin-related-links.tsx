import Link from "next/link";
import { ADMIN_NAV_BY_HREF, ADMIN_RELATED } from "@/lib/admin/navigation";

type AdminRelatedLinksProps = {
  currentPath: string;
};

export function AdminRelatedLinks({ currentPath }: AdminRelatedLinksProps) {
  const related = ADMIN_RELATED[currentPath] ?? [];
  if (related.length === 0) return null;

  return (
    <div className="admin-glass rounded-2xl border border-white/60 p-5 mt-8">
      <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-3">
        Telas conectadas
      </p>
      <div className="flex flex-wrap gap-2">
        {related.map((href) => {
          const item = ADMIN_NAV_BY_HREF[href];
          if (!item) return null;
          return (
            <Link
              key={href}
              href={href}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-container-low/80 border border-outline-variant/40 text-sm font-semibold text-on-surface hover:border-primary/40 hover:bg-primary/5 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">{item.icon}</span>
              {item.label}
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant">arrow_forward</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
