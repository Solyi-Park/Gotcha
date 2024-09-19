"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import HeartIcon from "./icons/HeartIcon";
import { MouseEvent, useState } from "react";
import HeartFillIcon from "./icons/HeartFillIcon";
import { useSession } from "next-auth/react";
import { SimpleProduct } from "@/model/product";
import { useRouter } from "next/navigation";
import useCategoryParams from "@/hooks/params";

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
  const { id: productId, likes } = product;
  const { data: session } = useSession();
  const userId: string = session?.user.id;

  const liked = userId ? likes?.includes(userId) : false;

  const router = useRouter();

  const { largeCode, mediumCode, smallCode } = useCategoryParams();

  const queryClient = useQueryClient();
  const { mutate: toggleLike } = useMutation({
    mutationFn: async () => await updateLike(productId, userId),
    onMutate: async (productId) => {
      const prevProduct = queryClient.getQueryData<SimpleProduct>([
        "products",
        productId,
      ]);
      await queryClient.cancelQueries({ queryKey: ["products", productId] });

      if (userId) {
        queryClient.setQueryData<SimpleProduct>(
          ["products", productId],
          (old) => {
            if (!old) return old;

            const isLiked = old.likes.includes(userId);
            return {
              ...old,
              likes: isLiked
                ? old.likes.filter((uid) => uid !== userId)
                : [...old.likes, userId],
              likeCount: isLiked ? old.likeCount! - 1 : old.likeCount! + 1,
            };
          }
        );
      }
      return { prevProduct };
    },
    onError: (error, productId, context) => {
      if (context?.prevProduct) {
        queryClient.setQueryData(["products", productId], context?.prevProduct);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["newProducts"] });
      queryClient.invalidateQueries({ queryKey: ["saleProducts"] });
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      queryClient.invalidateQueries({
        queryKey: ["products", { largeCode, mediumCode, smallCode }],
      });
    },
  });

  // const setLike = (product: FullProduct, userId: string, like: boolean) => {
  //   const newProduct = {
  //     ...product,
  //     likes: like
  //       ? [...product.likes, userId]
  //       : product.likes.filter((item) => item !== userId),
  //   };
  //   const newProducts = products?.map((p: FullProduct) =>
  //     p.id === product.id ? newProduct : p
  //   );

  //   return mutate(updateLike);
  // };

  const handleLike = async (
    e: MouseEvent<HTMLButtonElement>,
    productId: string
  ) => {
    e.preventDefault();

    //TODO: 커스텀 모달
    if (!userId) {
      if (window.confirm("로그인이 필요합니다. 로그인 하시겠습니까?")) {
        router.push("/auth/signin");
      }
      return;
    }

    toggleLike();
    //TODO:optimistic update
    // setIsLiked(!isLiked);
    // setIsLiked(productId)

    // const data = (await toggleLike(productId, userId)) as string[];
    // if (data) {
    //   data.includes(userId) ? setIsLiked(true) : setIsLiked(false);
    // }
    // // const likeMutate = updateLikes();
  };
  return (
    <button aria-label="likeButton" onClick={(e) => handleLike(e, productId)}>
      {liked ? (
        <HeartFillIcon size="large" />
      ) : (
        <HeartIcon size="large" color={isForDetail === true ? "black" : ""} />
      )}
    </button>
  );
}
