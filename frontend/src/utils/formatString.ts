export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("vi-VN").format(amount) + " VND";
