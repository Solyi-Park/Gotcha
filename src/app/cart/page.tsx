"use client";
import CartDetails from "@/components/CartDetails";
import ContinueShoppingButton from "@/components/buttons/ContinueShoppingButton";
import { useCartStore } from "@/store/cart";

export default function CartPage() {
  const { cartItems } = useCartStore();

  return (
    <div className="my-10">
      {cartItems.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full gap-10">
          <p className="text-4xl">장바구니에 담은 상품이 없습니다.</p>
          <ContinueShoppingButton />
        </div>
      )}
      {cartItems.length > 0 && <CartDetails />}
    </div>
  );
}
