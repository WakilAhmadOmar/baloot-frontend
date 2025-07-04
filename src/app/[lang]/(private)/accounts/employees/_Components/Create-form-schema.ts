import { number, object, string } from "yup";

export const useSchemaCrateForm = (t: any) => {
  return object().shape({
    accountId: string().required(t("employee.employee_name_is_required")),
    description: string().max(255, t("employee.description_to_much")),
    currencyId: string().required(t("employee.currency_is_required")),
  });
};
