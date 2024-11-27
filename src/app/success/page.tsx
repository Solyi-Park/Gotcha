import LoadingSpinner from "@/components/LoadingSpinner";
import PaymentSuccess from "@/components/paymentSuccess";
import { Suspense } from "react";

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex py-16 items-center">
          <LoadingSpinner />
        </div>
      }
    >
      <PaymentSuccess />
    </Suspense>
  );
}
