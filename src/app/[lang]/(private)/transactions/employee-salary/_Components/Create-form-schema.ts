import { number, object, string } from "yup";

export const useSchemaCrateForm = (t: any) => {
  return object().shape({
    payerId: string().required(t("payer")),
    currencyId: string().required(t("currency_is_required")),
    amount: number().typeError(t("amount_is_required")).required(t("amount_is_required")),
    description: string().max(255, t("description_to_much")),
    receiver: string().required(t("recipient")),
  });
};
