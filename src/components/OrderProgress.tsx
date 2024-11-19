import StepItem from "./StepItem";
import AngleRightIcon from "./icons/AngleRightIcon";

export default function OrderProgress() {
  return (
    <div className="flex items-center w-full">
      <StepItem title="입금대기" />
      <AngleRightIcon />
      <StepItem title="결제완료" />
      <AngleRightIcon />
      <StepItem title="상품준비중" />
      <AngleRightIcon />
      <StepItem title="배송시작" />
      <AngleRightIcon />
      <StepItem title="배송중" />
      <AngleRightIcon />
      <StepItem title="배송완료" />
    </div>
  );
}
