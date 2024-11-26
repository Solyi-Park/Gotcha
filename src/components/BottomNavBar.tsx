"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import HomeIcon from "./icons/HomeIcon";
import CategoryIcon from "./icons/CategoryIcon";
import SearchIcon from "./icons/SearchIcon";
import HeartIcon from "./icons/HeartIcon";
import UserIcon from "./icons/UserIcon";
import CategoryModal from "./CategoryModal";
import SearchModal from "./SearchModal";
import { useRouter } from "next/navigation";

export default function BottomNavBar() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("home");
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  //TODO: 모달상태 전역관리. bottomNavBar 메뉴 버튼 클릭시 onClose 실행

  const { data: session } = useSession();
  const user = session?.user;

  const navItems = [
    {
      title: "HOME",
      icon: <HomeIcon size="large" />,
      action: () => {
        setActiveTab("HOME");
        router.push("/");
      },
    },
    {
      title: "CATEGORY",
      icon: <CategoryIcon size="large" />,
      action: () => {
        setActiveTab("CATEGORY");
        setIsCategoryModalOpen(true);
      },
    },
    {
      title: "SEARCH",
      icon: <SearchIcon size="large" />,
      action: () => {
        setActiveTab("SEARCH");
        setIsSearchModalOpen(true);
      },
    },
    {
      title: "LIKE",
      icon: <HeartIcon size="large" />,
      action: () => {
        setActiveTab("LIKE");
        router.push("/mypage/like");
      },
    },
    {
      title: "MY",
      icon: <UserIcon size="large" />,
      action: () => {
        setActiveTab("MY");
        router.push("/mypage");
      },
    },
  ];

  return (
    <>
      <div className="sm:hidden fixed inset-x-0 bottom-0 border-t bg-white text-gray-400 flex justify-around items-center py-2 z-50">
        {navItems.map((item) => (
          <button
            key={item.title}
            onClick={item.action}
            className={`${
              activeTab === item.title ? "text-black" : ""
            } flex flex-col items-center gap-[3px]`}
          >
            {item.icon}
            <span className="text-xs">{item.title}</span>
          </button>
        ))}
      </div>
      {isCategoryModalOpen && (
        <CategoryModal onClose={() => setIsCategoryModalOpen(false)} />
      )}
      {isSearchModalOpen && (
        <SearchModal onClose={() => setIsSearchModalOpen(false)} />
      )}
    </>
  );
}
