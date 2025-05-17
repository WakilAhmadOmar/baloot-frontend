import {  number, object, string ,  } from "yup"

export const useSchemaCrateForm = (t:any) => {
return object().shape({
    payer: string().required(t?.transactions.payer),
    consumptionTypeId: string().required(t?.transactions.consumption_type),
    currencyId: string().required(t?.transactions.currency_is_required),
    amount:number().required(t?.transactions.amount_is_required),
    description:string().max(255 , t.transactions?.description_to_much)
})
}