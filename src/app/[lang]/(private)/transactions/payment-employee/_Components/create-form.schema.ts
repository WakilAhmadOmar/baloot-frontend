import {  number, object, string ,  } from "yup"

export const useSchemaCrateForm = (t:any) => {
return object().shape({
    receiver: string().required(t?.transactions.receiver_is_required),
    payerId: string().required(t?.transactions.customer_is_required),
    currencyId: string().required(t?.transactions.currency_is_required),
    amount:number().required(t?.transactions.amount_is_required),
    calculatedTo:string(),
    amountCalculated:number(),
    billId:string(),
    description:string().max(255 , t.transactions?.description_to_much)
})
}