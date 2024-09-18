"use client";
import { useSearchParams } from "next/navigation";

export default function useCategoryParams() {
  const params = useSearchParams();
  const largeCode = params.get("categoryLargeCode");
  const mediumCode = params.get("categoryMediumCode");
  const smallCode = params.get("categorySmallCode");

  return { largeCode, mediumCode, smallCode };
}
