"use client";
import { MYPAGE_SECTIONS } from "@/constants/mypage";
import LikePage from "./like/page";
import { isActivePath } from "@/utils/currentPath";
import Link from "next/link";
import MypageNavMenu from "@/components/MypageNavMenu";
import { usePathname } from "next/navigation";

export default function MyPage() {
  const pathname = usePathname();
  return (
    <>
      <div className="flex sm:hidden">
        <MypageNavMenu pathname={pathname} />
      </div>
      <div className="hidden sm:block">
        <LikePage />
      </div>
    </>
  );
}
