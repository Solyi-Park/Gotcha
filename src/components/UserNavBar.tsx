"use client";
import { FullProduct } from "@/model/product";
import { SimpleUser } from "@/model/user";
import { useLikedProductsStore } from "@/store/likedProducts";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

type Props = {
  user: SimpleUser;
};

const MYPAGE_SECTIONS = [
  {
    title: "나의 쇼핑 정보",
    items: [
      { name: "주문배송조회", path: "/my-order" },
      { name: "취소/교환/반품내역", path: "/my-order/cancel-list" },
      { name: "상품 리뷰", path: "/my-order/review" },
    ],
  },
  {
    title: "나의 계정 설정",
    items: [{ name: "회원정보수정", path: "/edit/reconfirm" }],
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
  const pathname = usePathname();
  const path = pathname.split("mypage")[1];
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

  const isActive = (itemPath: string) => {
    if (path.startsWith("/edit")) {
      return itemPath.startsWith("/edit");
    }

    return path === itemPath;
  };

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
                  isActive(item.path)
                    ? "text-black font-semibold"
                    : "text-gray-400"
                }`}
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