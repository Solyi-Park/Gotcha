"use client";
import useCheckout from "@/hooks/checkout";
import OrderItemSummary from "./OrderItemSummary";
import PaymentSummary from "./PaymentSummary";

export default function CheckoutSummary() {
  const { checkoutItems, getTotalPrice, getShippingCost } = useCheckout();

  console.log("checkoutItems:", checkoutItems);

  return (
    <aside className="flex flex-col w-full max-w-[640px]">
      {/* TODO:상품정보 */}
      {/* <OrderItemSummary /> */}
      <PaymentSummary />
    </aside>
  );
}
