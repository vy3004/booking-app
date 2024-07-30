import { DateType } from "react-tailwindcss-datepicker";

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("vi-VN").format(amount) + " VND";

export const ensureDate = (value: DateType | undefined): string | undefined => {
  if (value instanceof Date) {
    return value.toISOString();
  } else if (typeof value === "string") {
    return new Date(value).toISOString();
  }
  return undefined;
};
