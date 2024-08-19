"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import SearchBar from "./SearchBar";

import ShoppingBagIcon from "./icons/ShoppingBagIcon";
import UserMenu from "../../UserMenu";

export default function NavBar() {
  const { data: session } = useSession();

  const user = session?.user;
  return (
    <nav className="flex items-center justify-between p-8 h-20 sm:h-28 border-b mx-auto">
      <Link href="/">
        <h1 className="mr-2 text-3xl sm:text-5xl font-bold">Gotcha</h1>
      </Link>{" "}
      <Link href="/newproducts-test">TEST</Link>
      <div className="flex sm:flex-col gap-5 items-center">
        {/* {user.role === "admin" ? <AdminPage /> : <UserMenu user={user} />} */}
        <UserMenu user={user} />
        <SearchBar />
        <Link href="/cart" className="sm:hidden">
          <ShoppingBagIcon size="medium" />
        </Link>
      </div>
    </nav>
  );
}
