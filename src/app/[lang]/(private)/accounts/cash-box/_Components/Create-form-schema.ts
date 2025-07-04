import { object, string } from "yup";

export const useSchemaCrateForm = (t: any) => {
  return object().shape({
    accountId: string().required(t("cashbox.cashbox_is_required")),
    description: string().max(255, t("cashbox.description_to_much")),
    currencyId: string().required(t("cashbox.currency_is_required")),
  });
};
