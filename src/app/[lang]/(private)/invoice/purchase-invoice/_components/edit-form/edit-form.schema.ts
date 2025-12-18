"use client";
import * as Yup from "yup";

export interface MeasureSchema {
  measureId: string;
  amount: number;
  buyPrice: number;
  discount?: number | null;
  discountPercentage?: number | null;
  selected?: boolean | null;
  measureName: string;
}

export interface ProductSchema {
  productId: string;
  productName: string;
  measures: MeasureSchema[];
  warehouse?: string | null;
  expireInDate: Date;
  // expireInDateSelected:string
}

export interface EditFormSchema {
  customerId: string;
  warehouseId: string;
  currencyId: string;
  products: ProductSchema[];
  totalPrice: number;
  totalPriceOfBillAfterConsumption: number;
  contact_number?: string | null | undefined;
}

const useSchemaEditForm = (t: any) =>
  Yup.object().shape({
    customerId: Yup.string().required(t("customer_name_is_required")),
    warehouseId: Yup.string().required(t("warehouse_is_required")),
    currencyId: Yup.string().required(t("currency_is_required")),
    totalPrice: Yup.number().required(),
    totalPriceOfBillAfterConsumption: Yup.number().required(),
    contact_number: Yup.string().nullable().notRequired(),
    products: Yup.array()
      .of(
        Yup.object().shape({
          productId: Yup.string().required(t("product_name_is_required")),
          productName: Yup.string().required(),
          measures: Yup.array()
            .of(
              Yup.object().shape({
                measureId: Yup.string().required(t("product_units_is_required")),
                measureName: Yup.string().required(),
                amount: Yup.number().required(t("product_count_is_required")),
                buyPrice: Yup.number().required(t("product_price_is_required")),
                discount: Yup.number().nullable(),
                discountPercentage: Yup.number().nullable(),
                selected: Yup.boolean().nullable(),
              })
            )
            .required()
            .default([]),
          warehouse: Yup.string().notRequired().nullable(),
          expireInDate: Yup.date().required(t("expire_in_date_is_required")),
          // expireInDateSelected:Yup.string().required(t("expire_in_date_is_required"))
        })
      )
      .min(1, t("at_least_one_product_is_require"))
      .required(),
  });

export default useSchemaEditForm;
