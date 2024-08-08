import { object, number } from "yup";
export const startValid = object({
  start: number("just number")
    .required("is required")
    .integer("Decimals are not allowed")
    .typeError("Amount must be a number")
    .min(1, "less than one"),
});
