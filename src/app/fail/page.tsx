"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function FailPage() {
  const router = useRouter();
  // const { paymentType, orderId, paymentKey, amount } = router.query;
  const params = useSearchParams();
  const code = params.get("code");
  const message = params.get("message");

  return (
    <div>
      <h1>결제가 실패했습니다.</h1>

      <p>에러코드: {code}</p>
      <p>실패사유: {message}</p>
      <p>문제가 계속되면 고객 지원에 문의하세요.</p>
      <button onClick={() => router.push("/")}>홈으로 돌아가기</button>
    </div>
  );
}
