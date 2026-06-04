"use client";

import type { MenuItem } from "@/types";
import { useStore } from "@/providers/store-provider";
import { Hero } from "@/components/store/hero";
import { MenuSection } from "@/components/store/menu-section";
import { OurSpace } from "@/components/store/our-space";
import { ReviewsSection } from "@/components/store/reviews-section";

type HomeContentProps = {
  menuItems: MenuItem[];
};

export function HomeContent({ menuItems }: HomeContentProps) {
  const store = useStore();

  return (
    <div>
      <Hero
        onOrderNowClick={() =>
          document.getElementById("menu-section")?.scrollIntoView({ behavior: "smooth" })
        }
      />

      <MenuSection
        menuItems={menuItems}
        onAddClick={(item) => store.setCustomizingItem(item)}
        favorites={store.favorites}
        onToggleFavorite={store.handleToggleFavorite}
        cartMenuIds={store.cartMenuIds}
      />

      <OurSpace />

      <ReviewsSection reviews={store.reviews} onAddReview={store.handleAddReview} />
    </div>
  );
}
