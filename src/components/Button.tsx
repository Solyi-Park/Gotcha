"use client";

import Link from "next/link";

type Color = "black" | "white";
type Props = {
  color?: Color;
  text: string;
  isVisible?: boolean;
  href: string;
};

export default function Button({
  color = "white",
  text,
  isVisible = true,
  href,
}: Props) {
  return (
    <button
      className={`rounded-sm text-xs  p-2 w-16 h-8 ${getButtonStyle(color)} ${
        isVisible ? "block" : "hidden"
      }`}
      type="button"
    >
      <Link href={href}>{text}</Link>
    </button>
  );
}

function getButtonStyle(color: Color) {
  switch (color) {
    case "black":
      return "bg-black text-white border-white";
    case "white":
      return "bg-white text-gray-600 border";
  }
}
