"use client";
import { MYPAGE_SECTIONS } from "@/constants/mypage";
import LikePage from "./like/page";
import { isActivePath } from "@/utils/currentPath";
import Link from "next/link";
import MypageNavMenu from "@/components/MypageNavMenu";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function MyPage() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  if (!user) {
    router.push("/auth/signin");
  }

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
