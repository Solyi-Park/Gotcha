"use client";
import useCancelStore from "@/store/cancel";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type Props = {
  orderId: string;
};
export const cancelReasons = [
  "상품이 마음에 들지 않아요.",
  "다른 상품 추가 후 재주문 예정이에요.",
  "상품에 문제가 있어요.",
  "배송이 잘 못 왔어요.",
];
export default function CancelReason({ orderId }: Props) {
  const router = useRouter();

  // TODO: reason, detail 디바운싱.
  const {
    cancelReason,
    cancelReasonDetail,
    setCancelReason,
    setCancelReasonDetail,
  } = useCancelStore();

  console.log("reason", cancelReason);
  console.log("reasonDetail", cancelReasonDetail);

  return (
    <div>
      <ul>
        {cancelReasons.map((reason) => (
          <li key={reason}>
            <label>
              <input
                type="radio"
                name="option"
                value={reason}
                checked={reason === cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
              />
              {reason}
            </label>
          </li>
        ))}
      </ul>
      <textarea
        className="w-full resize-none border focus:outline-none "
        name="cancel-reason-detail"
        placeholder="사유입력은 선택사항, 입력시 취소 상세 내역에 노출됩니다."
        maxLength={100}
        value={cancelReasonDetail}
        onChange={(e) => setCancelReasonDetail(e.target.value)}
      />
      <div className="flex justify-end">
        <button
          className="bg-black text-white px-3 py-2 rounded-md"
          onClick={() =>
            router.push(
              `/mypage/my-order/cancel/${orderId}?funnel-step=취소정보+확인`
              // 에러해결해야함.
            )
          }
        >
          선택완료
        </button>
      </div>
    </div>
  );
}
