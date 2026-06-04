"use client";

import type { Review } from "@/types";
import { StoreProvider, useStore } from "@/providers/store-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LocationModal } from "@/components/layout/location-modal";
import { CartDrawer } from "@/components/store/cart-drawer";
import { CustomizeModal } from "@/components/store/customize-modal";
import { StoreToast } from "@/components/ui/store-toast";

type StorefrontShellProps = {
  children: React.ReactNode;
  initialReviews: Review[];
};

function StorefrontUI({ children }: { children: React.ReactNode }) {
  const store = useStore();

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col justify-between overflow-x-hidden antialiased">
      <Header
        cartCount={store.cartCount}
        onCartClick={() => store.setCartOpen(true)}
      />

      <main className="flex-grow">{children}</main>

      <Footer />

      {store.customizingItem && (
        <CustomizeModal
          item={store.customizingItem}
          onClose={() => store.setCustomizingItem(null)}
          onAddToCart={store.handleAddToCart}
        />
      )}

      <CartDrawer
        isOpen={store.cartOpen}
        onClose={() => store.setCartOpen(false)}
        cartItems={store.cartItems}
        onRemoveItem={store.handleRemoveCartItem}
        onUpdateQuantity={store.handleUpdateQuantity}
        userAddress={store.userAddress}
        setUserAddress={store.setUserAddress}
        onPlaceOrder={store.handlePlaceOrder}
      />

      <StoreToast message={store.cartToast} onDismiss={store.dismissCartToast} />

      {store.showLocationModal && (
        <LocationModal
          typedAddress={store.typedAddress}
          onTypedAddressChange={store.setTypedAddress}
          onClose={() => store.setShowLocationModal(false)}
          onSubmit={store.handleSaveLocation}
        />
      )}
    </div>
  );
}

export function StorefrontShell({ children, initialReviews }: StorefrontShellProps) {
  return (
    <StoreProvider initialReviews={initialReviews}>
      <StorefrontUI>{children}</StorefrontUI>
    </StoreProvider>
  );
}
