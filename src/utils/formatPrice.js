export const formatPrice = (price) => {
  if (!price) return 0;
  let priceNum = typeof price !== "string" ? String(price) : price;
  return priceNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};