import { OrderStatus } from "@/model/order";
import { formatOrderStatus } from "@/utils/orderStatus";
import { useSearchParams } from "next/navigation";

type Props = {
  step?: string;
  title: string;
  status: OrderStatus;
};
export default function StepItem({ step, title, status }: Props) {
  const params = useSearchParams();
  const funnelStep = params.get("funnel-step") as string;
  console.log(formatOrderStatus(status));
  const isCurrentStep = formatOrderStatus(status) === title;
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-full aspect-square w-full min-w-24 ${getStyle(
        title,
        funnelStep,
        isCurrentStep
      )}`}
    >
      {step && <span className="font-bold text-lg">STEP {step}</span>}
      <span className={`${step ? "text-xs" : "sm:text-sm lg:text-lg"} `}>
        {title}
      </span>
    </div>
  );
}

function getStyle(title: string, funnelStep: string, isActive: boolean) {
  const backgroundColor =
    funnelStep === title || isActive ? "bg-neutral-700" : "bg-neutral-100";
  const textColor =
    funnelStep === title || isActive ? "text-white" : "text-black";

  return `${backgroundColor} ${textColor}`;
}
