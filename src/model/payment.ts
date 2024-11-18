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

export type PaymentInput = Omit<Payment, "cancels">;

export type Cancels = {};

export type Cancel = {
  paymentKey: string;
  transactionKey: string;
  cancelReason: string;
  canceledAt: string;
  cancelStatus: string;
  cancelAmount: number;
  refundableAmount: number;
  taxExemptionAmount: number;
  easyPayDiscountAmount: number;
  receiptKey: string;
  cancelRequestId: string;
  taxFreeAmount: number;
};

export type CancelResult = Omit<Cancel, "paymentKey">;
