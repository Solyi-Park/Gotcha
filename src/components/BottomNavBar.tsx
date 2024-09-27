"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import HomeIcon from "./icons/HomeIcon";
import CategoryIcon from "./icons/CategoryIcon";
import SearchIcon from "./icons/SearchIcon";
import HeartIcon from "./icons/HeartIcon";
import UserIcon from "./icons/UserIcon";

export default function BottomNavBar() {
  const [activeTab, setActiveTab] = useState("home");
  const { data: session } = useSession();
  const user = session?.user;

  const navItems = [
    {
      title: "HOME",
      href: "/",
      icon: <HomeIcon size="large" />,
    },
    {
      title: "CATEGORY",
      href: "/list",
      icon: <CategoryIcon size="large" />,
    },
    {
      title: "SEARCH",
      href: "/search",
      icon: <SearchIcon size="large" />,
    },
    {
      title: "LIKE",
      href: "/mypage/like",
      icon: <HeartIcon size="large" />,
    },
    {
      title: "MY",
      href: `/mypage`,
      icon: <UserIcon size="large" />,
    },
  ];

  return (
    <div className=" sm:hidden fixed inset-x-0 bottom-0 border-t bg-white text-gray-400 flex justify-around items-center py-2 z-50">
      {navItems.map((item) => (
        <Link href={item.href} key={item.title}>
          <button
            onClick={() => setActiveTab(`${item.title}`)}
            className={`${activeTab} === ${item.title} ? "text-black" : "" flex flex-col items-center gap-[3px]`}
          >
            {item.icon}
            <span className="text-xs ">{item.title}</span>
          </button>
        </Link>
      ))}
    </div>
  );
}
