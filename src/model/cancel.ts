export type BaseCancel = {
  transactionKey: string;
  cancelReason: string;
  canceledAt: string;
  cancelStatus: string;
  cancelAmount: number;
  refundableAmount: number;
  taxExemptionAmount: number;
  easyPayDiscountAmount: number;
  receiptKey: string | null;
  cancelRequestId: string | null;
  taxFreeAmount: number;
};

export type CancelInput = BaseCancel & { paymentKey: string };

export type DatabaseCancel = BaseCancel & {
  id: string;
  paymentKey: string;
  createdAt: Date;
  updatedAt: Date;
};
