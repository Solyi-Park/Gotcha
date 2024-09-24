"use client";
import { CartItem, CartItemRowType } from "@/model/cart";
import { SimpleUser } from "@/model/user";
import { useQuery } from "@tanstack/react-query";
import CartItemRow from "./CartItemRow";
import { SimpleProduct } from "@/model/product";
import { getDiscountedPrice } from "@/utils/calculate";
import { useEffect } from "react";
import { useUserCart } from "@/store/cart";

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
  const { userCart, setUserCart } = useUserCart();
  console.log("userCart??", userCart);
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
        (product: SimpleProduct) => product.id === item.productId
      );
      return {
        ...item,
        product: productData,
      };
    });
    setUserCart(cartItems);
  }, [userCartData, products, setUserCart]);

  const totalPrice = userCart.reduce((acc, item) => {
    const itemPrice =
      products &&
      item.quantity *
        getDiscountedPrice(item.product?.price, item.product?.discountRate);
    return acc + itemPrice;
  }, 0);
  console.log("totalPrice=====>", totalPrice);
  if (userCart) {
    console.log("userCart?", userCart);
  }
  return (
    <ul>
      {!isLoading &&
        products &&
        userCart &&
        userCart.map((item, index) => (
          <li className="flex items-center" key={`${item.id}-${index}`}>
            <input type="checkbox" />
            <CartItemRow item={item} />
          </li>
        ))}
    </ul>
  );
}
