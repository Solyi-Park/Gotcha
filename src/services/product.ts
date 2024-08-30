import { supabase } from "@/app/lib/supabaseClient";
import { categories } from "@/data/categories";

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

export type SaleProductsResponse = {
  name: string;
  products: SimpleProduct[];
};

export async function getSaleProducts(): Promise<SaleProductsResponse[]> {
  const largeCategories = categories
    .filter((item) => item.type === "large")
    .map((item) => ({ name: item.name, code: item.code }));

  const results = await Promise.all(
    largeCategories.map(async (category): Promise<SaleProductsResponse> => {
      const { data, error } = await supabase
        .from("products")
        .select("createdAt, name, price, thumbnailUrls, likes ,discountRate")
        .like("categoryCode", `${category.code.split("")[0]}%`)
        .gt("discountRate", 0)
        .order("createdAt", { ascending: false })
        .limit(10);

      if (error) {
        console.error("Error fetching products:", error);
        return { name: category.name, products: [] };
      }

      return { name: category.name, products: data as SimpleProduct[] };
    })
  );
  return results;
}
