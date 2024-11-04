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
export async function getNewProducts(): Promise<SimpleProduct[] | null> {
  const { data, error } = await supabase
    .from("products")
    .select(
      "name, price, thumbnailUrls,createdAt, discountRate, id, description,likeCount, likes"
    )
    .order("createdAt", { ascending: false })
    .limit(10)
    .returns<SimpleProduct[]>();
  if (error) {
    console.error("Failed to get products data", error);
    return [];
  }
  if (data) {
    return data;
  }

  return null;
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
      const { data: products, error } = await supabase
        .from("products")
        .select(
          "createdAt, name, price, thumbnailUrls, description, discountRate, id, likeCount, likes"
        )
        .like("categoryCode", `${category.code.split("")[0]}%`)
        .gt("discountRate", 0)
        .order("createdAt", { ascending: false })
        .limit(10)
        .returns<SimpleProduct[]>();

      if (error) {
        console.error("Error fetching products:", error);
        return { name: category.name, products: [] };
      }
      if (products) {
        return { name: category.name, products };
      }

      return { name: category.name, products: [] };
    })
  );
  return results;
}

export async function getProductById(id: string): Promise<FullProduct | null> {
  const { data, error } = await supabase
    .from("products")
    .select()
    .eq("id", id)
    .returns<FullProduct>()
    .single();

  if (error) {
    throw new Error("Error fetching product by ID");
  }
  if (data) {
    return data;
  }
  return null;
}

export async function getProductsByIds(
  productIds: string[]
): Promise<SimpleProduct[] | null> {
  const { data: products, error } = await supabase
    .from("products")
    .select(
      "createdAt, name, price, thumbnailUrls, description, discountRate, id, likeCount"
    )
    .in("id", productIds)
    .returns<SimpleProduct[]>();

  if (error) {
    console.error(error);
  }
  if (!products || products.length === 0) {
    console.log("해당 아이디로 상품을 찾을 수 없음.");
    return null;
  }
  return products;
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

  const { data, error } = await query.returns<FullProduct[]>();

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

type LikeData = {
  likes: string[];
  likeCount: number;
};

export async function updateLikes(
  productId: string,
  userId: string
): Promise<LikeData | null> {
  console.log(`userId: ${userId}`);
  console.log(`productId: ${productId}`);

  const { data, error: productError } = await supabase
    .from("products")
    .select()
    .eq("id", productId)
    .returns<FullProduct[]>();

  if (productError) {
    console.error("Error fetching product data:", productError);
  }
  if (!data) {
    throw new Error("Not Found Product for given id");
  }

  const likes = data[0].likes;
  const likeCount = data[0].likeCount;

  const liked = likes?.includes(userId);
  const updatedLikeData = {
    likes: liked
      ? likes.filter((uid: string) => uid !== userId)
      : [...likes, userId],
    likeCount: liked ? likeCount - 1 : likeCount + 1,
  };

  const { data: updateData, error: updateError } = await supabase
    .from("products")
    .update(updatedLikeData)
    .eq("id", productId)
    .select("likes, likeCount");

  if (updateError) {
    console.error("Error fetching update data:", updateError);
  }

  if (updateData) {
    console.log("update했엉", updateData);
    return updateData[0] as FullProduct;
  }
  return null;
}

export async function getLikedProductsOfUser(
  userId: string
): Promise<FullProduct[] | null> {
  console.log("현재사용자", userId);
  const { data, error } = await supabase
    .from("products")
    .select()
    .contains("likes", [userId])
    .order("createdAt", { ascending: true });
  if (error) {
    console.error("Error fetching liked products.", error);
  }
  if (data) {
    // console.log("좋아요 data", data);
    return data;
  }
  return null;
}
