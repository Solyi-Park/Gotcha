import { CartItem, CartItemRowType } from "@/model/cart";
import { create } from "zustand";

interface CartState {
  userCart: CartItemRowType[];
  setUserCart: (cartItems: CartItemRowType[]) => void;
  updateQuantity: (id: string, delta: number) => void;
  deleteItem: (id: string) => void;
  resetCart: () => void;
}

export const useUserCart = create<CartState>((set) => ({
  userCart: [],
  setUserCart: (cartItems) => set({ userCart: cartItems }),
  updateQuantity: (id, delta) =>
    set((state) => ({
      userCart: state.userCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      ),
    })),
  deleteItem: (id) =>
    set((state) => ({
      userCart: state.userCart.filter((item) => item.id !== id),
    })),
  resetCart: () => set({ userCart: [] }),
}));
