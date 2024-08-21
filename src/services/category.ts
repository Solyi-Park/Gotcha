import { supabase } from "@/app/lib/supabaseClient";

export async function getCategories() {
  return supabase.from("categories").select("*");
}

export async function findCategoryId(
  largeName: string | null,
  mediumName: string | null,
  smallName: string | null
) {
  let query = supabase.from("categories").select("id");
  if (smallName) {
    query = query.eq("name", smallName);
  }
  if (!smallName && mediumName) {
    query = query.eq("name", mediumName);
  }
  if (!smallName && !mediumName && largeName) {
    query = query.eq("name", largeName);
    try {
      const { data } = await query;
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}
