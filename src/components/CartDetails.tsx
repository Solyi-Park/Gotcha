"use client";
import { CartItem, CartItemRowType } from "@/model/cart";
import { FullUser } from "@/model/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CartItemRow from "./CartItemRow";
import { SimpleProduct } from "@/model/product";
import { getDiscountedPrice } from "@/utils/calculate";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart";
import ContinueShoppingButton from "./buttons/ContinueShoppingButton";
import CheckOutButton from "./buttons/CheckOutButton";
import { useRouter } from "next/navigation";
import { useCheckoutStore } from "@/store/checkout";

type Props = {
  user: FullUser;
  userCartData: CartItem[];
};

async function getProductsByIds(productIds: string[]) {
  const uniqueProductIds = Array.from(new Set(productIds));
  return await fetch(`/api/products?ids=${uniqueProductIds.join(",")}`, {
    method: "GET",
  }).then((res) => res.json());
}

export default function CartDetails({ user, userCartData }: Props) {
  const [checkedItems, setCheckedItems] = useState<CartItemRowType[]>([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [totalOrderPrice, setTotalOrderPrice] = useState(0);

  const { userCart, setUserCart } = useCartStore();
  const { setCheckoutItems } = useCheckoutStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  const productIds = userCartData.map((item) => item.productId);

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cartItems", user.id],
    queryFn: async () => await getProductsByIds(productIds),
    staleTime: 1000 * 60 * 30, // TODO: 수정
  });

  useEffect(() => {
    const cartItems: CartItemRowType[] = userCartData.map((item) => {
      const productData: SimpleProduct = products?.find(
        (product: SimpleProduct) => product?.id === item.productId
      );
      return {
        ...item,
        product: productData,
      };
    });

    const sortedCartItems = cartItems.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });
    setUserCart(sortedCartItems);
    queryClient.invalidateQueries({ queryKey: ["cartItems", user.id] });
  }, [userCartData, products, setUserCart]);

  useEffect(() => {
    const newTotalOrderPrice = checkedItems.reduce((total, item) => {
      const itemPrice =
        item.product &&
        item.quantity *
          getDiscountedPrice(item.product.price, item.product.discountRate);
      return total + itemPrice;
    }, 0);

    setTotalOrderPrice(newTotalOrderPrice);
  }, [checkedItems]);

  const shippingFee =
    totalOrderPrice > 0 ? (totalOrderPrice >= 70000 ? 0 : 3500) : 0;
  const totalPaymentAmount = totalOrderPrice + shippingFee;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsAllChecked(checked);
    setCheckedItems(checked ? [...userCart] : []);
  };

  const handleCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: CartItemRowType
  ) => {
    const checked = e.target.checked;
    setCheckedItems((prev) =>
      checked ? [...prev, item] : prev.filter((i) => i.id !== item.id)
    );
  };

  const handleUpdateQuantity = (item: CartItemRowType, delta: number) => {
    const newQuantity = item.quantity + delta;

    if (newQuantity > 0) {
      const updatedItem = { ...item, quantity: newQuantity };
      setCheckedItems((prev) =>
        prev.map((checkedItem) =>
          checkedItem.id === item.id ? updatedItem : checkedItem
        )
      );
      const updated = userCart.map((cartItem) =>
        cartItem.id === item.id ? updatedItem : cartItem
      );
      setUserCart(updated);

      queryClient.setQueryData(["cartItems", user.id], (old: any) =>
        old?.map((cartItem: CartItemRowType) =>
          cartItem.id === item.id ? updatedItem : cartItem
        )
      );
    }
  };

  return (
    <>
      <section className="hidden sm:grid sm:grid-cols-12 w-full border-y border-t-[3px] border-black  py-3 font-semibold px-2">
        <input
          type="checkbox"
          checked={isAllChecked}
          onChange={handleSelectAll}
          className="w-5 h-5 mr-5"
        />
        <div className="col-span-5 text-center">상품정보</div>
        <div className="col-span-3 text-center">수량</div>
        <div className="col-span-3  text-center">주문금액</div>
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
        {!isLoading &&
          products &&
          userCart &&
          userCart.map((item, index) => (
            <li
              className="flex px-2 items-center w-full border-b last:border-0"
              key={`${item.id}-${index}`}
            >
              <input
                type="checkbox"
                checked={checkedItems.some((i) => i.id === item.id)}
                onChange={(e) => handleCheck(e, item)}
                className="w-5 h-5 mr-5 hidden sm:block"
              />
              {item.product && (
                <CartItemRow
                  item={item}
                  isChecked={checkedItems.some((i) => i.id === item.id)}
                  onCheck={(e) => handleCheck(e, item)}
                  onUpdateQuantity={(delta) =>
                    handleUpdateQuantity(item, delta)
                  }
                />
              )}
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
            {shippingFee.toLocaleString()}원
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
            router.push("/checkout");
            setCheckoutItems(checkedItems);
          }}
          disabled={checkedItems.length === 0}
        />
      </div>
    </>
  );
}
