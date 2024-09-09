import { supabase } from "@/app/lib/supabaseClient";

export async function uploadProductImage(file: File) {
  try {
    const { data, error } = await supabase.storage
      .from("gotcha")
      .upload(`/products/${Date.now()}_${file.name}`, file);
    if (error) {
      console.error(error);
    } else {
      const imagePath = data?.path;
      if (imagePath) {
        const {
          data: { publicUrl },
        } = supabase.storage.from("gotcha").getPublicUrl(imagePath);
        if (publicUrl) {
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export async function uploadThumbnailImage(file: File) {
  try {
    const { data, error } = await supabase.storage
      .from("gotcha")
      .upload(`/products/thumbnails/${Date.now()}_${file.name}`, file);
    if (error) {
      console.error(error);
    } else {
      const imagePath = data?.path;
      if (imagePath) {
        const {
          data: { publicUrl },
        } = supabase.storage.from("gotcha").getPublicUrl(imagePath);
        if (publicUrl) {
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}
