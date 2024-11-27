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
    body: JSON.stringify({ newCartItems: productOptions }),
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
    options,
    id,
  } = product;
  console.log("products", product);

  const { data: session } = useSession();
  const user = session?.user;

  const queryClient = useQueryClient();

  const categoryNames = findFullCategoryNames(categoryCode);
  const { large, medium, small } = categoryNames;
  const { productOptions, resetOption } = useProductOption();
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
    if (user) {
      const newCartItems: NewCartItem[] = options
        ? productOptions.map((opt) => ({
            userId: user?.id,
            productId: id,
            quantity: opt.quantity,
            option: {
              id: opt.id,
              items: opt.items,
            },
          }))
        : [
            {
              userId: user?.id,
              productId: id,
              quantity: totalQuantity,
              option: {
                id: "",
                items: [],
              },
            },
          ];
      // console.log("장바구니에 넣을라고", newCartItems);
      const res = await addProductToCart(newCartItems);
      if (res.ok) {
        // TODO: 커스텀 모달: 장바구니 바로가기 버튼
        // CartDetails에서 useEffect가 userCartData에 의존하지 않는 경우 carItems invalidateQueries해줘야함
        // queryClient.invalidateQueries({ queryKey: ["cartItems", user.id] });
        queryClient.invalidateQueries({ queryKey: ["userCart", user?.id] });
        alert("장바구니에 상품이 담겼습니다.");
      }
      resetOption();
    }
  };

  const handleBuyNow = (e: MouseEvent<HTMLButtonElement>) => {
    // console.log("서비스 준비중입니다!");
  };

  return (
    <section className="my-10 flex flex-col sm:flex-row min-w-96 items-start min-h-96 justify-center">
      <div className="relative min-w-96 h-96 object-cover aspect-square">
        {thumbnailUrls && thumbnailUrls !== null && (
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
          {/* TODO: 리뷰보기 클릭시 해당위치로 스크롤 이동 */}
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
      </div>
    </section>
  );
}
