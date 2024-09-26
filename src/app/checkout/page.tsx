import AdressForm from "@/components/forms/adress/AdressForm";
import PaymentSummary from "@/components/PaymentSummary";

export default function CheckoutPage() {
  return (
    <>
      <AdressForm />
      <PaymentSummary />
    </>
  );
}
