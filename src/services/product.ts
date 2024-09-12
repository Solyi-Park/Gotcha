import { supabase } from "@/app/lib/supabaseClient";
import { categories } from "@/data/categories";
import { FullProduct, newProduct, SimpleProduct } from "@/model/product";

export async function addProduct(newProduct: newProduct) {
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
  return data as FullProduct;
}

//상품가져오기 갯수, 페이지네이션
//large로 가져와서 하위카테고리 클릭시 가져온 상품리스트에서 필터링해야하나
export async function getProductsByCode(
  mediumCode: string | null,
  smallCode: string | null
) {
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
  try {
    const { data } = await query;
    if (data) {
      console.log("data==>", data);
    }
    return data as FullProduct[];
  } catch (error) {
    console.error(error);
  }

  return [];
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
