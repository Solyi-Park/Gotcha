import CheckoutSummary from "@/components/CheckoutSummary";
import Payments from "../payments/page";
import ShippingDetailForm from "@/components/forms/shipping/ShippingDetailForm";

export default function CheckoutPage() {
  return (
    <div className="flex mt-5 justify-center">
      <div className="w-3/5">
        <ShippingDetailForm />
        <CheckoutSummary />
        <Payments />
      </div>
    </div>
  );
}
