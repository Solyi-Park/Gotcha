"use client";
import { useMainCategoryStore } from "@/store/category";
import CategoryBar from "./CategoryBar";
import { categories } from "@/data/categories";

export default function CategorySideBar() {
  const activeTab = useMainCategoryStore((state) => state.activeTab);
  const setActiveTab = useMainCategoryStore((state) => state.setActiveTab);
  const subCategories = categories
    .find((largeCategory) => largeCategory.name === activeTab.large)
    ?.subcategories.find(
      (mediumCategory) => mediumCategory.name === activeTab.medium
    )?.subcategories;

  const onClickSmallCategory = (category: string) => {
    const newActiveTab = {
      ...activeTab,
      small: category,
    };
    setActiveTab(newActiveTab);
  };
  console.log("subCategories:", subCategories);
  console.log("activeCategory:", activeTab);
  return (
    <div className="w-48 bg-red-200">
      <h2
        className={`${activeTab.large && "font-bold border-b-4 border-black"}`}
      >
        {activeTab.large === "women" && <span>여성</span>}
        {activeTab.large === "men" && <span>남성</span>}
        {activeTab.medium}
      </h2>
      <ul>
        {subCategories?.map((small) => (
          <li
            key={small.name}
            onClick={() => onClickSmallCategory(small.name)}
            className={`${
              activeTab.small === small.name && "font-bold"
            } hover:cursor-pointer`}
          >
            {small.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
