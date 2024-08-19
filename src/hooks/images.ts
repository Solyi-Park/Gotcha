"use client";
import { supabase } from "@/app/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function useImageUpload(files: File[]) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    files.forEach((file) => uploadFile(file));
  }, [files]);

  async function uploadFile(file: File) {
    try {
      setIsUploading(true);
      const { data, error } = await supabase.storage
        .from("gotcha")
        .upload(`/products/${Date.now()}_${file.name}`, file);
      if (error) {
        console.error(error);
        setIsUploading(false);
        setError(error.message);
      } else {
        const imagePath = data?.path;
        if (imagePath) {
          const {
            data: { publicUrl },
          } = supabase.storage.from("gotcha").getPublicUrl(imagePath);
          if (publicUrl) {
            setImageUrls((prev) => [...prev, publicUrl]);
            setIsUploading(false);
          }
        }
      }
    } catch (error) {
      console.error(error);
      setIsUploading(false);
    }
  }

  return { imageUrls, isUploading, error };
}
