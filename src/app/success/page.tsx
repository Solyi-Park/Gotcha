"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import useOrderStore from "@/store/ortder";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

export default function SuccessPage() {
  const router = useRouter();
  const params = useSearchParams();
  // const pathname = usePathname();
  const { setOrderData } = useOrderStore();

  const orderId = params.get("orderId");
  const paymentKey = params.get("paymentKey");
  const amount = params.get("amount");

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  useEffect(() => {
    // if (pathname === "/success" && paymentKey && orderId && amount) {
    // 서버요청
    const confirm = async () => {
      try {
        const requestData = {
          paymentKey,
          orderId,
          amount,
        };

        const response = await fetch("/api/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        const json = await response.json();

        if (!response.ok) {
          // 결제 실패 비즈니스 로직을 구현하세요.
          throw new Error(json.message || "결제 실패");
        }

        console.log("paymentResult", json);
        // router.push(`/confirmed/${json.orderId}`);
      } catch (error) {
        console.error("결제 실패:", error);
        // router.push(`/fail?message=${error}`);
      } finally {
        setLoading(false); // 로딩 중지
      }
    };
    confirm();
    // }
  }, []);

  if (loading) {
    return (
      <div className="flex w-full h-[50%] justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }
}
