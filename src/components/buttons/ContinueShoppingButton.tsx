import Link from "next/link";

export default function ContinueShoppingButton() {
  return (
    <button className="border-neutral-400 border w-96 py-4 text-2xl text-gray-800 font-bold hover:text-orange-600">
      <Link href="/">CONTINUE SHOPPING</Link>
    </button>
  );
}
