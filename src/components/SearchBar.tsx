"use client";
import { useState } from "react";
import SearchIcon from "./icons/SearchIcon";
import { useRouter } from "next/navigation";

export default function SearchBar({ onClose }: { onClose?: () => void }) {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(
      `/search?keyword=${keyword}&sort=NEW&defaultSort=NEW&sortOrder=DESC`
    );
    if (onClose) onClose();
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex justify-center items-center p-2 rounded-3xl transition-all duration-500 w-full border"
    >
      <button type="submit" className="text-xl">
        <SearchIcon size="medium" />
      </button>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="outline-none w-full sm:block ml-2"
      />
    </form>
  );
}
