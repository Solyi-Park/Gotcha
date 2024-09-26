import Link from "next/link";

export default function CheckOutButton() {
  return (
    <button className="w-96 border-neutral-400 border py-4 text-2xl text-white bg-black font-bold hover:text-orange-600">
      <Link href="/checkout">CHECK OUT</Link>
    </button>
  );
}
