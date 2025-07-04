import { number, object, string } from "yup";

export const useSchemaCrateForm = (t: any) => {
  return object().shape({
    accountId: string().required(t("Customers.customer_name_is_required")),
    description: string().max(255, t("Customers.description_to_much")),
    currencyId: string().required(t("Customers.currency_is_required")),
  });
};
