"use client";

import { useCheckoutStore } from "@/store/checkout";
import { getDiscountedPrice } from "@/utils/calculate";

export default function useCheckout() {
  const checkoutItems = useCheckoutStore((state) => state.checkoutItems);
  console.log("checkoutItems 스토어", checkoutItems);

  const getTotalPrice = () => {
    return checkoutItems.reduce((acc, item) => {
      return (
        acc +
        getDiscountedPrice(item.product?.price, item.product?.discountRate) *
          item.quantity
      );
    }, 0);
  };

  const getShippingCost = () => {
    const totalPrice = getTotalPrice();
    return totalPrice > 0 ? (totalPrice >= 70000 ? 0 : 3500) : 0;
  };

  const getTotalPaymentAmount = () => {
    return getTotalPrice() + getShippingCost();
  };

  return {
    checkoutItems,
    getTotalPrice,
    getShippingCost,
    getTotalPaymentAmount,
  };
}
