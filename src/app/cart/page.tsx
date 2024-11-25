"use client";
import CartDetails from "@/components/CartDetails";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { CartItem } from "@/model/cart";
import ContinueShoppingButton from "@/components/buttons/ContinueShoppingButton";

async function fetchUserCart(userId: string) {
  const res = await fetch(`/api/cart?userId=${userId}`);
  if (!res.ok) {
    throw new Error(`Error: ${res.statusText}`);
  }
  const data = (await res.json()) as CartItem[];
  return data;
}

export default function CartPage() {
  //TODO: user 정보 캐시해야하는곳확인하기

  const { data: session } = useSession();
  const user = session?.user;

  const { data: userCartData, isLoading } = useQuery({
    queryKey: ["userCart", user?.id],
    queryFn: async () => {
      if (user) {
        return await fetchUserCart(user?.id);
      }
    },
    staleTime: 1000 * 60 * 30,
  });

  return (
    <div className="my-10">
      {/* isLoading일때 로딩스피너 */}
      {!isLoading && userCartData && userCartData.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full gap-10">
          <p className="text-4xl">장바구니에 담은 상품이 없습니다.</p>
          <ContinueShoppingButton />
        </div>
      )}
      {!isLoading && user && userCartData && userCartData.length > 0 && (
        <CartDetails user={user} userCartData={userCartData} />
      )}
    </div>
  );
}
