"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { STORAGE_KEYS } from "@/lib/constants/storage-keys";
import type { CartItem, MenuItem, Order, Review } from "@/types";

type StoreContextValue = {
  cartItems: CartItem[];
  cartOpen: boolean;
  cartCount: number;
  favorites: string[];
  orders: Order[];
  reviews: Review[];
  customizingItem: MenuItem | null;
  userAddress: string;
  showLocationModal: boolean;
  typedAddress: string;
  setCartOpen: (open: boolean) => void;
  setCustomizingItem: (item: MenuItem | null) => void;
  setUserAddress: (address: string) => void;
  setShowLocationModal: (show: boolean) => void;
  setTypedAddress: (address: string) => void;
  handleToggleFavorite: (id: string) => void;
  handleAddToCart: (newItem: CartItem) => void;
  handleAddComboToCart: (items: CartItem[]) => void;
  handleRemoveCartItem: (id: string) => void;
  handleUpdateQuantity: (id: string, newQty: number) => void;
  handleApplyPromoCode: () => void;
  handlePlaceOrder: (placedOrder: Order) => void;
  handleClearOrders: () => void;
  handleAdvanceStatus: (orderId: string) => void;
  handleSaveLocation: (e: FormEvent) => void;
  handleAddReview: (newReview: Review) => void;
  cartMenuIds: string[];
  cartToast: string | null;
  dismissCartToast: () => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

type StoreProviderProps = {
  children: ReactNode;
  initialReviews: Review[];
};

export function StoreProvider({ children, initialReviews }: StoreProviderProps) {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [userAddress, setUserAddress] = useState("Av. Paulista, 1000 - São Paulo, SP");
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [typedAddress, setTypedAddress] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cartToast, setCartToast] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const dismissCartToast = useCallback(() => setCartToast(null), []);

  const showItemAddedToast = useCallback(() => {
    setCartToast("Item adicionado");
  }, []);

  useEffect(() => {
    const savedFavorites = localStorage.getItem(STORAGE_KEYS.favorites);
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));

    const savedAddress = localStorage.getItem(STORAGE_KEYS.address);
    if (savedAddress) setUserAddress(savedAddress);

    const savedCart = localStorage.getItem(STORAGE_KEYS.cart);
    if (savedCart) setCartItems(JSON.parse(savedCart));

    const savedOrders = localStorage.getItem(STORAGE_KEYS.orders);
    if (savedOrders) setOrders(JSON.parse(savedOrders));

    setHydrated(true);
  }, []);

  const handleUpdateCartAndPersist = useCallback((updatedItems: CartItem[]) => {
    setCartItems(updatedItems);
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(updatedItems));
  }, []);

  const saveFavoritesToStorage = useCallback((list: string[]) => {
    setFavorites(list);
    localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(list));
  }, []);

  const handleToggleFavorite = useCallback(
    (id: string) => {
      if (favorites.includes(id)) {
        saveFavoritesToStorage(favorites.filter((fav) => fav !== id));
      } else {
        saveFavoritesToStorage([...favorites, id]);
      }
    },
    [favorites, saveFavoritesToStorage],
  );

  const handleAddToCart = useCallback(
    (newItem: CartItem) => {
      const existingIndex = cartItems.findIndex(
        (item) =>
          item.menuItem.id === newItem.menuItem.id &&
          item.selectedSize === newItem.selectedSize &&
          item.selectedBorder === newItem.selectedBorder &&
          JSON.stringify(item.pizzaAssembly) === JSON.stringify(newItem.pizzaAssembly) &&
          JSON.stringify([...item.extraIngredients].sort()) ===
            JSON.stringify([...newItem.extraIngredients].sort()),
      );

      if (existingIndex > -1) {
        const updated = [...cartItems];
        updated[existingIndex].quantity += newItem.quantity;
        updated[existingIndex].totalPrice =
          (updated[existingIndex].totalPrice / (updated[existingIndex].quantity - newItem.quantity)) *
          updated[existingIndex].quantity;
        handleUpdateCartAndPersist(updated);
      } else {
        handleUpdateCartAndPersist([...cartItems, newItem]);
      }

      showItemAddedToast();
    },
    [cartItems, handleUpdateCartAndPersist, showItemAddedToast],
  );

  const handleAddComboToCart = useCallback(
    (items: CartItem[]) => {
      let current = [...cartItems];
      items.forEach((comboItem) => {
        const idx = current.findIndex(
          (c) =>
            c.menuItem.id === comboItem.menuItem.id &&
            c.selectedSize === comboItem.selectedSize &&
            c.selectedBorder === comboItem.selectedBorder,
        );

        if (idx > -1) {
          current[idx].quantity += comboItem.quantity;
          current[idx].totalPrice += comboItem.totalPrice;
        } else {
          current.push(comboItem);
        }
      });

      handleUpdateCartAndPersist(current);
      showItemAddedToast();
    },
    [cartItems, handleUpdateCartAndPersist, showItemAddedToast],
  );

  const handleRemoveCartItem = useCallback(
    (id: string) => {
      handleUpdateCartAndPersist(cartItems.filter((item) => item.id !== id));
    },
    [cartItems, handleUpdateCartAndPersist],
  );

  const handleUpdateQuantity = useCallback(
    (id: string, newQty: number) => {
      const updated = cartItems.map((item) => {
        if (item.id === id) {
          const baseSingle = item.totalPrice / item.quantity;
          return {
            ...item,
            quantity: newQty,
            totalPrice: baseSingle * newQty,
          };
        }
        return item;
      });
      handleUpdateCartAndPersist(updated);
    },
    [cartItems, handleUpdateCartAndPersist],
  );

  const handleApplyPromoCode = useCallback(() => {
    setCartOpen(true);
  }, []);

  const handlePlaceOrder = useCallback(
    (placedOrder: Order) => {
      const updatedOrders = [...orders, placedOrder];
      setOrders(updatedOrders);
      localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(updatedOrders));
      handleUpdateCartAndPersist([]);
      router.push("/pedidos");
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [orders, handleUpdateCartAndPersist, router],
  );

  const handleClearOrders = useCallback(() => {
    setOrders([]);
    localStorage.removeItem(STORAGE_KEYS.orders);
    alert("Histórico de simulação reiniciado.");
  }, []);

  const handleAdvanceStatus = useCallback(
    (orderId: string) => {
      const updated = orders.map((ord) => {
        if (ord.id !== orderId) return ord;

        let nextStatus: Order["status"] = ord.status;
        if (ord.status === "Pendente") nextStatus = "Preparando";
        else if (ord.status === "Preparando") nextStatus = "No Forno";
        else if (ord.status === "No Forno") nextStatus = "Em Rota de Entrega";
        else if (ord.status === "Em Rota de Entrega") nextStatus = "Entregue";

        return { ...ord, status: nextStatus };
      });

      setOrders(updated);
      localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(updated));
    },
    [orders],
  );

  const handleSaveLocation = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!typedAddress.trim()) return;

      setUserAddress(typedAddress.trim());
      localStorage.setItem(STORAGE_KEYS.address, typedAddress.trim());
      setShowLocationModal(false);
    },
    [typedAddress],
  );

  const handleAddReview = useCallback((newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
    alert("Obrigado pelo seu comentário maravilhoso!");
  }, []);

  const cartCount = useMemo(
    () => cartItems.reduce((acc, c) => acc + c.quantity, 0),
    [cartItems],
  );

  const cartMenuIds = useMemo(
    () => [...new Set(cartItems.map((c) => c.menuItem.id))],
    [cartItems],
  );

  const value = useMemo<StoreContextValue>(
    () => ({
      cartItems,
      cartOpen,
      cartCount,
      favorites,
      orders,
      reviews,
      customizingItem,
      userAddress,
      showLocationModal,
      typedAddress,
      setCartOpen,
      setCustomizingItem,
      setUserAddress,
      setShowLocationModal,
      setTypedAddress,
      handleToggleFavorite,
      handleAddToCart,
      handleAddComboToCart,
      handleRemoveCartItem,
      handleUpdateQuantity,
      handleApplyPromoCode,
      handlePlaceOrder,
      handleClearOrders,
      handleAdvanceStatus,
      handleSaveLocation,
      handleAddReview,
      cartMenuIds,
      cartToast,
      dismissCartToast,
    }),
    [
      cartItems,
      cartOpen,
      cartCount,
      favorites,
      orders,
      reviews,
      customizingItem,
      userAddress,
      showLocationModal,
      typedAddress,
      handleToggleFavorite,
      handleAddToCart,
      handleAddComboToCart,
      handleRemoveCartItem,
      handleUpdateQuantity,
      handleApplyPromoCode,
      handlePlaceOrder,
      handleClearOrders,
      handleAdvanceStatus,
      handleSaveLocation,
      handleAddReview,
      cartMenuIds,
      cartToast,
      dismissCartToast,
    ],
  );

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-background text-on-surface flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-[48px] animate-pulse">local_pizza</span>
      </div>
    );
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore deve ser usado dentro de StoreProvider");
  }
  return context;
}
