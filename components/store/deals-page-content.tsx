"use client";

import type { MenuItem } from "@/types";
import { useStore } from "@/providers/store-provider";
import { DealsSection } from "@/components/store/deals-section";

type DealsPageContentProps = {
  menuItems: MenuItem[];
};

export function DealsPageContent({ menuItems }: DealsPageContentProps) {
  const store = useStore();

  return (
    <DealsSection
      menuItems={menuItems}
      onApplyPromoCode={() => store.handleApplyPromoCode()}
      onAddComboToCart={store.handleAddComboToCart}
    />
  );
}
