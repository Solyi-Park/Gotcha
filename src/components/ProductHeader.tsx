"use client";
import { findFullCategoryNames } from "@/utils/categories";
import Image from "next/image";
import { getDiscountedPrice } from "@/utils/calculate";
import { FullProduct } from "@/model/product";
import LikeButton from "./LikeButton";
import ProductOptionsSelector from "./ProductOptionsSelector";
import CategoryPath from "./CategoryPath";
import ActionButton from "./ActionButton";
import { useCartOption } from "@/store/option";
import { MouseEvent } from "react";
import { useSession } from "next-auth/react";

type Props = {
  product: FullProduct;
};
export type CartOption = {
  userId: string;
  productId: string;
  quantity: number;
  optionItems: { name: string; value: string }[];
};
async function addProductToCart(cartOptions: CartOption[]) {
  const res = fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cartOptions),
  });
  return res;
}
export default function ProductDetailHeader({ product }: Props) {
  const {
    categoryCode,
    thumbnailUrls,
    discountRate,
    name,
    price,
    stockQuantity,
    likes,
    options,
    id,
  } = product;
  const { data: session } = useSession();
  const user = session?.user;

  const categoryNames = findFullCategoryNames(categoryCode);
  const { large, medium, small } = categoryNames;
  const { cartOptions, resetOption } = useCartOption();
  // console.log("cartOptions???", cartOptions);
  const isAllOptionsSelected = options?.length === cartOptions?.length;

  const handleAddToCart = async (e: MouseEvent<HTMLButtonElement>) => {
    // e.preventDefault()
    console.log("cartOptions", cartOptions);
    const totalQuantity = cartOptions.reduce(
      (sum, option) => sum + option.quantity,
      0
    );
    if (cartOptions.length === 0) {
      alert("상품 옵션을 선택해주세요.");
      return;
    }
    if (totalQuantity > stockQuantity) {
      alert("재고 수량이 부족합니다.");
      return;
    } else {
      // 장바구니에 추가하는 로직
      const cartOption: CartOption[] = cartOptions.map((opt) => ({
        userId: user.id,
        productId: id,
        quantity: opt.quantity,
        optionItems: opt.optionItems,
      }));

      const res = await addProductToCart(cartOption);
      if (res.ok) {
        alert("장바구니에 상품이 담겼습니다.");
      }
      resetOption();
    }
  };

  const handleBuyNow = (e: MouseEvent<HTMLButtonElement>) => {
    console.log("바로구매하기!");
  };

  return (
    <section className="flex flex-col sm:flex-row">
      <div className="relative w-96 h-96 object-cover">
        {thumbnailUrls && thumbnailUrls !== null && (
          <Image
            src={thumbnailUrls[0] || ""}
            fill
            alt="product thumbnail"
            className="w-96 h-96 object-fill"
          />
        )}
      </div>
      <div>
        <div>
          <div className="flex justify-between">
            <CategoryPath large={large} medium={medium} small={small} />
            <LikeButton product={product} isForDetail />
          </div>
          <h2 className="text-lg font-semibold">{name}</h2>
        </div>
        <div>
          {/* TODO: 리뷰보기 클릭시 해당위치로 스크롤 이동 */}
          <button className="underline">164개 리뷰 보기</button>
          <div className="flex justify-between">
            <div>
              {discountRate && (
                <span className="line-through text-sm">
                  {price.toLocaleString()}원
                </span>
              )}
              <div>
                {discountRate && <span>{discountRate}%</span>}
                <span className="font-bold text-xl">
                  {getDiscountedPrice(price, discountRate).toLocaleString()}원
                </span>
              </div>
            </div>
          </div>
        </div>
        <ProductOptionsSelector product={product} />
        <div className="flex gap-1">
          <ActionButton
            product={product}
            type="cart"
            title="cart"
            onClick={(e) => handleAddToCart(e)}
          />
          <ActionButton
            product={product}
            type="buyNow"
            title="buyNow"
            onClick={(e) => handleBuyNow(e)}
          />
        </div>
      </div>
    </section>
  );
}
