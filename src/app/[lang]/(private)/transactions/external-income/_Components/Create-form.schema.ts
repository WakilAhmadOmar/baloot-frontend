import {  number, object, string ,  } from "yup"

export const useSchemaCrateForm = (t:any) => {
return object().shape({
    receiver: string().required(t("receiver")),
    externalIncomeTypeId: string().required(t("external_income_type")),
    currencyId: string().required(t("currency_is_required")),
    amount:number().required(t("amount_is_required")),
    description:string().max(255 , t("description_to_much"))
})
}