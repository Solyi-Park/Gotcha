"use client";
import CategoryBar from "./CategoryBar";
import { categories } from "@/data/categories";

export default function SaleCategoryBar() {
  const largeCategories = categories.map((largeCategory) => largeCategory.name);
  return (
    <>
      <CategoryBar layout="horizontal" categories={largeCategories} />
    </>
  );
}
