import { OrderData } from "@/model/order";
import SectionTitle from "./SectionTitle";
import { Payment } from "@/model/payment";
import { useQuery } from "@tanstack/react-query";
import { getFormattedDate } from "@/utils/date";

type Props = {
  order: OrderData;
};

export default function PaymentInfo({ order }: Props) {
  console.log("페이>order: ", order);

  const {
    data: payment,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["payment", order.id],
    queryFn: async () =>
      await fetch(`/api/payment/${order.paymentKey}`, {
        method: "GET",
      }).then((res) => res.json()),
  });

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
          label: payment && getPaymentMethod(payment),
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
            className="w-full min-w-52 last:border-l-2 first:border-r-2 border-l-0 last:text-rose-500"
            key={info.label}
          >
            <div className="flex justify-between p-5 min-h-16 ">
              <span className="font-semibold">{info.label}</span>
              <span className="text-lg font-bold">
                {info.value.toLocaleString()}원
              </span>
            </div>
            <ul className="flex flex-col gap-3 justify-start min-h-28 p-5 border-y-2">
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

function getPaymentMethod(payment: Payment) {
  const { method, easyPay, transfer, card } = payment;
  switch (method) {
    case "간편결제":
      return easyPay || null;
    case "계좌이체":
      return transfer || null;
    case "카드":
      return card || null;
  }
}
