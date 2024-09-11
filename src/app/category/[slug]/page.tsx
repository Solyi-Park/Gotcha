import CategorySideBar from "@/components/CategorySideBar";
import FilteredProductList from "@/components/FilteredProductList";

export default function CategoryPage() {
  return (
    <div className="flex">
      <CategorySideBar />
      <FilteredProductList />
    </div>
  );
}
