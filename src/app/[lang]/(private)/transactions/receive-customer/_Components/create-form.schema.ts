import {  number, object, string ,  } from "yup"

export const useSchemaCrateForm = (t:any) => {
return object().shape({
    receiver: string().required(t("receiver_is_required")),
    payerId: string().required(t("customer_is_required")),
    currencyId: string().required(t("currency_is_required")),
    amount:number().typeError(t("amount_is_required")).required(t("amount_is_required")),
    calculatedTo:string(),
    amountCalculated:number(),
    invoiceType:string(),
    billId:string(),
    description:string().max(255 , t("description_to_much"))
})
}