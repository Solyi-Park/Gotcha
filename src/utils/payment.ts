import { BANKS } from "@/constants/banks";
import { CARD_COMPANIES } from "@/constants/cardCompanies";
import { Payment } from "@/model/payment";

export function getEasypayCompany(code: string) {
  const bank = BANKS.find((bank) => bank.code === code);
  return bank?.koreanName;
}

export function getCardCompanyName(code: string) {
  const cardCompany = CARD_COMPANIES.find((company) => company.code === code);
  return cardCompany?.company;
}

export function getBankName(code: string) {
  const bank = BANKS.find((bank) => bank.code === code);
  return bank?.bankName;
}

export function getPaymentMethod(payment: Payment) {
  const { method, easyPay, transfer, card } = payment;
  switch (method) {
    case "간편결제":
      return easyPay || null;
    case "계좌이체":
      return getBankName(transfer || "");
    case "카드":
      return getCardCompanyName(card || "");
  }
}
