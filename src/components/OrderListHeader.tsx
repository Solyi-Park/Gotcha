export default function OrderListHeader() {
  return (
    <section className="hidden sm:flex w-full border-black border-b-[1px] py-3 font-semibold">
      <div className="flex-[0.4] text-center">상품정보</div>
      <div className="flex-[0.1] text-center">배송비</div>
      <div className="flex-[0.3] text-center">진행상태</div>
      <div className="flex-[0.2] text-center">리뷰</div>
    </section>
  );
}
