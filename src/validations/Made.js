import { object, number, string } from "yup";
export const MadeValid = object({
  address: string().required("is required").max(45, "More than 45 characters"),
  tID: number("just number")
    .integer("Decimals are not allowed")
    .typeError("Amount must be a number")
    .required("is required")
    .min(0, "less than one"),
  Bid: number("just number")
    .integer("Decimals are not allowed")
    .typeError("Amount must be a number")
    .required("is required")
    .min(0, "less than one"),
});
