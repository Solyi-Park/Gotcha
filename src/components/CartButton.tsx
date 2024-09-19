import { MouseEvent } from "react";
import { Option } from "./forms/NewProductForm";
import { SelectedOption } from "./ProductOptionsSelector";
import { FullProduct } from "@/model/product";

type Props = {
  product: FullProduct;
  selectedOptions?: SelectedOption[];
};
type ProductForCart = {};
//상품옵션 미선택시 "상품 옵션을 선택해주세요."
// 모든 옵션 선택완료후 장바구니 담기 클릭시 "장바구니에 상품이 담겼습니다." + 장바구니 바로가기 > 버튼

async function addToCart(newProducts: ProductForCart) {
  return fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProducts),
  });
}

export default function CartButton({ product, selectedOptions }: Props) {
  const { stockQuantity, options } = product;
  // const isAllOptionsSelected = options?.length === selectedOptions?.length;
  // const handleCartButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
  //   // e.preventDefault()
  //   if (!isAllOptionsSelected) {
  //     alert("상품 옵션을 선택해주세요.");
  //   }
  //   const productForCart = {
  //     userId: "",
  //     productId: "",
  //   };
  // };

  return (
    <button
      className={`border px-10 py-3 bg-white ${
        stockQuantity > 0 ? "block" : "hidden"
      }`}
      // onClick={(e) => handleCartButtonClick(e)}
    >
      장바구니 담기
    </button>
  );
}
