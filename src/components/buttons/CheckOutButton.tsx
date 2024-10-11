"use client";
import Link from "next/link";

type Props = {
  onClick: () => void;
  disabled: boolean;
};

export default function CheckOutButton({ onClick, disabled }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-96 border-neutral-400 border py-4 text-2xl text-white font-bold ${
        disabled
          ? "bg-gray-400 cursor-default"
          : "bg-black  hover:text-rose-600"
      } `}
    >
      CHECK OUT
    </button>
  );
}
