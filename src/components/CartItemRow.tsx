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
  isChecked: boolean;
  onCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdateQuantity: (delta: number) => void;
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

export default function CartItemRow({
  item,
  isChecked,
  onCheck,
  onUpdateQuantity,
}: Props) {
  const { option, product, userId, id } = item;
  const [localQuantity, setLocalQuantity] = useState(item.quantity);

  const { updateQuantity, deleteItem } = useCartStore();
  const queryClient = useQueryClient();
  //로컬에 상태가 필요한가?

  // TODO: 쓰로틀링
  const handleUpdateQuantity = async (delta: number) => {
    const newQuantity = localQuantity + delta;
    if (newQuantity > 0) {
      setLocalQuantity(newQuantity);
      onUpdateQuantity(delta);

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
      deleteItem(itemId);
      queryClient.invalidateQueries({ queryKey: ["cartItems", userId] });
      queryClient.invalidateQueries({ queryKey: ["userCart", userId] });
    }
  };
  return (
    <div className="w-full py-2">
      {/* sm 이상 레이아웃 */}
      <div className="hidden sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center">
        {/* 이미지 */}
        {product && (
          <div className="col-span-2 w-28 h-28 relative aspect-square">
            <Link href={`/products/${product?.id}`}>
              <Image
                src={product?.thumbnailUrls[0]}
                alt="cart item thumbnail"
                fill
                priority
                className="object-cover"
              />
            </Link>
          </div>
        )}

        {/* 상품 정보 */}
        {/* TODO: 이미지와 겹치는 부분 수정 */}
        <div className="col-span-4 flex flex-col sm:gap-1">
          <div className="flex justify-between">
            <Link href={`/products/${product?.id}`}>
              <span className="font-bold text-xl">{product?.name}</span>
            </Link>
            <button
              className="text-xs border rounded-sm bg-white py-1 px-4"
              onClick={() => handleDeleteItem(id)}
            >
              삭제
            </button>
          </div>
          <span
            className={`${product?.discountRate && "line-through"} text-sm`}
          >
            {product?.price.toLocaleString() || 0}원
          </span>
          {product?.discountRate && (
            <p className="text-rose-500 text-sm">
              <span className="mr-1">[{product.discountRate}%]</span>
              <span>
                {getDiscountedPrice(
                  product?.price,
                  product?.discountRate
                ).toLocaleString() || 0}
                원
              </span>
            </p>
          )}
          <ul className="text-xs text-gray-700">
            {option &&
              "items" in option &&
              option.items.map((opt) => (
                <li className="flex " key={`${opt.name}${opt.value}`}>
                  <span className="mr-1">옵션:</span>
                  <span>{`[${opt.name}] ${opt.value}`}</span>
                </li>
              ))}
          </ul>
        </div>

        {/* 수량 */}
        <div className="col-span-3 flex items-center justify-center">
          <QuantityAdjuster
            id={item.id}
            quantity={localQuantity}
            onClick={handleUpdateQuantity}
          />
        </div>

        {/* 주문 금액 */}
        <div className="col-span-3 text-center font-bold text-lg">
          {(
            localQuantity *
            getDiscountedPrice(product?.price, product?.discountRate)
          ).toLocaleString() || 0}
          원
        </div>
      </div>

      {/* sm 이하 레이아웃 */}
      <div className="sm:hidden flex flex-col gap-1">
        {/* 첫 번째 행: 체크박스와 삭제 버튼 */}
        <div className="flex justify-between items-center">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={onCheck}
            className="w-5 h-5"
          />
          <button
            className="text-xs border rounded-sm bg-white py-1 px-4"
            onClick={() => handleDeleteItem(id)}
          >
            삭제
          </button>
        </div>

        {/* 두 번째 행: 상품 정보와 이미지 */}
        <div className="flex justify-between items-start">
          {/* 상품 정보 */}
          <div className="flex-1 flex flex-col gap-1">
            <Link href={`/products/${product?.id}`}>
              <span className="font-bold text-lg">{product?.name}</span>
            </Link>
            <span
              className={`${product?.discountRate && "line-through"} text-sm`}
            >
              {product?.price.toLocaleString() || 0}원
            </span>
            <p className="text-rose-500 text-sm">
              {product?.discountRate && (
                <>
                  <span className="mr-1">[{product.discountRate}%]</span>
                  <span>
                    {getDiscountedPrice(
                      product?.price,
                      product?.discountRate
                    ).toLocaleString() || 0}
                    원
                  </span>
                </>
              )}
            </p>
            <ul className="text-xs text-gray-700">
              {option?.items.map((opt) => (
                <li className="flex" key={`${opt.name}${opt.value}`}>
                  <span className="mr-1">옵션:</span>
                  <span>{`[${opt.name}] ${opt.value}`}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* 이미지 */}
          <div className="w-28 h-28 relative">
            <Link href={`/products/${product?.id}`}>
              <Image
                src={product?.thumbnailUrls[0]}
                alt="cart item thumbnail"
                fill
                className="object-cover"
                priority
              />
            </Link>
          </div>
        </div>

        {/* 세 번째 행: 수량 조절 */}
        <div className="flex sm:justify-center justify-start">
          <QuantityAdjuster
            id={item.id}
            quantity={localQuantity}
            onClick={handleUpdateQuantity}
          />
        </div>
      </div>
    </div>
  );
}
