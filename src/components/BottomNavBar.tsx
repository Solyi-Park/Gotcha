"use client";
import { RiHomeFill } from "@react-icons/all-files/ri/RiHomeFill";
import { RiSearchLine } from "@react-icons/all-files/ri/RiSearchLine";
import { RiUserLine } from "@react-icons/all-files/ri/RiUserLine";
import { RiNotificationLine } from "@react-icons/all-files/ri/RiNotificationLine";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function BottomNavBar() {
  const [activeTab, setActiveTab] = useState("home");
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="fixed inset-x-0 bottom-0 border-t bg-white text-gray-400 flex justify-around items-center py-2 z-50 sm:hidden">
      <Link href="/">
        <button
          onClick={() => setActiveTab("home")}
          className={activeTab === "home" ? "text-black" : ""}
        >
          <RiHomeFill className="h-6 w-6" />
          <span className="text-xs">홈</span>
        </button>
      </Link>
      <Link href="/search">
        <button
          onClick={() => setActiveTab("search")}
          className={activeTab === "search" ? "text-black" : ""}
        >
          <RiSearchLine className="h-6 w-6" />
          <span className="text-xs">검색</span>
        </button>
      </Link>
      <Link href="/notification">
        <button
          onClick={() => setActiveTab("notification")}
          className={activeTab === "notification" ? "text-black" : ""}
        >
          <RiNotificationLine className="h-6 w-6" />
          <span className="text-xs">알림</span>
        </button>
      </Link>
      <Link href={`/user/${user?.id}`}>
        <button
          onClick={() => setActiveTab("profile")}
          className={`${
            activeTab === "profile" ? "text-black" : ""
          } flex flex-col items-center`}
        >
          <RiUserLine className="h-6 w-6" />
          <span className="text-xs">마이</span>
        </button>
      </Link>
    </div>
  );
}
