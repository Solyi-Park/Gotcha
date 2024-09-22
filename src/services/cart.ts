import { supabase } from "@/app/lib/supabaseClient";
import { CartOption } from "@/components/ProductHeader";

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
  const responses = await Promise.all(
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

  return responses;
}
