"use client";
import SearchBar from "./SearchBar";

export default function SearchModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="sm:hidden fixed inset-0 bg-white/95 overflow-y-auto z-50">
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-4 text-gray-500 hover:text-black"
        >
          닫기
        </button>
        <div className="flex w-[450px] p-4">
          <SearchBar onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
