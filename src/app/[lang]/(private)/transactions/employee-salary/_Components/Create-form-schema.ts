import { number, object, string } from "yup";

export const useSchemaCrateForm = (t: any) => {
  return object().shape({
    safeId: string().required(t?.transactions.payer),
    currencyId: string().required(t?.transactions.currency_is_required),
    amount: number().required(t?.transactions.amount_is_required),
    description: string().max(255, t.transactions?.description_to_much),
    employeeId: string().required(t?.transactions?.full_name_of_employee),
  });
};
