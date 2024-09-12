"use client";
import { categories } from "@/data/categories";
import { useRouter } from "next/navigation";
import { findParentCategories } from "@/utils/categories";

type Props = {
  largeCode: string | null;
  mediumCode: string | null;
  smallCode: string | null;
};

export default function CategorySideBar({
  largeCode,
  mediumCode,
  smallCode,
}: Props) {
  const router = useRouter();

  // const activeTab = useMainCategoryStore((state) => state.activeTab);
  // const setActiveTab = useMainCategoryStore((state) => state.setActiveTab);

  const largeCategory = categories.find(
    (category) => category.code === largeCode
  );
  const mediumCategory = largeCategory?.subcategories.find(
    (subCategory) => subCategory.code === mediumCode
  );

  const onClickItem = (smallCategoryCode: string) => {
    const parentCode = findParentCategories(smallCategoryCode);
    router.push(
      `/category/list?categoryLargeCode=${parentCode.largeCategory}&categoryMediumCode=${parentCode.mediumCategory}&categorySmallCode=${smallCategoryCode}`
    );
    // const newActiveTab = {
    //   ...activeTab,
    //   small: category,
    // };
    // setActiveTab(newActiveTab);
  };

  return (
    <div className="w-48 bg-red-200">
      <h2 className={`${largeCode && "font-bold border-b-4 border-black"}`}>
        {largeCategory?.name === "women" && <span>여성</span>}
        {largeCategory?.name === "men" && <span>남성</span>}
        {mediumCategory?.name}
      </h2>
      <ul>
        {mediumCategory?.subcategories?.map((small) => (
          <li
            key={small.name}
            onClick={() => onClickItem(small.code)}
            className={`${
              small.code === smallCode && "font-bold"
            } hover:cursor-pointer`}
          >
            {small.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
