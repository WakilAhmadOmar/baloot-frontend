import { number, object, string } from "yup";

export const useSchemaCrateForm = (t: any) => {
  return object().shape({
    safeId: string().required(t("payer")),
    currencyId: string().required(t("currency_is_required")),
    amount: number().required(t("amount_is_required")),
    description: string().max(255, t("description_to_much")),
    employeeId: string().required(t("full_name_of_employee")),
  });
};
