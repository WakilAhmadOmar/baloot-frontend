import {  number, object, string ,  } from "yup"

export const useSchemaCrateForm = (t:any) => {
return object().shape({
    payer: string().required(t("payer")),
    consumptionTypeId: string().required(t("consumption_type")),
    currencyId: string().required(t("currency_is_required")),
    amount:number().required(t("amount_is_required")),
    description:string().max(255 , t("description_to_much"))
})
}