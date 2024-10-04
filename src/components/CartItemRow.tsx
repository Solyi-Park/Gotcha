import { CartItemRowType } from "@/model/cart";
import Image from "next/image";
import { getDiscountedPrice } from "@/utils/calculate";
import Link from "next/link";
import DeleteIcon from "./icons/DeleteIcon";
import { useCartStore } from "@/store/cart";
import QuantityAdjuster from "./QuantityAdjuster";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type Props = {
  item: CartItemRowType;
};

async function updateCartItemQuantity(itemId: string, quantity: number) {
  return await fetch("/api/cart", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemId, quantity }),
  });
}

async function deleteCartItem(itemId: string) {
  return await fetch(`/api/cart?itemId=${itemId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
}

export default function CartItemRow({ item }: Props) {
  const { option, product, userId, id } = item;
  const { userCart, setUserCart, updateQuantity, deleteItem } = useCartStore();
  const queryClient = useQueryClient();
  //로컬에 상태가 필요한가?
  const [localQuantity, setLocalQuantity] = useState(item.quantity);

  // TODO: 쓰로틀링
  const handleUpdateQuantity = async (delta: number) => {
    const newQuantity = localQuantity + delta;
    if (newQuantity > 0) {
      setLocalQuantity(newQuantity);

      const res = await updateCartItemQuantity(item.id, newQuantity);
      if (res.ok) {
        updateQuantity(item.id, delta);
        queryClient.invalidateQueries({ queryKey: ["cartItems", userId] });
        queryClient.invalidateQueries({ queryKey: ["userCart", userId] });
      }
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    const res = await deleteCartItem(itemId);

    if (res.ok) {
      setUserCart(userCart.filter((i) => i.id !== itemId));
      queryClient.invalidateQueries({ queryKey: ["cartItems", userId] });
      queryClient.invalidateQueries({ queryKey: ["userCart", userId] });
    }
  };
  return (
    <div className="flex gap-2">
      <div className="flex">
        {product && (
          <Link href={`/products/${item.product?.id}`}>
            <Image
              src={product?.thumbnailUrls[0]}
              alt="cart item thumbnail"
              width={120}
              height={120}
              className="aspect-square object-cover"
              priority
            />
          </Link>
        )}

        <div className="flex flex-col">
          <div>
            <Link href={`/products/${item.product?.id}`}>
              <span className="font-bold">{product?.name}</span>
            </Link>
            {/* TODO: button icon 변경, 반응형구현 */}
            <button
              className="text-sm w-7 h-7"
              onClick={() => handleDeleteItem(id)}
            >
              <DeleteIcon size="large" />
            </button>
          </div>
          <span
            className={`${product?.discountRate && "line-through"} text-sm`}
          >
            {product?.price.toLocaleString() || 0}원
          </span>
          <p className="text-red-400 text-sm">
            <span className="mr-1">[{product?.discountRate}%]</span>
            <span>
              {getDiscountedPrice(
                product?.price,
                product?.discountRate
              ).toLocaleString() || 0}
              원
            </span>
          </p>
          <ul className="flex gap-2 text-xs text-gray-700">
            {option &&
              "items" in option &&
              option.items.map((opt) => (
                <li className="flex " key={`${opt.name}${opt.value}`}>
                  <span>{`[${opt.name}] ${opt.value}`}</span>
                </li>
              ))}
            <QuantityAdjuster
              id={item.id}
              quantity={localQuantity}
              onClick={handleUpdateQuantity}
            />
          </ul>
        </div>
        <div>
          <span>
            {/* TODO: 반복되는 금액 계산 로직 분리 */}
            {(
              localQuantity *
              getDiscountedPrice(product?.price, product?.discountRate)
            ).toLocaleString() || 0}
            원
          </span>
          <button className=" px-3 py-2 bg-black text-white text-sm rounded-sm hover:opacity-80">
            구매하기
          </button>
        </div>
      </div>
    </div>
  );
}
