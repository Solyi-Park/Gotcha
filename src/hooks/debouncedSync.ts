import {
  ShippingDetails,
  useShippingDetailStore,
} from "@/store/shippingDetail";
import { useEffect, useState } from "react";

export function useDebouncedSync(
  field: keyof ShippingDetails,
  value: string | boolean,
  delay: number = 500
) {
  const { setField } = useShippingDetailStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setField(field, value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [field, value, delay]);
}

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
