"use client";

import { findFullCategoryNames } from "@/utils/categories";
import Image from "next/image";
import { getDiscountedPrice } from "@/utils/calculate";
import { FullProduct } from "@/model/product";
import ProductOptionsSelector from "./ProductOptionsSelector";
import CategoryPath from "./CategoryPath";
import ActionButton from "./buttons/ActionButton";
import { useProductOption } from "@/store/option";
import { MouseEvent, useState } from "react";
import QuantityAdjuster from "./QuantityAdjuster";

import LikeButton from "./buttons/LikeButton";
import { useCartStore } from "@/store/cart";

type Props = {
  product: FullProduct;
};

export default function ProductDetailHeader({ product }: Props) {
  const {
    categoryCode,
    thumbnailUrls,
    discountRate,
    name,
    price,
    stockQuantity,
    options,
    id,
  } = product;
  // console.log("product", product);

  const { productOptions, resetOption } = useProductOption();
  const [quantity, setQuantity] = useState<number>(1);

  const { addItem } = useCartStore();

  const handleUpdateQuantity = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const isAllOptionsSelected =
    options?.length === productOptions[0]?.items.length;

  const handleAddToCart = () => {
    const totalQuantity = options
      ? productOptions.reduce((sum, option) => sum + option.quantity, 0)
      : quantity;

    if (totalQuantity > stockQuantity) {
      alert("재고 수량이 부족합니다.");
      return;
    }

    if (options && !isAllOptionsSelected) {
      alert("상품 옵션을 선택해주세요.");
      return;
    }

    const newCartItems = options
      ? productOptions.map((opt) => ({
          productId: id,
          name,
          price,
          quantity: opt.quantity,
          option: { id: opt.id, items: opt.items },
        }))
      : [
          {
            productId: id,
            name,
            price,
            quantity,
            option: { id: "", items: [] },
          },
        ];

    newCartItems.forEach((item) => addItem(item));
    alert("장바구니에 상품이 담겼습니다.");
    resetOption();
  };

  const handleBuyNow = (e: MouseEvent<HTMLButtonElement>) => {
    alert("서비스 준비중입니다!");
  };

  const categoryNames = findFullCategoryNames(categoryCode);
  const { large, medium, small } = categoryNames;

  return (
    <section className="my-10 flex flex-col sm:flex-row min-w-96 items-start min-h-96 justify-center">
      <div className="relative min-w-96 h-96 object-cover aspect-square">
        {thumbnailUrls && (
          <Image src={thumbnailUrls[0] || ""} fill alt="product thumbnail" />
        )}
      </div>
      <div className="h-full sm:mx-7 w-full">
        <div>
          <div className="flex flex-col py-3 sm:border-t-2 sm:border-t-black gap-5">
            <CategoryPath large={large} medium={medium} small={small} />
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">{name}</h2>
              <LikeButton product={product} isForDetail />
            </div>
            <button className="underline text-start">164개 리뷰 보기</button>
            <div className="flex justify-between">
              <div>
                <div className="font-bold text-xl">
                  {discountRate && (
                    <span className="text-rose-500 mr-2">{discountRate}%</span>
                  )}
                  <span>
                    {getDiscountedPrice(price, discountRate).toLocaleString()}원
                  </span>
                </div>
                {discountRate && (
                  <span className="line-through text-sm text-neutral-400 font-semibold">
                    {price.toLocaleString()}원
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <ProductOptionsSelector product={product} />
          {!options && (
            <QuantityAdjuster
              onClick={handleUpdateQuantity}
              id={id}
              quantity={quantity}
            />
          )}
          <div className="flex w-full gap-1 mt-5">
            <ActionButton
              product={product}
              type="cart"
              title="장바구니 담기"
              onClick={handleAddToCart}
              stockQuantity={stockQuantity}
            />
            <ActionButton
              product={product}
              type="buyNow"
              title="바로 구매"
              onClick={handleBuyNow}
              stockQuantity={stockQuantity}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
