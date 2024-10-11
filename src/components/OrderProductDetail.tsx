"use client";

import { CartItemOption } from "@/model/cart";
import { OrderDetails, OrderItem } from "@/model/order";
import { getDiscountedPrice } from "@/utils/calculate";
import { useQueries, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

type Props = {
  productId: string;
  order: OrderDetails;
};

async function fetchProductData(productId: string) {
  try {
    const res = await fetch(`/api/products/${productId}`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch product with productId:${productId}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default function OrderProductDetail({ productId }: Props) {
  const { data: product } = useQuery({
    queryKey: ["confirmed", "product", productId],
    queryFn: async () => fetchProductData(productId),
  });

  //TODO: 장바구니와 컴포넌트 UI구조 유사함
  return (
    <div className="flex gap-2">
      <div className="flex">
        {product && (
          <Link href={`/products/${productId}`}>
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
            <Link href={`/products/${productId}`}>
              <span className="font-bold">{product?.name}</span>
            </Link>
            {/* TODO: button icon 변경, 반응형구현 */}
          </div>
          <span
            className={`${product?.discountRate && "line-through"} text-sm`}
          >
            {product?.price.toLocaleString() || 0}원
          </span>
          <p className="text-rose-400 text-sm">
            <span className="mr-1">[{product?.discountRate}%]</span>
            <span>
              {getDiscountedPrice(
                product?.price,
                product?.discountRate
              ).toLocaleString() || 0}
              원
            </span>
          </p>
          {/* TODO: 저장된 옵션데이터 형식이 잘못되었음. 수정 */}
          <ul className="flex gap-2 text-xs text-gray-700">
            {product &&
              product.option?.length > 0 &&
              product.option.items.map((opt: CartItemOption) => (
                <li className="flex " key={`${opt.name}${opt.value}`}>
                  <span>{`[${opt.name}] ${opt.value}`}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
