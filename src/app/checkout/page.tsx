import AddressTabs from "@/components/buttons/AddressTabs";
import CheckoutSummary from "@/components/CheckoutSummary";

import Link from "next/link";
import Payments from "../payments/page";
import ShippingDetailForm from "@/components/forms/shipping/ShippingDetailForm";

export default function CheckoutPage() {
  return (
    <div className="flex">
      <div className="w-3/5">
        <ShippingDetailForm />
        {/* TODO: 상품정보 */}
        {/* TODO: 마일리지(optional) */}
        <Payments />
      </div>
      <CheckoutSummary />
    </div>
  );
}
