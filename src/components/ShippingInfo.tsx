import { OrderOutputForOrderDetail } from "@/model/order";
import SectionTitle from "./SectionTitle";
import { maskAddress, maskPhoneNumber } from "@/utils/maskPersonalInfo";

type Props = {
  order: OrderOutputForOrderDetail;
};

export default function ShippingInfo({ order }: Props) {
  console.log("order>>", order);
  return (
    <section>
      <SectionTitle title="배송지정보" />
      <table className="w-full">
        <colgroup>
          <col style={{ width: "20%" }} />
          <col style={{ width: "30%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "30%" }} />
        </colgroup>
        <tbody>
          <tr className="border-b">
            <th className="border-r font-normal" scope="row">
              받는사람
            </th>
            <td className="py-3 px-10 font-bold" colSpan={3}>
              {order.recipient}
            </td>
          </tr>
          <tr className="border-b">
            <th className="border-r font-normal" scope="row">
              전화번호
            </th>
            <td className="border-r  py-3 px-10 font-bold">
              {order.contact2 || "-"}
            </td>
            <th className="border-r font-normal" scope="row">
              휴대폰
            </th>
            <td className="py-3 px-10 font-bold">
              {maskPhoneNumber(order.contact1)}
            </td>
          </tr>
          <tr className="border-b">
            <th className="border-r font-normal" scope="row">
              주소
            </th>
            <td className="py-3 px-10 font-bold" colSpan={3}>
              {maskAddress(order.address ?? "", order.addDetail ?? "")}
            </td>
          </tr>
          <tr className="border-b">
            <th className="border-r font-normal" scope="row">
              배송요청사항
            </th>
            <td className="py-3 px-10 font-bold" colSpan={3}>
              {order.customDeliveryNote !== ""
                ? order.customDeliveryNote
                : order.deliveryNote || "-"}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
