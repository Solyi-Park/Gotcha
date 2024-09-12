import { categories } from "@/data/categories";

export default function Page() {
  return (
    <ul className="sm:hidden grid grid-cols-2 gap-x-14 gap-y-28 w-full">
      {categories
        .filter((category) => category.type === "large")
        .map((largeCategory) => (
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
    </ul>
  );
}
