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

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(10);
  if (error) {
    console.error("Failed to get products data", error);
    return [];
  }

  return data;
}

export async function getProductsByCategory(categoryCode: number) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .like("categoryCode", `${categoryCode}%`)
    .order("createdAt", { ascending: false })
    .limit(3);
  if (error) {
    console.error("Failed to get products data by category", error);
    return [];
  }

  return data;
}
