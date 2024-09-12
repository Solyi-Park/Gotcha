export const getDiscountedPrice = (
  originalPrice: number,
  discountRate: number
): string => {
  const discountAmount = originalPrice * (discountRate / 100);
  const discountedPrice = originalPrice - discountAmount;

  return discountedPrice.toLocaleString();
};
