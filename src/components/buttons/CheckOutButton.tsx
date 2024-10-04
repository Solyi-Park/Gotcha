"use client";
import Link from "next/link";

type Props = {
  onClick: () => void;
};

export default function CheckOutButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="w-96 border-neutral-400 border py-4 text-2xl text-white bg-black font-bold hover:text-orange-600"
    >
      CHECK OUT
    </button>
  );
}
