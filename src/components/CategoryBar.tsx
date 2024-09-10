"use client";
import { categories } from "@/data/categories";
import { useCategory } from "@/provider/categoryProvider";
import { useState } from "react";

export default function CategoryBar() {
  const { activeTab, setActiveTab } = useCategory();

  return (
    <ul className="flex justify-around sm:mb-2">
      <li
        key="category-all-products"
        className={`${
          activeTab === "all" && "font-bold"
        } hover:cursor-pointer text-sm`}
        onClick={() => setActiveTab("all")}
      >
        all
      </li>
      {categories
        .filter((category) => category.type === "large")
        .map((largeCategory) => (
          <li
            className={`${
              activeTab === largeCategory.name && "font-bold"
            } text-sm hover:cursor-pointer`}
            key={largeCategory.name}
            onClick={(e) => setActiveTab(largeCategory.name)}
          >
            {largeCategory.name}
          </li>
        ))}
    </ul>
  );
}
