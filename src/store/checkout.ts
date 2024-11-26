import { CartItemRowType } from "@/model/cart";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CheckoutState {
  checkoutItems: CartItemRowType[];
  setCheckoutItems: (items: CartItemRowType[]) => void;
  resetCheckoutItems: () => void;
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      checkoutItems: [],
      setCheckoutItems: (items) => set({ checkoutItems: items }),
      resetCheckoutItems: () => set({ checkoutItems: [] }),
    }),
    { name: "checkout-storage" }
  )
);
