"use client";
import AngleRightIcon from "./icons/AngleRightIcon";
import StepItem from "./StepItem";

export default function CancelProgress() {
  return (
    <div className="flex gap-5">
      <StepItem step="1" title="취소상품 선택" />
      <AngleRightIcon />
      <StepItem step="2" title="취소사유 작성" />
      <AngleRightIcon />
      <StepItem step="3" title="취소정보 확인" />
    </div>
  );
}
