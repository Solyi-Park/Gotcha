import LoadingSpinner from "@/components/LoadingSpinner";
import SearchResult from "@/components/SearchResult";
import { Suspense } from "react";

export default function SearchResultPage() {
  return (
    <Suspense
      fallback={
        <div className="flex py-16 items-center">
          <LoadingSpinner />
        </div>
      }
    >
      <SearchResult />
    </Suspense>
  );
}
