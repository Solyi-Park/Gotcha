import LoadingSpinner from "@/components/LoadingSpinner";
import PaymentFail from "@/components/PaymentFail";
import { Suspense } from "react";

export default function FailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex py-16 items-center">
          <LoadingSpinner />
        </div>
      }
    >
      <PaymentFail />
    </Suspense>
  );
}
