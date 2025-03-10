"use client"
import * as Yup from "yup";


export interface CreateFormSchema {
  customer:string,
  warehouse:string,
  currency:string
}
const useSchemaCrateForm = (t:any) => {
 

  return Yup.object().shape({
    customer: Yup.string().required(t?.invoice?.customer_name_is_required),
    warehouse:Yup.string()?.required(t?.invoice?.warehouse_is_required),
    currency:Yup.string()?.required(t?.invoice?.currency_is_required)
  });
};

export default useSchemaCrateForm;