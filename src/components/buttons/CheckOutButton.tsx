"use client";
import Link from "next/link";

type Props = {
  onClick: () => void;
  disabled: boolean;
  className: string;
};

export default function CheckOutButton({
  onClick,
  disabled,
  className,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-96 border-neutral-400 border py-4 text-2xl text-white font-bold ${
        disabled
          ? "bg-gray-400 cursor-default"
          : "bg-black  hover:text-rose-600"
      } ${className} `}
    >
      CHECK OUT
    </button>
  );
}
