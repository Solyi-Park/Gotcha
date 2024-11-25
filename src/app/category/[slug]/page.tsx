"use client";
import CategorySideBar from "@/components/CategorySideBar";
import FilteredProductList from "@/components/FilteredProductList";
import useCategoryParams from "@/hooks/params";
import { useSearchParams } from "next/navigation";

export default function CategoryPage() {
  const { largeCode, mediumCode, smallCode } = useCategoryParams();
  return (
    <div className="flex my-6">
      <CategorySideBar
        largeCode={largeCode}
        mediumCode={mediumCode}
        smallCode={smallCode}
      />
      <FilteredProductList
        largeCode={largeCode}
        mediumCode={mediumCode}
        smallCode={smallCode}
      />
    </div>
  );
}
