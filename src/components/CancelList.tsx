import { OrderData } from "@/model/order";
import useCancelStore from "@/store/cancel";
import OrderProductDetail from "./OrderProductDetail";
import { formatOrderStatus } from "@/utils/orderStatus";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";
import { useEffect } from "react";

type Props = {
  order: OrderData | undefined;
  isLoading: boolean;
};
export default function CancelList({ order, isLoading }: Props) {
  console.log("order정보", order, isLoading);
  const router = useRouter();

  const {
    selectedItems,
    setSelectedItems,
    addItem,
    removeItem,
    updateQuantity,
  } = useCancelStore();

  useEffect(() => {
    if (order?.items) {
      const items = order.items.reduce((acc, item) => {
        acc[item.id] = item.quantity;
        return acc;
      }, {} as Record<string, number>);

      setSelectedItems(items);
    }
  }, [order]);

  const handleCheckboxChange = (itemId: string, quantity: number) => {
    if (selectedItems[itemId]) {
      removeItem(itemId);
    } else {
      addItem(itemId, quantity);
    }
  };

  const handleQuantityChange = (
    itemId: string,
    delta: number,
    maxQuantity: number
  ) => {
    updateQuantity(itemId, delta, maxQuantity);
  };
  console.log("selectedItems:", selectedItems);

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      <section className="flex w-full border-black border-b-[1px] py-3 font-semibold items-center text-center">
        <div className="flex-[0.5] border-r-2">상품정보</div>
        <div className="flex-[0.25] border-r-2">진행상태</div>
        <div className="flex-[0.25]">수량선택</div>
      </section>

      {order &&
        order.items?.map((item) => (
          <div key={item.id} className="flex w-full h-40">
            <div className="flex flex-[0.5] border border-l-0 h-full justify-start items-center">
              <input
                type="checkbox"
                checked={!!selectedItems[item.id]}
                onChange={() => handleCheckboxChange(item.id, item.quantity)}
              />
              <OrderProductDetail item={item} options={item.options} />
            </div>
            <div className="flex flex-[0.25] border border-l- h-full justify-center items-center">
              <span>{order && formatOrderStatus(order.status)}</span>
            </div>
            <div className="flex flex-[0.25] border border-l-0 h-full justify-center items-center">
              <button
                className="px-2 py-1 bg-gray-200"
                onClick={() => handleQuantityChange(item.id, -1, item.quantity)}
              >
                -
              </button>
              <span className="border px-2 py-1">
                {selectedItems[item.id] || item.quantity}
              </span>
              <button
                className="px-2 py-1 bg-gray-200"
                onClick={() => handleQuantityChange(item.id, +1, item.quantity)}
              >
                +
              </button>
            </div>
          </div>
        ))}

      {/* TODO: Button 컴포넌트에 size 프롭스추가해서, 취소 프로세스에 재사용 */}
      <div className="flex justify-end">
        <button
          className="bg-black text-white px-3 py-2 rounded-md"
          onClick={() =>
            router.push(
              `/mypage/my-order/cancel/${order?.id}?funnel-step=취소사유+작성`
            )
          }
        >
          선택완료
        </button>
      </div>
    </div>
  );
}
