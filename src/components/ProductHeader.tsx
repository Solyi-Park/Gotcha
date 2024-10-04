"use client";
import { findFullCategoryNames } from "@/utils/categories";
import Image from "next/image";
import { getDiscountedPrice } from "@/utils/calculate";
import { FullProduct } from "@/model/product";
import ProductOptionsSelector from "./ProductOptionsSelector";
import CategoryPath from "./CategoryPath";
import ActionButton from "./buttons/ActionButton";
import { useProductOptionStore } from "@/store/option";
import { MouseEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import QuantityAdjuster from "./QuantityAdjuster";
import { NewCartItem } from "@/model/cart";
import LikeButton from "./buttons/LikeButton";

type Props = {
  product: FullProduct;
};

async function addProductToCart(productOptions: NewCartItem[]) {
  const res = fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productOptions),
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

  const queryClient = useQueryClient();
  const categoryNames = findFullCategoryNames(categoryCode);
  const { large, medium, small } = categoryNames;
  const { productOptions, resetOption } = useProductOptionStore();
  const [quantity, setQuantity] = useState<number>(1);

  const handleUpdateQuantity = (delta: number) => {
    setQuantity((prev) => {
      const updatedQuantity = prev + delta;
      return updatedQuantity > 0 ? updatedQuantity : 1;
    });
  };

  const isAllOptionsSelected =
    options?.length === productOptions[0]?.items.length;

  const handleAddToCart = async () => {
    const totalQuantity = options
      ? productOptions.reduce((sum, option) => sum + option.quantity, 0)
      : quantity;
    if (!options && quantity > stockQuantity) {
      alert("재고 수량이 부족합니다.");
    }

    if (options && !isAllOptionsSelected) {
      alert("상품 옵션을 선택해주세요.");
      return;
    }
    if (totalQuantity > stockQuantity) {
      alert("재고 수량이 부족합니다.");
      return;
    }
    const newCartItems: NewCartItem[] = options
      ? productOptions.map((opt) => ({
          userId: user.id,
          productId: id,
          quantity: opt.quantity,
          option: {
            id: opt.id,
            items: opt.items,
          },
        }))
      : [
          {
            userId: user.id,
            productId: id,
            quantity: totalQuantity,
            option: {},
          },
        ];
    console.log("장바구니에 넣을라고", newCartItems);
    const res = await addProductToCart(newCartItems);
    if (res.ok) {
      // TODO: 커스텀 모달: 장바구니 바로가기 버튼
      // CartDetails에서 useEffect가 userCartData에 의존하지 않는 경우 carItems invalidateQueries해줘야함
      // queryClient.invalidateQueries({ queryKey: ["cartItems", user.id] });
      queryClient.invalidateQueries({ queryKey: ["userCart", user.id] });
      alert("장바구니에 상품이 담겼습니다.");
    }
    resetOption();
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
        {!options && (
          <QuantityAdjuster
            onClick={handleUpdateQuantity}
            id={id}
            quantity={quantity}
          />
        )}
        <div className="flex gap-1">
          <ActionButton
            product={product}
            type="cart"
            title="cart"
            onClick={() => handleAddToCart()}
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
