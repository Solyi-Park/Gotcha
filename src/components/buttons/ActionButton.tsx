import { FullProduct } from "@/model/product";
import { MouseEvent } from "react";

type Props = {
  product: FullProduct;
  type: ActionType;
  title: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  stockQuantity: number;
};

type ActionType = "cart" | "buyNow";

export default function ActionButton({
  type,
  title,
  onClick,
  stockQuantity,
}: Props) {
  if (type === "cart" && stockQuantity === 0) {
    return null;
  }

  const isDisabled = type === "buyNow" && stockQuantity === 0;

  return (
    <button
      aria-label={title}
      className={`border px-10 py-3 w-full ${getButtonStyle(type, isDisabled)}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {title}
    </button>
  );
}

function getButtonStyle(type: ActionType, isDisabled: boolean): string {
  if (isDisabled) return "bg-gray-300 text-white";

  return type === "buyNow" ? "bg-black text-white" : "bg-white text-black";
}
