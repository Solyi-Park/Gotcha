import { getCategories } from "@/services/category";
import { cache } from "react";

const fetchCategories = cache(async () => {
  const { data } = await getCategories();
  return data;
});

export default async function HomePage() {
  const categories = await fetchCategories();

  return <div className="flex- flex-col w-full h-full">home</div>;
}
