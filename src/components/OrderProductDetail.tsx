"use client";

import { CartItemOption } from "@/model/cart";
import { OrderItemWithProduct } from "@/model/order";
import { FullProduct } from "@/model/product";
import { getDiscountedPrice } from "@/utils/calculate";
import Image from "next/image";
import Link from "next/link";

type Props = {
  item: OrderItemWithProduct;
  options: CartItemOption[];
};

//TODO: 타입수정해야함. item.products <-- product 정보(+service 로직)
export default function OrderProductDetail({ item, options }: Props) {
  console.log("item", item);
  //TODO: 장바구니와 컴포넌트 UI구조 유사함
  return (
    <div className="flex gap-2">
      <div className="flex">
        {item && (
          <Link href={`/products/${item.products.id}`}>
            <Image
              src={item.products?.thumbnailUrls[0]}
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
            <Link href={`/products/${item.products?.id}`}>
              <span className="font-bold">{item.products?.name}</span>
            </Link>
            {/* TODO: button icon 변경, 반응형구현 */}
          </div>
          <span
            className={`${
              item.products?.discountRate && "line-through"
            } text-sm`}
          >
            {item.products?.price.toLocaleString() || 0}원
          </span>
          <p className="text-rose-400 text-sm">
            <span className="mr-1">[{item.products?.discountRate}%]</span>
            <span>
              {getDiscountedPrice(
                item.products?.price,
                item.products?.discountRate
              ).toLocaleString() || 0}
              원
            </span>
          </p>
          {/* TODO: 저장된 옵션데이터 형식이 잘못되었음. 수정 */}
          <ul className="flex gap-2 text-xs text-gray-700">
            {item.products &&
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
