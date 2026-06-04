"use client";

import { useStore } from "@/providers/store-provider";
import { OrderTracker } from "@/components/store/order-tracker";

export function OrdersPageContent() {
  const store = useStore();

  return (
    <OrderTracker
      orders={store.orders}
      onAdvanceStatus={store.handleAdvanceStatus}
      onClearOrders={store.handleClearOrders}
    />
  );
}
