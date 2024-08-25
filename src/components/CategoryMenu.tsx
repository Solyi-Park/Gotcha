"use client";
import { categories } from "@/data/categories";
import { useState } from "react";
import CategoryDropdown from "./CategoryDropdown";

export default function CategoryMenu() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  return (
    <nav className="hidden sm:flex ">
      <ul className="flex justify-around sm:w-[500px] lg:w-[600px] px-5">
        {categories
          .filter((category) => category.type === "large")
          .map((largeCategory) => (
            <li
              className="font-bold hover:border-black hover:border-b-4 hover:cursor-pointer"
              key={largeCategory.name}
              onMouseEnter={() => setHoveredCategory(largeCategory.name)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {largeCategory.name.toUpperCase()}
              {hoveredCategory === largeCategory.name && (
                <ul className=" grid grid-cols-5 absolute left-0 w-full p-5 pb-10 mt-1 px-14 border-t bg-white z-10">
                  {largeCategory.subcategories.map((mediumCategory) => (
                    //TODO: 중분류 카테고리 호버상태에서 벗어날때 원래 폰트굵기 원래대로 돌아가기
                    <li className="text-sm font-semibold hover:font-extrabold">
                      {mediumCategory.name}
                      {" >"}
                      <ul>
                        {mediumCategory.subcategories.map((smallCategory) => (
                          <li className="font-normal text-sm mt-[5px] hover:font-bold">
                            {smallCategory.name}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </nav>
  );
}
