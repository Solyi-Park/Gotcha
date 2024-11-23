import { CartItemRowType } from "@/model/cart";
import { getDiscountedPrice } from "@/utils/calculate";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CheckoutState {
  checkoutItems: CartItemRowType[];
  setCheckoutItems: (items: CartItemRowType[]) => void;
  resetCheckoutItems: () => void;
  getTotalPrice: () => number;
  getShippingCost: () => number;
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set, get) => ({
      checkoutItems: [],
      setCheckoutItems: (items) => set({ checkoutItems: items }),
      resetCheckoutItems: () => set({ checkoutItems: [] }),

      getTotalPrice: () => {
        const { checkoutItems } = get();
        return checkoutItems.reduce((acc, item) => {
          return (
            acc +
            getDiscountedPrice(
              item.product?.price,
              item.product?.discountRate
            ) *
              item.quantity
          );
        }, 0);
      },
      getShippingCost: () => {
        const { getTotalPrice } = get();
        const totalPrice = getTotalPrice();
        if (totalPrice >= 70000) {
          return 0;
        } else {
          return 3500;
        }
      },
    }),
    { name: "checkout-storage" }
  )
);
