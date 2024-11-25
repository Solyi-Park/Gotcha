"use client";
import { categories } from "@/data/categories";
import { useRouter } from "next/navigation";

export default function CategoryModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  const onClick = (largeCategoryCode: string, mediumCategoryCode: string) => {
    router.push(
      `/category/list?categoryLargeCode=${largeCategoryCode}&categoryMediumCode=${mediumCategoryCode}&categorySmallCode=`
    );
    onClose();
  };
  return (
    <div className="sm:hidden absolute inset-0 bg-white/80 backdrop-blur-sm overflow-y-auto">
      <button
        onClick={onClose}
        className="absolute mt-4 text-xl text-black px-4 py-2 right-3"
      >
        X
      </button>
      <ul className="grid grid-cols-2 gap-x-14 gap-y-28 w-full px-4 pt-8">
        {categories
          .filter((category) => category.type === "large")
          .map((largeCategory) => (
            <div className="flex flex-col" key={largeCategory.name}>
              <li className="py-2 text-2xl font-extrabold hover:cursor-pointer">
                {largeCategory.name.toUpperCase()}
              </li>
              <ul>
                {largeCategory.subcategories.map((mediumCategory) => (
                  <li
                    key={mediumCategory.name}
                    className="hover:cursor-pointer p-3 border-b text-[15px] font-semibold last:border-0"
                    onClick={() =>
                      onClick(largeCategory.code, mediumCategory.code)
                    }
                  >
                    {mediumCategory.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </ul>
    </div>
  );
}
