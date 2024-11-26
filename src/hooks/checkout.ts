import { useCheckoutStore } from "@/store/checkout";
import { getDiscountedPrice } from "@/utils/calculate";

export const useCheckout = () => {
  const checkoutItems = useCheckoutStore((state) => state.checkoutItems);

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
    return totalPrice >= 70000 ? 0 : 3500;
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
};
