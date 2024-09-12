"use client";
import CategorySideBar from "@/components/CategorySideBar";
import FilteredProductList from "@/components/FilteredProductList";
import { useSearchParams } from "next/navigation";

export default function CategoryPage() {
  const params = useSearchParams();
  const largeCode = params.get("categoryLargeCode");
  const mediumCode = params.get("categoryMediumCode");
  const smallCode = params.get("categorySmallCode");
  return (
    <div className="flex">
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
