import { number, object, string } from "yup";

export const useSchemaCrateForm = (t: any) => {
  return object().shape({
    bankId: string().required(t("bank.bank_is_required")),
    description: string().max(255, t("bank.description_to_much")),
    currencyId: string().required(t("bank.currency_is_required")),
  });
};
