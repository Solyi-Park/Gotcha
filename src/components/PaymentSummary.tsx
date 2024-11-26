import useCheckout from "@/hooks/checkout";

export default function PaymentSummary() {
  const {
    checkoutItems,
    getTotalPrice,
    getShippingCost,
    getTotalPaymentAmount,
  } = useCheckout();
  console.log("checkoutItems ?", checkoutItems);
  return (
    <section className="flex flex-col w-full border-y-2 mt-5 border-black px-3">
      <h2 className="font-bold py-5 border-b text-lg">결제금액</h2>
      <div className="flex flex-col gap-2 my-3 text-sm">
        <div className="flex justify-between">
          <span>총 상품 금액</span>
          <span>{getTotalPrice().toLocaleString()}원</span>
        </div>
        <div className="flex justify-between">
          <span>배송비</span>
          <span>
            {getShippingCost() === 0
              ? "무료"
              : `${getShippingCost().toLocaleString()}원`}
          </span>
        </div>
        <div className="flex justify-between items-center font-bold">
          <span>총 결제 금액</span>
          <span className="text-2xl text-rose-500">
            {getTotalPaymentAmount().toLocaleString()}원
          </span>
        </div>
      </div>
    </section>
  );
}
