"use client";
import { categories } from "@/data/categories";
import { useEffect, useState } from "react";

export default function useCategoryCode(
  large: string,
  medium: string,
  small: string
) {
  const [categoryCode, setCategoryCode] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategoryCode(
      largeName: string,
      mediumName: string,
      smallName: string
    ) {
      const foundCategory = categories.find((item) => {
        if (smallName) {
          return item.name === smallName;
        }
        if (!smallName && mediumName) {
          return item.name === mediumName;
        }
        if (!smallName && !mediumName && largeName) {
          return item.name === largeName;
        }
      });
      if (foundCategory) {
        setCategoryCode(foundCategory.code);
      }
    }

    fetchCategoryCode(large, medium, small);
  }, [large, medium, small]);

  return categoryCode;
}

// try {
//   const queryString = `categoryLargeName=${large}& categoryMediumName=${medium}$categorySmallName=${small}`;
//   if (large) {
//     const res = await fetch(`/api/category?${queryString}`, {
//       method: "GET",
//     }).then((res) => res.json());
//     if (res.length > 0) {
//       const foundCategoryId = res[0];
//       setCategoryId(foundCategoryId);
//     }
//   }
// } catch (error) {
//   console.error("Failed to find categoryId: ", error);
//   setCategoryId(null);
// }
