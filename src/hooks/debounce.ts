import { useEffect, useState } from "react";

export default function useDebounce(keyword: string, delay: number = 500) {
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [keyword, delay]);

  return debouncedKeyword;
}
