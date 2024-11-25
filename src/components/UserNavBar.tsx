"use client";
import { FullProduct } from "@/model/product";
import { useLikedProductsStore } from "@/store/likedProducts";
import { maskName } from "@/utils/maskPersonalInfo";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// 유틸리티 함수로 분리
export function isActivePath(pathname: string, basePath: string): boolean {
  return pathname === basePath || pathname.startsWith(`${basePath}/`);
}

async function fetchLikedProducts(userId: string): Promise<FullProduct[]> {
  return await fetch(`/api/likes?userId=${userId}`, {
    method: "GET",
  }).then((res) => res.json());
}

const MYPAGE_SECTIONS = [
  {
    title: "나의 쇼핑 정보",
    items: [
      { name: "주문배송조회", path: "/my-order/list" },
      { name: "상품 리뷰", path: "/my-order/review" },
    ],
  },
  {
    title: "나의 계정 설정",
    items: [{ name: "회원정보수정", path: "/edit" }],
  },
  {
    title: "고객센터",
    items: [{ name: "상품 QnA 내역", path: "/qna" }],
  },
];

export default function UserNavBar() {
  const { data: session } = useSession();
  const user = session?.user;
  const pathname = usePathname();
  const { setProducts } = useLikedProductsStore();

  const { data: likedProducts } = useQuery({
    queryKey: ["likedProducts", user?.id],
    queryFn: async () => {
      if (user) {
        return await fetchLikedProducts(user.id);
      }
    },
    staleTime: 60000 * 15,
  });

  useEffect(() => {
    if (likedProducts) {
      setProducts(likedProducts);
    }
  }, [likedProducts]);

  return (
    <div className="hidden sm:block min-w-44">
      <section>
        <h2 className="text-5xl font-semibold mb-7">
          {maskName(user?.name ?? "") || "회원님"}
        </h2>
        <div className="text-sm font-semibold mb-7">
          <Link href="/mypage/like">
            좋아요
            <span className="font-bold ml-1">{likedProducts?.length || 0}</span>
          </Link>
        </div>
      </section>
      {MYPAGE_SECTIONS.map((section) => (
        <section key={section.title} className="mb-6">
          <h3 className="font-bold text-lg mb-2">{section.title}</h3>
          <ul>
            {section.items.map((item) => (
              <li
                key={item.name}
                className={`mb-2 ${
                  isActivePath(pathname, `/mypage${item.path}`)
                    ? "text-black"
                    : "text-neutral-600 font-light"
                }`}
              >
                <Link href={`/mypage${item.path}`}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
