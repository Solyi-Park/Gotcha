"use client";
import { useState } from "react";
import SearchIcon from "./icons/SearchIcon";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  return (
    <div className="flex justify-center items-center p-2 rounded-3xl transition-all duration-500 w-10 sm:w-[320px]  sm:border">
      <button
        className="text-xl"
        onClick={() => {
          router.push(
            `/search?keyword=${keyword}&sort=NEW&defaultSort=NEW&sortOrder=DESC`
          );
        }}
      >
        <SearchIcon size="medium" />
      </button>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="outline-none w-full hidden sm:block md:ml-2"
      />
    </div>
  );
}
