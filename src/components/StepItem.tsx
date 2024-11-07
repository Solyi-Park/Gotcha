import { useSearchParams } from "next/navigation";

type Props = {
  step: string;
  title: string;
};
export default function StepItem({ step, title }: Props) {
  const params = useSearchParams();
  const funnelStep = params.get("funnel-step");

  return (
    <div
      className={`flex flex-col items-center justify-center w-36 h-36 rounded-full ${getStyle(
        title,
        funnelStep ?? ""
      )}`}
    >
      <span className={`font-bold text-lg`}>STEP {step}</span>
      <span className={`text-xs `}>{title}</span>
    </div>
  );
}

function getStyle(title: string, funnelStep: string) {
  return funnelStep === title
    ? "bg-neutral-700 text-white"
    : "bg-neutral-300 text-black";
}
