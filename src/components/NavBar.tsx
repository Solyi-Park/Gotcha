"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import SearchBar from "./SearchBar";

import ShoppingBagIcon from "./icons/ShoppingBagIcon";
import UserMenu from "../../UserMenu";
import CategoryMenu from "./CategoryMenu";

export default function NavBar() {
  const { data: session } = useSession();

  const user = session?.user;
  return (
    <nav className="flex flex-col">
      <section className="flex items-center justify-between p-8 h-20 w-full sm:h-28 mx-auto">
        <Link href="/">
          <h1 className="mr-2 text-2xl sm:text-5xl font-bold">Gotcha</h1>
        </Link>{" "}
        <div className="flex sm:flex-col gap-5 items-center">
          {/* {user.role === "admin" ? <AdminPage /> : <UserMenu user={user} />} */}
          <UserMenu user={user} />
          <SearchBar />
          <Link href="/cart" className="sm:hidden">
            <ShoppingBagIcon size="medium" />
          </Link>
        </div>
      </section>
      <CategoryMenu />
    </nav>
  );
}
