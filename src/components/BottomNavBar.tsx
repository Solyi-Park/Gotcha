"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import HomeIcon from "./icons/HomeIcon";
import SearchIcon from "./icons/SearchIcon";
import UserIcon from "./icons/UserIcon";
import HeartIcon from "./icons/HeartIcon";
import CategoryIcon from "./icons/CategoryIcon";

export default function BottomNavBar() {
  const [activeTab, setActiveTab] = useState("home");
  const { data: session } = useSession();
  const user = session?.user;

  const navItems = [
    {
      title: "HOME",
      href: "/",
      icon: <HomeIcon />,
    },
    {
      title: "CATEGORY",
      href: "/category",
      icon: <CategoryIcon size="medium" />,
    },
    {
      title: "SEARCH",
      href: "/search",
      icon: <SearchIcon />,
    },
    {
      title: "LIKE",
      href: "/mypage/like",
      icon: <HeartIcon />,
    },
    {
      title: "MY",
      href: `/mypage`,
      icon: <UserIcon />,
    },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 border-t bg-white text-gray-400 flex justify-around items-center py-2 z-50 sm:hidden">
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
