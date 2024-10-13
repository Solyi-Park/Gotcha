"use client";
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
  console.log("searchResult", searchResult);

  return (
    <div>
      {!keyword && keyword?.length === 0 && (
        <div>
          <p>검색 결과가 없습니다.</p>
          <p>다른 검색어를 입력하시거나 철자와 띄어쓰기를 확인해보세요.</p>
        </div>
      )}
      {isLoading && <p>Loading...</p>}
      {isError && (
        <p className="text-rose-500 font-sm">
          검색 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
        </p>
      )}
      {keyword && searchResult && (
        <>
          <div className="flex justify-between">
            <p className="text-sm">
              총 <span className="font-bold">{searchResult?.totalCount}</span>
              개의 상품
            </p>

            {/* TODO:커스텀 드롭다운만들기 */}
            <select name="filter" id="">
              <option value="">신상품순</option>
              <option value="">리뷰많은순</option>
              <option value="">낮은가격순</option>
              <option value="">높은가격순</option>
              <option value="">높은할인순</option>
              <option value="">좋아요많은순</option>
              <option value="">판매순</option>
            </select>
          </div>

          <ul className="grid grid-cols-4">
            {searchResult.totalCount > 0 &&
              searchResult.products.map((result: FullProduct) => (
                <li key={result.id}>
                  <Link href={`products/${result.id}`}>
                    <VerticalProductCard product={result} />
                  </Link>
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
}
