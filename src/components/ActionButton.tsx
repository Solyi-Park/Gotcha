import { FullProduct } from "@/model/product";
import { MouseEvent } from "react";

type Props = {
  product: FullProduct;
  type: ActionType;
  title: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};
type ActionType = "cart" | "buyNow";

export default function ActionButton({ product, type, title, onClick }: Props) {
  const { stockQuantity } = product;
  return (
    <button
      aria-label={title}
      className={`border px-10 py-3 ${getButtonStyle(type, stockQuantity)}`}
      onClick={onClick}
      disabled={stockQuantity === 0}
    >
      {getText(type, stockQuantity)}
    </button>
  );
}

function getButtonStyle(type: ActionType, stockQuantity: number) {
  switch (type) {
    case "cart":
      return `bg-white ${stockQuantity > 0 ? "block" : "hidden"}`;
    case "buyNow":
      return `text-white ${stockQuantity === 0 ? "bg-gray-300 " : "bg-black "}`;
  }
}
function getText(type: ActionType, stockQuantity: number) {
  switch (type) {
    case "cart":
      return "장바구니 담기";
    case "buyNow":
      return stockQuantity > 0 ? "바로 구매하기" : "품절";
  }
}
