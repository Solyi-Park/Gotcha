"use client";
import { Cart } from "@/model/cart";
import { SimpleUser } from "@/model/user";
import { useQuery } from "@tanstack/react-query";

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
  //   const products = await getProductsByIds(productIds);
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cartItems", user.id],
    queryFn: async () => await getProductsByIds(productIds),
    staleTime: 1000 * 60 * 30, // TODO: 수정
  });

  return (
    <ul>
      {productIds.map((id, index) => (
        <li key={`${id}-${index}`}></li>
      ))}
    </ul>
  );
}
