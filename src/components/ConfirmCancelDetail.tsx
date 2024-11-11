import useCancelStore from "@/store/cancel";
import OrderProductDetail from "./OrderProductDetail";
import { OrderItemWithProduct } from "@/model/order";

type Props = {
  items: OrderItemWithProduct[];
};
export default function ConfirmCancelDetail({ items }: Props) {
  const { selectedItems, cancelReason, cancelReasonDetail } = useCancelStore();
  console.log("selectedItems", selectedItems);
  console.log("cancelReason", cancelReason);
  console.log("cancelReasonDetail", cancelReasonDetail);
  const filteredItems = items
    .filter((item) => selectedItems[item.id] !== undefined)
    .map((item) => ({
      ...item,
      selectedQuantity: selectedItems[item.id],
    }));

  console.log("filteredItems", filteredItems);
  return (
    <>
      <section>
        <h3>상품정보</h3>
        <ul>
          {filteredItems.map((item) => (
            <li key={item.id}>
              <OrderProductDetail item={item} options={item.options} cancel />
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3>취소 / 환불 정보</h3>
      </section>
    </>
  );
}
