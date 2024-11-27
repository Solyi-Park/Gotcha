"use client";

import { CartItem, CartItemRowType } from "@/model/cart";
import CartItemRow from "./CartItemRow";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart";
import ContinueShoppingButton from "./buttons/ContinueShoppingButton";
import CheckOutButton from "./buttons/CheckOutButton";
import { useRouter } from "next/navigation";
import { getDiscountedPrice } from "@/utils/calculate";
import { useQuery } from "@tanstack/react-query";
import { FullProduct } from "@/model/product";
import { useSession } from "next-auth/react";

async function getProductsByIds(productIds: string[]) {
  const uniqueProductIds = Array.from(new Set(productIds));
  return await fetch(`/api/products?ids=${uniqueProductIds.join(",")}`, {
    method: "GET",
  }).then((res) => res.json());
}

export default function CartDetails() {
  const { data: session } = useSession();
  const user = session?.user;

  const router = useRouter();
  const { cartItems, updateQuantity, removeItem } = useCartStore();
  const [cartWithProductData, setCartWithProductData] = useState<
    CartItemRowType[]
  >([]);
  const [checkedItems, setCheckedItems] = useState<CartItemRowType[]>([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [totalOrderPrice, setTotalOrderPrice] = useState(0);

  const productIds = cartItems.map((item) => item.productId);

  const { data: products } = useQuery({
    queryKey: ["productsForCart"],
    queryFn: async () => await getProductsByIds(productIds),
  });

  useEffect(() => {
    if (products) {
      const fetchProductData = async () => {
        const mergedData: CartItemRowType[] = cartItems.map((item) => {
          const product = products.find(
            (p: FullProduct) => p.id === item.productId
          );
          if (!product)
            throw new Error(`Product not found for ID: ${item.productId}`);
          return { ...item, product };
        });
        setCartWithProductData(mergedData);
        setCheckedItems(mergedData);
      };

      fetchProductData();
    }
  }, [products, cartItems]);

  useEffect(() => {
    const totalPrice = checkedItems.reduce(
      (acc, item) =>
        acc +
        item.quantity *
          (item.product.discountRate
            ? getDiscountedPrice(item.product.price, item.product.discountRate)
            : item.product.price),
      0
    );
    setTotalOrderPrice(totalPrice);
  }, [checkedItems]);

  // 전체 선택/해제 핸들러
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsAllChecked(checked);
    setCheckedItems(checked ? [...cartWithProductData] : []);
  };

  // 개별 체크박스 핸들러
  const handleCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: CartItemRowType
  ) => {
    const checked = e.target.checked;
    setCheckedItems((prev) =>
      checked
        ? [...prev, item]
        : prev.filter((i) => i.productId !== item.productId)
    );
  };

  // 수량 변경 핸들러
  const handleUpdateQuantity = (id: string, delta: number) => {
    updateQuantity(id, delta);
    setCheckedItems((prev) =>
      prev.map((item) =>
        item.productId === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const shippingFee =
    totalOrderPrice > 0 ? (totalOrderPrice > 70000 ? 0 : 3000) : 0;
  const totalPaymentAmount = totalOrderPrice + shippingFee;

  return (
    <>
      <section className="hidden sm:grid sm:grid-cols-12 w-full border-y border-t-[3px] border-black py-3 font-semibold px-2">
        <input
          type="checkbox"
          checked={isAllChecked}
          onChange={handleSelectAll}
          className="w-5 h-5 mr-5"
        />
        <div className="col-span-5 text-center">상품정보</div>
        <div className="col-span-3 text-center">수량</div>
        <div className="col-span-3 text-center">주문금액</div>
      </section>
      <div className="sm:hidden flex gap-2 border-b-[3px] pb-3 border-black">
        <input
          type="checkbox"
          checked={isAllChecked}
          onChange={handleSelectAll}
          className="w-5 h-5 mr-5"
        />
        <span>전체선택</span>
      </div>
      <ul className="w-full">
        {cartWithProductData.map((item) => (
          <li
            className="flex px-2 items-center w-full border-b last:border-0"
            key={item.productId}
          >
            <input
              type="checkbox"
              checked={checkedItems.some((i) => i.productId === item.productId)}
              onChange={(e) => handleCheck(e, item)}
              className="w-5 h-5 mr-5 hidden sm:block"
            />
            <CartItemRow
              item={item}
              isChecked={checkedItems.some(
                (i) => i.productId === item.productId
              )}
              onCheck={(e) => handleCheck(e, item)}
              onUpdateQuantity={(delta) =>
                handleUpdateQuantity(item.productId, delta)
              }
              onDelete={() => removeItem(item.productId)}
            />
          </li>
        ))}
      </ul>
      <div>
        <div className="grid grid-cols-12 text-center text-sm font-bold border-y border-t-black border-t-[3px] py-4">
          <div className="col-span-4">총 주문금액</div>
          <div className="col-span-4">총 배송비</div>
          <div className="col-span-4">총 결제금액</div>
        </div>
        <div className="grid grid-cols-12 text-center py-4 border-b border-black">
          <div className="col-span-4 text-lg font-bold">
            {totalOrderPrice.toLocaleString()}원
          </div>
          <div className="col-span-4 text-lg font-bold">
            {totalOrderPrice > 0 ? shippingFee.toLocaleString() : 0}원
          </div>
          <div className="col-span-4 text-lg font-bold">
            {totalPaymentAmount.toLocaleString()}원
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-2 my-5">
        <ContinueShoppingButton />
        <CheckOutButton
          onClick={() => {
            if (!user) {
              alert("로그인 후 이용해주세요!");
              return;
            }
            router.push("/checkout");
          }}
          disabled={checkedItems.length === 0}
        />
      </div>
    </>
  );
}
