import { BANKS } from "@/constants/banks";
import { CARD_COMPANIES } from "@/constants/cardCompanies";

export function getEasypayCompany(code: string) {
  const bank = BANKS.find((bank) => bank.code === code);
  return bank?.koreanName;
}

export function getCardCompanyName(code: string) {
  const cardCompany = CARD_COMPANIES.find((company) => company.code === code);
  return cardCompany?.koreanName;
}

export function getBankName(code: string) {
  const bank = BANKS.find((bank) => bank.code === code);
  return bank?.koreanName;
}
