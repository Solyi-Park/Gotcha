"use client";
import { SimpleProduct } from "@/model/product";
import { useCheckoutStore } from "@/store/checkout";

export default function OrderItemSummary() {
  const { checkoutItems } = useCheckoutStore();
  console.log("checkoutItems ?", checkoutItems);
  return (
    <section>
      <h2 className="font-bold">
        상품 정보 / 총 {checkoutItems && checkoutItems.length}개
      </h2>
      <ul>{}</ul>
    </section>
  );
}
