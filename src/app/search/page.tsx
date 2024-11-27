"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import ProductListGrid from "@/components/ProductListGrid";
import SearchBar from "@/components/SearchBar";
import VerticalProductCard from "@/components/VerticalProductCard";
import { FullProduct } from "@/model/product";
import { SearchResults } from "@/services/product";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchResultPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const params = useSearchParams();

  const keyword = params.get("keyword")?.trim();
  // const sort = params.get("sort");
  // const defaultSort = params.get("defaultSort");
  // const sortOrder = params.get("sortOrder");
  const {
    data: searchResult,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["searchResult", keyword],
    queryFn: async () => {
      const res = await fetch(`/api/search?keyword=${keyword}`);
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }
      const data = await res.json();
      return data;
    },
    staleTime: 1000 * 60 * 10,
    enabled: !!keyword,
  });
  // console.log("searchResult", searchResult);

  return (
    <div>
      <div className="sm:m-4">
        {keyword && (
          <h1 className="text-xl font-bold">
            "<span className="text-rose-600">{keyword}</span>" 검색 결과
          </h1>
        )}
      </div>
      {isLoading && (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      )}
      {isError && (
        <div className="flex flex-col items-center py-10">
          <p className="text-rose-500 font-sm">
            검색 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
          </p>
        </div>
      )}

      <div className="flex justify-between items-center sm:px-4 my-5">
        <p>
          총<span className="font-bold ml-1">{searchResult?.totalCount}</span>
          개의 상품
        </p>

        {/* TODO:커스텀 드롭다운 */}
        <select
          name="filter"
          className="text-sm bg-neutral-100 px-3 py-2 rounded-2xl"
        >
          <option value="">신상품순</option>
          <option value="">리뷰많은순</option>
          <option value="">낮은가격순</option>
          <option value="">높은가격순</option>
          <option value="">높은할인순</option>
          <option value="">좋아요많은순</option>
          <option value="">판매순</option>
        </select>
      </div>
      {keyword && searchResult?.totalCount > 0 && (
        <ProductListGrid products={searchResult.products} />
      )}
      {keyword && searchResult?.totalCount === 0 && (
        <div className="flex flex-col items-center py-10 gap-5">
          <p className="text-2xl">검색 결과가 없습니다.</p>
          <p>다른 검색어를 입력하시거나 철자와 띄어쓰기를 확인해보세요.</p>
        </div>
      )}
    </div>
  );
}
