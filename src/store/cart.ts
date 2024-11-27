import { CartItem } from "@/model/cart";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
}

export const useCartStore = create(
  persist<CartState>(
    (set) => ({
      cartItems: [],
      addItem: (item) =>
        set((state) => {
          const existingItem = state.cartItems.find(
            (i) => i.productId === item.productId
          );
          if (existingItem) {
            return {
              cartItems: state.cartItems.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { cartItems: [...state.cartItems, item] };
        }),
      removeItem: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.productId !== id),
        })),
      updateQuantity: (id, delta) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.productId === id
              ? { ...item, quantity: Math.max(1, item.quantity + delta) }
              : item
          ),
        })),
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage",
      getStorage: () => localStorage,
    }
  )
);
