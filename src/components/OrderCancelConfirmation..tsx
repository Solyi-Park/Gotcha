import Link from "next/link";

export default function OrderCancelConfirmation() {
  return (
    <div className="flex flex-col items-center py-14">
      <h3 className="text-2xl font-semibold">주문 취소가 완료 되었습니다.</h3>
      <span>
        결제방식에 따라
        <span className="text-rose-500">환불은 최대 3일 정도 소요</span>될 수
        있습니다.
      </span>
      <div>
        {/* TODO:Button컴포넌트 사용하기 */}
        <button className="bg-white text-black border rounded-md py-2 px-3">
          <Link href="/">홈으로 가기</Link>
        </button>
        <button className="bg-black text-white rounded-md  py-2 px-6">
          <Link href={`/mypage/my-order/cancel-detail/취소아이디?`}>
            취소 내역 확인
          </Link>
        </button>
      </div>
    </div>
  );
}
