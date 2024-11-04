"use client";

import { CartItemOption } from "@/model/cart";
import { FullProduct } from "@/model/product";
import { getDiscountedPrice } from "@/utils/calculate";
import Image from "next/image";
import Link from "next/link";

type Props = {
  product: FullProduct;
  options: CartItemOption[];
};

export default function OrderProductDetail({ product, options }: Props) {
  console.log("product", product);
  //TODO: 장바구니와 컴포넌트 UI구조 유사함
  return (
    <div className="flex gap-2">
      <div className="flex">
        {product && (
          <Link href={`/products/${product.id}`}>
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
            <Link href={`/products/${product.id}`}>
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
              options?.length > 0 &&
              options.map((opt) => (
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
