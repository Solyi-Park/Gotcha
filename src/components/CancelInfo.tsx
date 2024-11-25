"use client";
import { OrderOutputForOrderDetail } from "@/model/order";
import SectionTitle from "./SectionTitle";
import { getPaymentMethod } from "@/utils/payment";
import { useQuery } from "@tanstack/react-query";
import { DatabaseCancel } from "@/model/cancel";

type Props = {
  order: OrderOutputForOrderDetail;
};
async function fetchCancelData(paymentKey: string): Promise<DatabaseCancel> {
  const res = await fetch(`/api/cancel?paymentKey=${paymentKey}`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error(
      `Failed to fetch cancel data with paymentKey:${paymentKey}`
    );
  }
  const data = await res.json();
  return data;
}
export default function CancelInfo({ order }: Props) {
  const {
    data: cancelData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["paymentKey", order.paymentKey],
    queryFn: async () => await fetchCancelData(order.paymentKey || ""),
  });
  console.log("cancelData", cancelData);

  const cancelInfo = [
    {
      label: "원결제금액",
      value: order.totalAmount,
      details: [
        {
          label: "상품금액",
          value: `${(
            order.totalAmount - order.shippingCost
          ).toLocaleString()}원`,
        },
        {
          label: "환불배송비",
          value: "0원", //TODO: 반품 정책에 따라 적용
        },
      ],
    },
    {
      label: "차감금액",
      value: order.totalAmount - order.shippingCost, // TODO: 쿠폰 등 적용 시 할인 금액으로 업데이트
      details: [
        { label: "추가배송비", value: "0원" },
        { label: "반품배송비", value: "0원" }, //TODO: 반품 정책에 따라 적용
      ],
    },
    {
      label: "환불금액",
      value: order.totalAmount - order.shippingCost,
      details: [
        {
          label: order.payments && getPaymentMethod(order.payments),
          value: `${(
            order.totalAmount - order.shippingCost
          ).toLocaleString()}원`, // TODO: 결제 금액 계산
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col">
      <SectionTitle title="취소/환불정보" />
      <ol className="flex">
        {cancelInfo.map((info, infoIndex) => (
          <li
            className="w-full min-w-52 last:border-l-[1px] first:border-r-[1px] border-l-0 last:text-rose-500"
            key={info.label}
          >
            <div className="flex justify-between p-5 min-h-16 ">
              <span className="font-semibold">{info.label}</span>
              <span className="text-lg font-bold">
                {info.value.toLocaleString()}원
              </span>
            </div>
            <ul className="flex flex-col gap-3 justify-start min-h-28 p-5 border-y-[1px]">
              {info.details.map((detail, detailIndex) => (
                <li
                  key={detail.label}
                  className={`${
                    detailIndex === 1 &&
                    infoIndex === 2 &&
                    "text-sm text-neutral-400"
                  } flex justify-between text-black`}
                >
                  <span>{detail.label}</span>
                  <span>{detail.value}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
