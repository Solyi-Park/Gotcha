import { supabase } from "@/app/lib/supabaseClient";
import { CartOption } from "@/components/ProductHeader";
import { Cart } from "@/model/cart";

type CartResponse = {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  options: string[];
};
export async function addProductsToCart(
  cartOptions: CartOption[]
): Promise<CartResponse[]> {
  const res = await Promise.all(
    cartOptions.map(async (opt) => {
      const { data, error } = await supabase
        .from("carts")
        .insert({
          userId: opt.userId,
          productId: opt.productId,
          quantity: opt.quantity,
          options: opt.optionItems,
          updatedAt: null,
        })
        .select("*")
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data as CartResponse;
    })
  );

  return res;
}

export async function getCartItemsbyUserId(userId: string): Promise<Cart[]> {
  const { data, error } = await supabase
    .from("carts")
    .select("*")
    .eq("userId", userId);
  if (error) {
    console.error(error);
  }
  if (data) {
    // console.log("아이디로 장바구니 상품 찾음", data);
    return data as Cart[];
  }
  return [];
}
