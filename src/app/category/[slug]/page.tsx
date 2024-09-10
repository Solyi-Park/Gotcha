"use client";
import CategoryBar from "@/components/CategoryBar";
import { useSearchParams } from "next/navigation";

type Props = {
  params: { slug: string };
};

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const searchParams = useSearchParams();
  const categoryLargeCode = searchParams.get("categoryLargeCode");
  const categoryMediumCode = searchParams.get("categoryMediumCode");
  const categorySmallCode = searchParams.get("categorySmallCode");

  console.log("categoryLargeCode????", categoryLargeCode);
  console.log("categorymediumCode????", categoryMediumCode);
  console.log("categorySmallCode????", categorySmallCode);

  return (
    <div>
      <CategoryBar layout="vertical" />
      {/* 카테고리바 프로바이더로 감싸기 */}
      {/* <ul className="sm:hidden grid grid-cols-2 gap-x-14 gap-y-28 w-full">
        {categories.map((largeCategory) => (
          <div className="flex flex-col">
          <li
          className="py-2 text-2xl font-extrabold hover:cursor-pointer"
          key={largeCategory.name}
          >
          {largeCategory.name.toUpperCase()}
          </li>
          <ul>
          {largeCategory.subcategories.map((medium) => (
            <li className="hover:cursor-pointer p-3 border-b text-[15px] font-semibold last:border-0">
            {medium.name}
            </li>
            ))}
            </ul>
            </div>
            ))}
            </ul> */}
    </div>
  );
}
