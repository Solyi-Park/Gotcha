import { CartItemRowType } from "@/model/cart";
import Image from "next/image";
import { SimpleProduct } from "@/model/product";
import QuantityAdjuster from "./QuantityAdjuster";
import { getDiscountedPrice } from "@/utils/calculate";
import { useEffect, useState } from "react";

type Props = {
  item: CartItemRowType;
  product: SimpleProduct;
};
export default function CartItemRow({ item, product }: Props) {
  const [itemQuantity, setItemQuantity] = useState(1);
  const { option } = item;

  useEffect(() => {
    setItemQuantity(item.quantity);
  }, [item]);

  const handleUpdateQuantity = (delta: number) =>
    //TODO: 여기가 아니라 장바구니 DB가 업데이트 되어야함
    // 쓰로틀링
    setItemQuantity((pre) => pre + delta);

  return (
    <div className="flex gap-2">
      <div className="flex">
        <Image
          src={product.thumbnailUrls[0]}
          alt="cart item thumbnail"
          width={120}
          height={120}
          className="aspect-square object-cover"
          priority
        />
        <div className="flex flex-col">
          <span>{product.name}</span>
          <span className={`${product.discountRate && "line-through"} text-sm`}>
            {product.price.toLocaleString()}원
          </span>
          <p className="text-red-400 text-sm">
            <span className="mr-1">[{product.discountRate}%]</span>
            <span>
              {getDiscountedPrice(
                product.price,
                product.discountRate
              ).toLocaleString()}
              원
            </span>
          </p>
          <ul className="flex gap-2 text-xs text-gray-700">
            {option &&
              option.items.map((opt) => (
                <li className="flex " key={`${opt.name}${opt.value}`}>
                  <span>{`[${opt.name}] ${opt.value}`}</span>
                </li>
              ))}
            <QuantityAdjuster
              optionId={option.id}
              quantity={itemQuantity || 1}
              onClick={handleUpdateQuantity}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
