"use client";
import { categories } from "@/data/categories";
import { useCategory } from "@/provider/CategoryProviderForSaleProducts";

type Props = {
  layout: "vertical" | "horizontal";
};
export default function CategoryBar({ layout }: Props) {
  const { activeTab, setActiveTab } = useCategory();

  return (
    <ul
      className={`flex justify-around sm:mb-2 ${
        layout === "vertical" && "flex-col"
      }`}
    >
      <li
        key="category-all-products"
        className={`${
          activeTab === "all" && "font-bold"
        } hover:cursor-pointer text-sm`}
        onClick={() => setActiveTab("all")}
      >
        all
      </li>
      {layout === "horizontal" &&
        categories.map((largeCategory) => (
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
