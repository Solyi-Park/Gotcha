import { supabase } from "@/app/lib/supabaseClient";
import { CartOption } from "@/components/ProductHeader";
import { CartItem } from "@/model/cart";

type CartResponse = {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  options: { id: string; items: { name: string; value: string }[] };
};
// TODO: cartOptions 테이블을 따로 만들어야하나
export async function addProductsToCart(
  cartOptions: CartOption[]
): Promise<CartResponse[]> {
  const res = await Promise.all(
    cartOptions.map(async (opt) => {
      console.log("확인해보자", JSON.stringify(opt.option));
      const { data: existingCart, error: selectError } = await supabase
        .from("carts")
        .select("*")
        .eq("userId", opt.userId)
        .eq("productId", opt.productId)
        .eq("option", JSON.stringify(opt.option))
        .single();

      if (selectError && selectError.code !== "PGRST116") {
        console.error("selectError", selectError);
        throw new Error(selectError.message);
      }

      if (existingCart) {
        console.log("똑같은 거 있어!", existingCart);
        const { data: updatedCart, error: updateError } = await supabase
          .from("carts")
          .update({
            quantity: existingCart.quantity + opt.quantity,
            updatedAt: new Date().toISOString(),
          })
          .eq("id", existingCart.id)
          .select("*")
          .single();

        if (updateError) {
          console.error(updateError);
          throw new Error(updateError.message);
        }

        return updatedCart as CartResponse;
      }

      const { data, error } = await supabase
        .from("carts")
        .insert({
          userId: opt.userId,
          productId: opt.productId,
          quantity: opt.quantity,
          option: opt.option,
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

export async function getCartItemsbyUserId(
  userId: string
): Promise<CartItem[]> {
  const { data, error } = await supabase
    .from("carts")
    .select("*")
    .eq("userId", userId);
  if (error) {
    console.error(error);
  }
  if (data) {
    // console.log("아이디로 장바구니 상품 찾음", data);
    return data as CartItem[];
  }
  return [];
}
