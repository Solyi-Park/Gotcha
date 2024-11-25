export type Payment = {
  paymentKey: string;
  orderId: string;
  method: "카드" | "간편결제" | "계좌이체";
  card: string | null;
  easyPay: string | null;
  transfer: string | null;
  approvedAt: string;
  orderName: string;
  totalAmount: number;
  receipt: string;
  createdAt: string;
  status:
    | "READY"
    | "IN_PROGRESS"
    | "WAITING_FOR_DEPOSIT"
    | "DONE"
    | "CANCELED"
    | "PARTIAL_CANCELED"
    | "ABORTED"
    | "EXPIRED";
};

export type PaymentInput = Omit<Payment, "createdAt">;
