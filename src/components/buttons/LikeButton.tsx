"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MouseEvent, useState } from "react";
import { SimpleProduct } from "@/model/product";
import { useRouter } from "next/navigation";
import useCategoryParams from "@/hooks/params";
import HeartFillIcon from "../icons/HeartFillIcon";
import HeartIcon from "../icons/HeartIcon";
import { useSession } from "next-auth/react";
import { Like } from "@/model/like";

type Props = {
  product: SimpleProduct;
  isForDetail?: boolean;
};

async function updateLike(productId: string, userId: string) {
  return await fetch("/api/likes", {
    method: "PUT",
    headers: {
      "Conten-Type": "application/json",
    },
    body: JSON.stringify({ productId, userId }),
  }).then((res) => res.json());
}

export default function LikeButton({ product, isForDetail }: Props) {
  // TODO: 코드 복잡함
  const router = useRouter();
  const { id: productId, likes, likeCount } = product;

  const { data: session } = useSession();
  const user = session?.user;
  const userId = user?.id;
  // ssession안에  user.id가 존재하지 않음.
  // session 아이디로 user정보를 받아와서 해당 id로  likes확인 및 업데이트하는 로직으로 수정해야함.
  // TODO: 해당 로직 커스텀훅으로 분리하여 재사용
  console.log("userId 라이크버튼", user);

  const liked = likes?.includes(user);

  const queryClient = useQueryClient();
  const { mutate: toggleLike } = useMutation({
    mutationFn: async () => await updateLike(productId, user.id),
    onMutate: async () => {
      const prevProduct = queryClient.getQueryData<SimpleProduct>([
        "product",
        productId,
      ]);
      const prevSaleProducts = queryClient.getQueryData<SimpleProduct[]>([
        "saleProducts",
      ]);
      const prevNewProducts = queryClient.getQueryData<SimpleProduct[]>([
        "newProducts",
      ]);

      await queryClient.cancelQueries({ queryKey: ["product", productId] });

      queryClient.setQueryData<SimpleProduct>(["product", productId], (old) => {
        if (!old) return old;
        return {
          ...old,
          likes: liked
            ? old.likes.filter((uid) => uid !== userId)
            : [...old.likes, userId],
          likeCount: liked ? old.likeCount! - 1 : old.likeCount! + 1,
        };
      });

      if (prevSaleProducts) {
        queryClient.setQueryData(["saleProducts"], (old: SimpleProduct[]) => {
          if (!old) return old;
          old.map((product) =>
            product.id === productId
              ? {
                  ...product,
                  likes: liked
                    ? product.likes.filter((uid) => uid !== userId)
                    : [...product.likes, userId],
                  likeCount: liked
                    ? product.likeCount! - 1
                    : product.likeCount! + 1,
                }
              : product
          );
        });
      }

      if (prevNewProducts) {
        queryClient.setQueryData(["newProducts"], (old: SimpleProduct[]) =>
          old.map((product) =>
            product.id === productId
              ? {
                  ...product,
                  likes: liked
                    ? product.likes.filter((uid) => uid !== userId)
                    : [...product.likes, userId],
                  likeCount: liked
                    ? product.likeCount! - 1
                    : product.likeCount! + 1,
                }
              : product
          )
        );
      }

      return { prevProduct };
    },
    onError: (error, productId, context) => {
      if (context?.prevProduct) {
        queryClient.setQueryData(["product", productId], context?.prevProduct);
      }
    },
    onSettled: () => {
      // queryClient.invalidateQueries({ queryKey: ["newProducts"] });
      // queryClient.invalidateQueries({ queryKey: ["saleProducts"] });
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      // queryClient.invalidateQueries({
      //   queryKey: ["products", { largeCode, mediumCode, smallCode }],
      // });
    },
  });

  const handleLike = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    //TODO: 커스텀 모달
    if (!user) {
      if (window.confirm("로그인이 필요합니다. 로그인 하시겠습니까?")) {
        router.push("/auth/signin");
      }
      return;
    }

    toggleLike();
  };
  return (
    <button aria-label="likeButton" onClick={(e) => handleLike(e)}>
      {liked ? (
        <HeartFillIcon size="large" />
      ) : (
        <HeartIcon size="large" color={isForDetail === true ? "black" : ""} />
      )}
    </button>
  );
}
