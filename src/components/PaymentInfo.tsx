import { OrderData, OrderOutputForOrderDetail } from "@/model/order";
import SectionTitle from "./SectionTitle";
import { Payment } from "@/model/payment";
import { useQuery } from "@tanstack/react-query";
import { getFormattedDate } from "@/utils/date";
import {
  getBankName,
  getCardCompanyName,
  getPaymentMethod,
} from "@/utils/payment";

type Props = {
  order: OrderOutputForOrderDetail;
};

export default function PaymentInfo({ order }: Props) {
  const paymentInfo = [
    {
      label: "주문금액",
      value: order.totalAmount,
      details: [
        {
          label: "상품금액",
          value: `${(
            order.totalAmount - order.shippingCost
          ).toLocaleString()}원`,
        },
        { label: "배송비", value: `${order.shippingCost.toLocaleString()}원` },
      ],
    },
    {
      label: "할인금액",
      value: 0, // TODO: 쿠폰 등 적용 시 할인 금액으로 업데이트
      details: [{ label: "쿠폰", value: "0원" }],
    },
    {
      label: "결제금액",
      value: order.totalAmount,
      details: [
        {
          label: order.payments && getPaymentMethod(order.payments),
          value: `${order.totalAmount.toLocaleString()}원`, // TODO: 결제 금액 계산
        },
        { label: "결제일시", value: getFormattedDate(order.createdAt, true) },
      ],
    },
  ];

  return (
    <div className="flex flex-col">
      <SectionTitle title="결제정보" />
      <ol className="flex">
        {paymentInfo.map((info, infoIndex) => (
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
