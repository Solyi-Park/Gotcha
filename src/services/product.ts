import { supabase } from "@/app/lib/supabaseClient";

export async function addProduct(newProduct: newProduct) {
  const newFullProduct = {
    ...newProduct,
    coupon: null,
    updatedAt: null,
  };
  const { data, error } = await supabase
    .from("products")
    .insert(newFullProduct)
    .select();
  if (error) {
    console.error("Failed to add new product", error);
    return null;
  }
  if (data && data.length > 0) {
    console.log("New product data:", data);
    return data;
  }
  return null;
}
