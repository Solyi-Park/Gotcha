"use client";
import { categories } from "@/data/categories";
import { useSaleCategory } from "@/provider/CategoryProviderForSaleProducts";

type Props = {
  layout: "vertical" | "horizontal";
  categories: string[];
};
export default function CategoryBar({ layout, categories }: Props) {
  const { activeTab, setActiveTab } = useSaleCategory();
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
        categories.map((category) => (
          <li
            className={`${
              activeTab === category && "font-bold"
            } text-sm hover:cursor-pointer`}
            key={category}
            onClick={(e) => setActiveTab(category)}
          >
            {category}
          </li>
        ))}
    </ul>
  );
}
