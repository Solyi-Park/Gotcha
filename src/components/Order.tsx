import { OrderData } from "@/model/order";
import OrderDetailLink from "./OrderDetailLink";
import OrderItem from "./OrderItem";

type OrderProps = {
  order: OrderData;
};

export default function Order({ order }: OrderProps) {
  return (
    <ul>
      {order.items.map((item) => (
        <li key={item.id}>
          <OrderItem
            key={item.id}
            item={item}
            orderStatus={order.status}
            orderId={order.id}
            shippingCost={order.shippingCost}
          />
        </li>
      ))}
    </ul>
  );
}
