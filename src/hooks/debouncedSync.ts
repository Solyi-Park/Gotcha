import {
  ShippingDetails,
  useShippingDetailStore,
} from "@/store/shippingDetail";
import { useEffect } from "react";

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
