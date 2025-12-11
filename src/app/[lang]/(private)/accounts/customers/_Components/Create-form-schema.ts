import { CreditType } from "@/types/accounts/account.type";
import { array, InferType, number, object, ObjectSchema, string } from "yup";

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


export const useSchemaCrateForm = (t: (data: string) => string): ObjectSchema<CreateFormType> => {
  return object().shape({
    accountId: string().required(t("Customers.customer_name_is_required")),
    description: string().max(255, t("Customers.description_to_much")),
    firstPeriodCredit: array().of(
      object().shape({
        amount: number().required(t("Customers.amount_is_required")),
        creditType: string().oneOf(Object.values(CreditType)).required(""),
        currencyId: string().required(t("Customers.currency_is_required")),
      })
    ),
  }) as ObjectSchema<CreateFormType>;
};
