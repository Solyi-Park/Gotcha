"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import AuthButton from "./AuthButton ";
import Avatar from "./Avatar";

const navLeftMenu = [
  {
    href: "/movie",
    title: "영화",
  },
  {
    href: "/tv",
    title: "시리즈",
  },
];

export default function NavBar() {
  const { data: session } = useSession();

  const user = session?.user;
  console.log("user", user);
  return (
    <div className="flex bg-red-300">
      <Link href="/">
        <h1 className="mr-4">Gotcha</h1>
      </Link>
      <nav className="flex w-full justify-between bg-blue-200">
        <ul className="flex bg-green-200">
          {navLeftMenu.map((category) => (
            <li key={category.href}>
              <Link href={category.href}>{category.title}</Link>
            </li>
          ))}
        </ul>
        <ul className="flex gap-5 bg-orange-300">
          <li>검색창</li>
          {user && (
            <>
              <li>알림</li>
              <li>
                <Link href={`/user/${user.id}`}>
                  <Avatar image={user.image} />
                </Link>
              </li>
              <li>
                <AuthButton text="로그아웃" onClick={() => signOut()} />
              </li>
            </>
          )}
          {!session && (
            <>
              <li>
                <Link href="/auth/signin">
                  <AuthButton text="로그인" />
                </Link>
              </li>
              <li>
                <Link href="/auth/signup">회원가입</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
