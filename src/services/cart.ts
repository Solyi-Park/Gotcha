import { supabase } from "@/app/lib/supabaseClient";
import { CartItem, NewCartItem } from "@/model/cart";
import { getOrderItemsByOrderId } from "./order";

type CartResponse = {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  option: { id: string; items: { name: string; value: string }[] };
};
// TODO: cartOptions 테이블을 따로 만들어야하나
export async function addProductsToCart(
  newCartItems: NewCartItem[]
): Promise<CartResponse[]> {
  console.log("newCartItems장바구니에 넣을거여", newCartItems);
  const res = await Promise.all(
    newCartItems.map(async (opt) => {
      const { data: existingCart, error: selectError } = await supabase
        .from("carts")
        .select("*")
        .eq("userId", opt.userId)
        .eq("productId", opt.productId)
        // 완전히 똑같은 구조와 값이여야 매칭. 순서나 공백까지  완벽하게 같아야하면 eq를씀. json문자열로 변환하여비교
        // contains를쓰면 좀더 유연함. 부분적인 일치를 매칭함. 특정 값만 포함되어있어도 됨. json 변환 필요 없음!
        .contains("option", opt.option ? opt.option : {})
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
            updatedAt: new Date(),
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
  console.log("장바구니에 담았어", res);

  return res;
}

export async function getCartItemsbyUserId(
  userId: string
): Promise<CartItem[]> {
  const { data, error } = await supabase
    .from("carts")
    .select("*")
    .eq("userId", userId)
    // .order("updatedAt", { ascending: false })
    .order("createdAt", { ascending: false });
  if (error) {
    console.error(error);
  }
  if (data) {
    // console.log("아이디로 장바구니 상품 찾음", data);
    return data as CartItem[];
  }
  return [];
}

export async function updateCartItemQuantity(
  itemId: string,
  newQuantity: number
) {
  return await supabase
    .from("carts")
    .update({ quantity: newQuantity, updatedAt: new Date() })
    .eq("id", itemId);
}

export async function deleteCartItem(itemId: string) {
  return await supabase.from("carts").delete().eq("id", itemId);
}

export async function clearCart(orderId: string) {
  const items = await getOrderItemsByOrderId(orderId);

  if (items && items.length > 0) {
    for (const item of items) {
      const { productId, options } = item;
      console.log("item", item.productId, JSON.stringify(options));

      const { error } = await supabase
        .from("carts")
        .delete()
        .eq("productId", productId)
        .contains("option", { items: options });

      if (error) {
        console.error(
          `카트아이템 삭제중 에러 발생(productId: ${productId}):`,
          error
        );
      }

      console.log(`카트아이템(${productId})이 정상적으로 삭제 됨)`);
    }
  } else {
    console.log("해당 주문에 대한 아이템을 찾을 수 없음");
  }
}
