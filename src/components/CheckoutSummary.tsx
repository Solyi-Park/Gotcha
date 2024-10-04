"use clinet";
import OrderItemSummary from "./OrderItemSummary";
import PaymentSummary from "./PaymentSummary";

export default function CheckoutSummary() {
  console.log();
  return (
    <aside>
      <OrderItemSummary />
      <PaymentSummary />

      <button>결제하기 </button>
    </aside>
  );
}
