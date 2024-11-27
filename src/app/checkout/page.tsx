import CheckoutSummary from "@/components/CheckoutSummary";
import Payments from "../payments/page";
import ShippingDetailForm from "@/components/forms/shipping/ShippingDetailForm";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    redirect("/auth/signin");
  }
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
