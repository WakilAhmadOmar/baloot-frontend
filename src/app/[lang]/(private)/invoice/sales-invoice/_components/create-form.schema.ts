"use client"
import * as Yup from "yup";


export interface CreateFormSchema {
  customerId:string,
  warehouseId:string,
  currencyId:string
}
const useSchemaCrateForm = (t:any) => {
 

  return Yup.object().shape({
    customerId: Yup.string().required(t?.invoice?.customer_name_is_required),
    warehouseId:Yup.string()?.required(t?.invoice?.warehouse_is_required),
    currencyId:Yup.string()?.required(t?.invoice?.currency_is_required)
  });
};

export default useSchemaCrateForm;