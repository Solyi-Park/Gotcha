import { supabase } from "@/app/lib/supabaseClient";
import { categories } from "@/data/categories";
import {
  ProductForCart,
  FullProduct,
  newProduct,
  SimpleProduct,
} from "@/model/product";

export async function addProduct(
  newProduct: newProduct
): Promise<FullProduct[] | null> {
  const newFullProduct = {
    ...newProduct,
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
// New
export async function getNewProducts(): Promise<FullProduct[]> {
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
        .select(
          "createdAt, name, price, thumbnailUrls, likes ,discountRate, id"
        )
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

export async function getProductById(id: string): Promise<FullProduct> {
  console.log("id?????", id);
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  // if (error) {
  //   return new Error("Error fetching product by ID");
  // }

  if (!data) {
    console.log('"Product not found');
    // throw new Error("Product not found");
  }
  return data;
}

export async function getProductsByIds(productIds: string[]) {
  const res = await Promise.all(
    productIds.map(async (id) => {
      const { data, error } = await supabase
        .from("products")
        .select("name, price,thumbnailUrls, discountRate,id")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
      }

      if (!data) {
        console.log("Products not found");
      }

      return data;
    })
  );

  console.log("getProductsByIds", res);
  return res;
}

//상품가져오기 갯수, 페이지네이션
//large로 가져와서 하위카테고리 클릭시 가져온 상품리스트에서 필터링해야하나
export async function getProductsByCode(
  mediumCode: string | null,
  smallCode: string | null
): Promise<FullProduct[]> {
  console.log("mediumCode", mediumCode);
  console.log("smallCode", smallCode);
  let query = supabase.from("products").select("*");

  if (smallCode) {
    query = query.eq("categoryCode", smallCode);
  }
  if (!smallCode && mediumCode) {
    const code = mediumCode.substring(0, 2);
    query = query.like("categoryCode", `${code}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching products by code:", error);
    return [];
  }
  return data;
}

export type SearchResults = {
  products: FullProduct[];
  totalCount: number;
};

export async function getProductsBySearchKeyword(
  keyword: string
): Promise<SearchResults> {
  const { data, error } = await supabase.rpc("search_products_by_keyword", {
    keyword,
  });

  if (error) {
    console.error(error);
    return { products: [], totalCount: 0 };
  }

  if (data) {
    const { total_count, products } = data[0];

    return { products, totalCount: total_count } as SearchResults;
  }

  return { products: [], totalCount: 0 };
}

// const { data, error } = await supabase
//   .from("products")
//   .select("*")
//   .or(
//     `name.ilike.%${keyword}%,description.ilike.%${keyword}%,tags.cs.{${keyword}}`
//   );

export async function updateLikes(
  productId: string,
  userId: string
): Promise<FullProduct | null> {
  const { data: productData, error: productError } = await supabase
    .from("products")
    .select("likes")
    .eq("id", productId);
  if (productError) {
    console.error("Error fetching product data:", productError);
  }

  if (!productData) return null;

  const likes = productData[0].likes;
  const updatedLikes = likes?.includes(userId)
    ? likes.filter((uid: string) => uid !== userId)
    : [...likes, userId];

  const { data: updateData, error: updateError } = await supabase
    .from("products")
    .update({ likes: updatedLikes })
    .eq("id", productId)
    .select("likes");

  if (updateError) {
    console.error("Error fetching update data:", updateError);
  }

  if (updateData) {
    console.log("update했엉", updateData);
    return updateData[0] as FullProduct;
  }
  return null;
}
