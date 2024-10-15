"use client";
import { FullProduct } from "@/model/product";
import { SimpleUser } from "@/model/user";
import { useLikedProductsStore } from "@/store/likedProducts";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  user: SimpleUser;
};

const MYPAGE_SECTIONS = [
  {
    title: "나의 쇼핑 정보",
    items: [
      { name: "주문배송조회", path: "/orders" },
      { name: "취소/교환/반품내역", path: "/returns" },
      { name: "상품 리뷰", path: "/reviews" },
    ],
  },
  {
    title: "나의 계정 설정",
    items: [{ name: "회원정보수정", path: "/account-settings" }],
  },
  {
    title: "고객센터",
    items: [{ name: "상품 QnA 내역", path: "/qna" }],
  },
];

async function fetchLikedProducts(userId: string): Promise<FullProduct[]> {
  return await fetch(`/api/likes?userId=${userId}`, {
    method: "GET",
  }).then((res) => res.json());
}

export default function UserNavBar({ user }: Props) {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const { setProducts } = useLikedProductsStore();
  const { data: likedProducts } = useQuery({
    queryKey: ["likedProducts", user.id],
    queryFn: async () => await fetchLikedProducts(user.id),
  });

  useEffect(() => {
    if (likedProducts) {
      setProducts(likedProducts);
    }
  }, [likedProducts]);

  return (
    <div className="">
      <section>
        <h2 className="text-4xl font-bold">{user.name || "회원님"}</h2>
        <div>
          <Link href="/mypage/like">
            좋아요 <span>{likedProducts?.length || 0}</span>
          </Link>
        </div>
      </section>
      {MYPAGE_SECTIONS.map((section) => (
        <section key={section.title}>
          <h3 className="font-bold text-lg">{section.title}</h3>
          <ul>
            {section.items.map((item) => (
              <li
                key={item.name}
                className={`${
                  activeTab === item.name
                    ? "text-black font-semibold"
                    : "text-gray-400"
                }`}
                onClick={() => setActiveTab(item.name)}
              >
                <Link href={`/mypage/${item.path}`}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
