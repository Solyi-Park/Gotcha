"use client";
import { CartItem, CartItemRowType } from "@/model/cart";
import { SimpleUser } from "@/model/user";
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
  user: SimpleUser;
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
  const { userCart, setUserCart } = useCartStore();
  const { setCheckoutItems } = useCheckoutStore();
  const queryClient = useQueryClient();
  const router = useRouter();
  console.log("checkedItems", checkedItems);

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
    setCheckedItems(userCart);
  }, [userCart]);

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

  const totalOrtderPrice = userCart.reduce((total, item) => {
    const itemPrice =
      products &&
      item.quantity *
        getDiscountedPrice(item.product?.price, item.product?.discountRate);
    return total + itemPrice;
  }, 0);
  const shippingFee = totalOrtderPrice >= 70000 ? 0 : 3500;
  const totalPaymentAmount = totalOrtderPrice + shippingFee;

  return (
    <>
      <ul>
        {!isLoading &&
          products &&
          userCart &&
          userCart.map((item, index) => (
            <li className="flex items-center" key={`${item.id}-${index}`}>
              <input
                type="checkbox"
                checked={checkedItems.some((i) => i.id === item.id)}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setCheckedItems((prev) => {
                    return checked
                      ? [...prev, item]
                      : prev.filter((i) => i.id !== item.id);
                  });
                }}
              />
              <CartItemRow item={item} />
            </li>
          ))}
      </ul>
      <div>
        <span>
          총 주문금액:
          {totalOrtderPrice ? totalOrtderPrice.toLocaleString() : 0}원
        </span>
        <span>
          총 배송비:{" "}
          {totalOrtderPrice && shippingFee ? shippingFee.toLocaleString() : 0}원
        </span>
        <span>
          총 결제금액:
          {totalOrtderPrice && totalPaymentAmount
            ? totalPaymentAmount.toLocaleString()
            : 0}
          원
        </span>
      </div>
      <div className="flex gap-2">
        <ContinueShoppingButton />
        <CheckOutButton
          onClick={() => {
            router.push("/checkout");
            setCheckoutItems(checkedItems);
          }}
        />
      </div>
    </>
  );
}
