import { categories } from "@/data/categories";
import { getCategories } from "@/services/category";
import { cache } from "react";

// const fetchCategories = cache(async () => {
//   const { data } = await getCategories();
//   return data;
// });

export default function HomePage() {
  // const categories = await fetchCategories();
  console.log("categories??:", categories);

  return <>home</>;
}
