import {  number, object, string ,  } from "yup"

export const useSchemaCrateForm = (t:any) => {
return object().shape({
    receiver: string().required(t?.transactions.receiver),
    externalIncomeTypeId: string().required(t?.transactions.external_income_type),
    currencyId: string().required(t?.transactions.currency_is_required),
    amount:number().required(t?.transactions.amount_is_required),
    description:string().max(255 , t.transactions?.description_to_much)
})
}