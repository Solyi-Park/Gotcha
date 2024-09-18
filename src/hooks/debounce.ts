import { toggleLike } from "@/components/LikeButton";
import { useEffect, useState } from "react";

// export default function useDebounce(keyword: string, delay: number = 500) {
//   const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedKeyword(keyword);
//     }, delay);
//     return () => {
//       clearTimeout(timer);
//     };
//   }, [keyword, delay]);

//   return debouncedKeyword;
// }

export default function useLikeDebounce(
  productId: string,
  userId: string,
  like: boolean
) {
  const [updatedLike, setUpdatedLike] = useState(like);
  useEffect(() => {
    const timer = setTimeout(async () => {
      await toggleLike(productId, userId);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return updatedLike;
}
