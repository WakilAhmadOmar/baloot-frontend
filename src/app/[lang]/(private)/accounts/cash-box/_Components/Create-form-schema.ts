import { array, InferType, ObjectSchema, object, string, number } from "yup";
import { CreditType } from "@/types/accounts/account.type";

// Base schema for type inference (without translation function)
const createFormSchemaBase = object().shape({
  accountId: string().required(),
  description: string().max(255),
  firstPeriodCredit: array().of(
    object().shape({
      amount: number().required(),
      creditType: string().oneOf(Object.values(CreditType)).required(),
      currencyId: string().required(),
    })
  ),
});

// Extract TypeScript type from the schema
export type CreateFormType = InferType<typeof createFormSchemaBase>;

export const useSchemaCrateForm = (
  t: (data: string) => string
): ObjectSchema<CreateFormType> => {
  return object().shape({
    accountId: string().required(t("cashbox.cashbox_is_required")),
    description: string().max(255, t("cashbox.description_to_much")),
    firstPeriodCredit: array().of(
      object().shape({
        amount: number().required(t("cashbox.amount_is_required")),
        creditType: string().oneOf(Object.values(CreditType)).required(""),
        currencyId: string().required(t("cashbox.currency_is_required")),
      })
    ),
  }) as ObjectSchema<CreateFormType>;
};
