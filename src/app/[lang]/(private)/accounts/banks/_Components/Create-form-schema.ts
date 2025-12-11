import { CreditType } from "@/types/accounts/account.type";
import { array, number, object, string, InferType, ObjectSchema } from "yup";

// Base schema for type inference (without translation function)
const createFormSchemaBase = object().shape({
  bankId: string().required(),
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

export const useSchemaCrateForm = (t: (data:string) => string): ObjectSchema<CreateFormType> => {
  return object().shape({
    bankId: string().required(t("bank.bank_is_required")),
    description: string().max(255, t("bank.description_to_much")),
    firstPeriodCredit: array().of(
      object().shape({
        amount: number().required(t("bank.amount_is_required")),
        creditType: string().oneOf(Object.values(CreditType)).required(""),
        currencyId: string().required(t("bank.currency_is_required")),
      })
    ),
  }) as ObjectSchema<CreateFormType>;
};
