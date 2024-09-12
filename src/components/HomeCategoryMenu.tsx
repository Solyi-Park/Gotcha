"use client";
import { categories } from "@/data/categories";
import { useMainCategoryStore } from "@/store/category";

import Link from "next/link";
import { MouseEvent, useState } from "react";

export default function HomeCategoryMenu() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const activeCategory = useMainCategoryStore((state) => state.activeTab);
  const setActiveCategory = useMainCategoryStore((state) => state.setActiveTab);

  const onClickCategory = (
    e: MouseEvent<HTMLLIElement>,
    large: string,
    medium: string,
    small: string | null
  ) => {
    e.stopPropagation();
    setActiveCategory({
      large,
      medium,
      small,
    });
    setHoveredCategory(null);
  };

  return (
    <nav className="hidden sm:flex ">
      <ul className="flex justify-around sm:w-[500px] lg:w-[600px] px-5">
        {categories
          .filter((category) => category.type === "large")
          .map((largeCategory) => (
            <li
              className={`${
                activeCategory.large === largeCategory.name &&
                "border-b-4 border-black"
              } font-bold hover:border-black hover:border-b-4 hover:cursor-pointer`}
              key={largeCategory.code}
              onMouseEnter={() => setHoveredCategory(largeCategory.name)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {largeCategory.name.toUpperCase()}
              {/* TODO: 스크롤시 드롭다운메뉴 위치 수정 */}
              {hoveredCategory === largeCategory.name && (
                <ul className=" grid grid-cols-5 absolute left-0 w-full p-5 pb-10 mt-1 px-14 border-t bg-white z-10">
                  {largeCategory.subcategories.map((mediumCategory) => (
                    //TODO: 중분류 카테고리 호버상태에서 벗어날때 원래 폰트굵기 원래대로 돌아가기
                    <li
                      className="text-sm font-semibold hover:font-extrabold"
                      key={mediumCategory.code}
                      onClick={(e) =>
                        onClickCategory(
                          e,
                          largeCategory.name,
                          mediumCategory.name,
                          null
                        )
                      }
                    >
                      <Link
                        href={`/category/list?categoryLargeCode=${largeCategory.code}&categoryMediumCode=${mediumCategory.code}&categorySmallCode=`}
                      >
                        {mediumCategory.name}
                      </Link>
                      {" >"}
                      <ul>
                        {mediumCategory.subcategories.map((smallCategory) => (
                          <li
                            className="font-normal text-sm mt-[5px] hover:font-bold"
                            key={smallCategory.code}
                            onClick={(e) =>
                              onClickCategory(
                                e,
                                largeCategory.name,
                                mediumCategory.name,
                                smallCategory.name
                              )
                            }
                          >
                            <Link
                              href={`/category/list?categoryLargeCode=${largeCategory.code}&categoryMediumCode=${mediumCategory.code}&categorySmallCode=${smallCategory.code}`}
                            >
                              {smallCategory.name}
                            </Link>
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
