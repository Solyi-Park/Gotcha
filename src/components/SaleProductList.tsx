"use client";
import { SaleProductsResponse } from "@/services/product";
import Link from "next/link";
import VerticalProductCard from "./VerticalProductCard";
import { useSaleCategory } from "@/provider/CategoryProviderForSaleProducts";

type Props = {
  saleProducts: SaleProductsResponse[];
};

export default function SaleProductList({ saleProducts }: Props) {
  // const [productLists, setProductsLists] = useState<SaleProductsResponse[]>([]);
  const { activeTab: activeTab } = useSaleCategory();

  // useEffect(() => {
  //   async function fetchSaleProducts() {
  //     const response = await fetch("/api/products/sale", {
  //       method: "GET",
  //     });

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data: SaleProductsResponse[] = await response.json();
  //     console.log("data?", data);
  //     setProductsLists(data);
  //   }
  //   const fetchNewArrivalProducts = cache(async () => {
  //     return await fetchSaleProducts();
  //   });
  //   fetchNewArrivalProducts();
  // }, []);

  const selectedList = saleProducts.filter((list) =>
    activeTab === "all" ? list : list.name === activeTab
  );

  return (
    <ul className="grid grid-cols-2 lg:grid-cols-3 sm:gap-y-2">
      {selectedList.length === 1
        ? selectedList[0]?.products.map((product) => (
            <li key={product.name}>
              <Link href={`/products/${product.id}`}>
                <VerticalProductCard product={product} />
              </Link>
            </li>
          ))
        : selectedList.map((list) =>
            list.products.map((product) => (
              <li key={`all-${product.name}`}>
                <Link href={`/products/${product.id}`}>
                  <VerticalProductCard product={product} />
                </Link>
              </li>
            ))
          )}
    </ul>
  );
}
