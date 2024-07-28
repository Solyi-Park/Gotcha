"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import SearchBar from "./SearchBar";
import NavMenu from "./NavMenu";
import UserMenu from "./UserMenu";

export default function NavBar() {
  const { data: session } = useSession();

  const user = session?.user;
  return (
    <div className="flex items-center justify-between p-8 h-24 border-b mx-auto">
      <Link href="/">
        <h1 className="mr-2 text-3xl sm:text-5xl font-bold">Gotcha</h1>
      </Link>
      <nav className="flex w-full justify-end sm:justify-between">
        <NavMenu />
        <div className="hidden sm:flex items-center ">
          <SearchBar />
          <UserMenu user={user} />
        </div>
      </nav>
    </div>
  );
}
