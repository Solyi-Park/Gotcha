"use client";
import { categories } from "@/data/categories";
import { SaleProductsResponse } from "@/services/product";

import { useEffect, useState } from "react";
import SaleProductCard from "./SaleProductCard";

export default function HomeSaleProducts() {
  const [productLists, setProductsLists] = useState<SaleProductsResponse[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");

  useEffect(() => {
    async function fetchSaleProducts() {
      const response = await fetch("/api/products/sale", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: SaleProductsResponse[] = await response.json();
      console.log("data?", data);
      setProductsLists(data);
    }
    fetchSaleProducts();
  }, []);

  const selectedList = productLists.filter((list) =>
    activeTab === "all" ? list : list.name === activeTab
  );
  if (selectedList) {
    console.log("selectedList", selectedList);
  }

  return (
    <section>
      <h2 className="font-semibold text-lg italic mb-1">Sale</h2>
      {/* TODO: nav bar 중복 */}
      <ul className="flex justify-around mb-2">
        <li
          className={`${
            activeTab === "all" && "font-bold"
          } hover:cursor-pointer text-sm`}
          onClick={() => setActiveTab("all")}
        >
          all
        </li>
        {categories
          .filter((category) => category.type === "large")
          .map((largeCategory) => (
            <li
              className={`${
                activeTab === largeCategory.name && "font-bold"
              } text-sm hover:cursor-pointer`}
              key={largeCategory.name}
              onClick={(e) => setActiveTab(largeCategory.name)}
            >
              {largeCategory.name}
            </li>
          ))}
      </ul>
      <ul className="grid  ">
        {selectedList.length === 1
          ? selectedList[0]?.products.map((product) => (
              <li key={product.name}>
                <SaleProductCard product={product} />
              </li>
            ))
          : selectedList.map((list) =>
              list.products.map((product) => (
                <li key={product.name}>
                  <SaleProductCard product={product} />
                </li>
              ))
            )}
      </ul>
    </section>
  );
}
