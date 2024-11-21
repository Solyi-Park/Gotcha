import { OrderStatus } from "@/model/order";
import StepItem from "./StepItem";
import AngleRightIcon from "./icons/AngleRightIcon";
import { formatOrderStatus } from "@/utils/orderStatus";

type Props = {
  status: OrderStatus;
};

export default function OrderProgress({ status }: Props) {
  return (
    <div className="flex items-center w-full">
      <StepItem title="입금대기" status={status} />
      <AngleRightIcon />
      <StepItem title="결제완료" status={status} />
      <AngleRightIcon />
      <StepItem title="상품준비중" status={status} />
      <AngleRightIcon />
      <StepItem title="배송시작" status={status} />
      <AngleRightIcon />
      <StepItem title="배송중" status={status} />
      <AngleRightIcon />
      <StepItem title="배송완료" status={status} />
    </div>
  );
}
