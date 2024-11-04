"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MouseEvent, useState } from "react";
import { SimpleProduct } from "@/model/product";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FullUser } from "@/model/user";
import HeartFillIcon from "../icons/HeartFillIcon";
import HeartIcon from "../icons/HeartIcon";

type Props = {
  product: SimpleProduct;
  isForDetail?: boolean;
};

async function updateLike(productId: string, userId: string) {
  return await fetch("/api/likes", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId, userId }),
  }).then((res) => res.json());
}

export default function LikeButton({ product, isForDetail }: Props) {
  const router = useRouter();
  const { id: productId, likes, likeCount } = product;

  const { data: session } = useSession();

  const user = session?.user;
  console.log("user!", user);
  const liked = likes?.includes(user?.id);

  const queryClient = useQueryClient();
  const { mutate: toggleLike } = useMutation({
    mutationFn: async () => await updateLike(productId, user?.id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["product", productId] });

      queryClient.setQueryData<SimpleProduct>(["product", productId], (old) => {
        if (!old) return old;
        return {
          ...old,
          likes: liked
            ? old.likes.filter((uid) => uid !== user?.id)
            : [...old.likes, user?.id],
          likeCount: liked ? old.likeCount! - 1 : old.likeCount! + 1,
        };
      });

      return { prevProduct: product };
    },
    onError: (error, _, context) => {
      if (context?.prevProduct) {
        queryClient.setQueryData(["product", productId], context.prevProduct);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      queryClient.invalidateQueries({ queryKey: ["saleProducts"] });
      queryClient.invalidateQueries({ queryKey: ["newProducts"] });
    },
  });

  const handleLike = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!user) {
      if (window.confirm("로그인이 필요합니다. 로그인 하시겠습니까?")) {
        router.push("/auth/signin");
      }
      return;
    }

    toggleLike();
  };

  return (
    <button aria-label="likeButton" onClick={handleLike}>
      {liked ? (
        <HeartFillIcon size="large" />
      ) : (
        <HeartIcon size="large" color={isForDetail === true ? "black" : ""} />
      )}
    </button>
  );
}
