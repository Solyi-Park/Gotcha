"use client";
import { Cart, CartItemRowType } from "@/model/cart";
import { SimpleUser } from "@/model/user";
import { useQuery } from "@tanstack/react-query";
import CartItemRow from "./CartItemRow";
import { SimpleProduct } from "@/model/product";
import { CartOption } from "./ProductHeader";

type Props = {
  user: SimpleUser;
  userCart: Cart[];
};

async function getProductsByIds(productIds: string[]) {
  const uniqueProductIds = Array.from(new Set(productIds));
  return await fetch(`/api/products?ids=${uniqueProductIds.join(",")}`, {
    method: "GET",
  }).then((res) => res.json());
}

export default function CartDetails({ user, userCart }: Props) {
  const productIds = userCart.map((item) => item.productId);

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cartItems", user.id],
    queryFn: async () => await getProductsByIds(productIds),
    staleTime: 1000 * 60 * 30, // TODO: 수정
  });

  const cartItems: CartItemRowType[] = userCart.map((item) => {
    const productData: SimpleProduct = products?.find(
      (product: SimpleProduct) => product.id === item.productId
    );

    return {
      id: item.id,
      quantity: item.quantity,
      option: {
        id: item.option.id,
        items: item.option.items,
      },
      product: productData,
    };
  });

  return (
    <ul>
      {products &&
        cartItems.map((item, index) => (
          <li key={`${item.id}-${index}`}>
            <CartItemRow item={item} product={item.product} />
          </li>
        ))}
    </ul>
  );
}
