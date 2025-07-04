"use client"
import * as Yup from "yup";

export interface MeasureSchema {
  measureId: string;
  amount: number;
  sellPrice: number;
  discount?: number | null;
  discountPercentage?: number | null;
  selected?: boolean | null;
  measureName:string
}

export interface ProductSchema {
  productId: string;
  measures: MeasureSchema[];
  warehouse?: string | null;
}

export interface CreateFormSchema {
  customerId: string;
  warehouseId: string;
  currencyId: string;
  products: ProductSchema[];
}

const useSchemaCrateForm = (t: any) =>
  Yup.object().shape({
    customerId: Yup.string().required(t("customer_name_is_required")),
    warehouseId: Yup.string().required(t("warehouse_is_required")),
    currencyId: Yup.string().required(t("currency_is_required")),
    products: Yup.array()
      .of(
        Yup.object().shape({
          productId: Yup.string().required(),
          measures: Yup.array()
            .of(
              Yup.object().shape({
                measureId: Yup.string().required(),
                measureName:Yup.string().required(),
                amount: Yup.number().required(),
                sellPrice: Yup.number().required(),
                discount: Yup.number().notRequired().nullable(),
                discountPercentage: Yup.number().notRequired().nullable(),
                selected: Yup.boolean().notRequired().nullable(),
              })
            )
            .required(),
          warehouse: Yup.string().notRequired().nullable(),
        })
      )
      .min(1, t("at_least_one_product_is_require"))
      .required(),
  });

export default useSchemaCrateForm;