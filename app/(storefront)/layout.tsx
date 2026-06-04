import { getReviews } from "@/lib/data/reviews";
import { StorefrontShell } from "@/components/layout/storefront-shell";

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  const initialReviews = getReviews();

  return <StorefrontShell initialReviews={initialReviews}>{children}</StorefrontShell>;
}
