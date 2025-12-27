"use client";
import * as Yup from "yup";

export interface MeasureSchema {
  measureId: {
    _id: string;
    name?: string;
  };
  quantity: number;
  buyPrice: number;
  expense: number;
  totalExpense: number;
  selected?: boolean | null;
  total: number;
}

export interface ProductSchema {
  productId: string;
  price: MeasureSchema[];
  expireInDate: Date | null;
  total: number;
  expense: number;
  name?: string;
}

export interface CreateFormSchema {
  customerId: string;
  warehouseId: string;
  currencyId: string;
  products: ProductSchema[];
  totalPrice: number;
  totalPriceAfterExpense: number;
  contact_number?: string | null | undefined;
  paymentMethod: string;
}

const useSchemaCrateForm = (t: any) =>
  Yup.object().shape({
    customerId: Yup.string().required(t("customer_name_is_required")),
    warehouseId: Yup.string().required(t("warehouse_is_required")),
    currencyId: Yup.string().required(t("currency_is_required")),
    totalPrice: Yup.number().required(),
    totalPriceAfterExpense: Yup.number().required(),
    contact_number: Yup.string().nullable().notRequired(),
    paymentMethod: Yup.string().required(),
    products: Yup.array()
      .of(
        Yup.object().shape({
          productId: Yup.string().required(t("product_name_is_required")),
          name: Yup.string().optional(),
          price: Yup.array()
            .of(
              Yup.object().shape({
                buyPrice: Yup.number().required(t("product_price_is_required")),
                measureId: Yup.object().shape({
                  _id: Yup.string().required(t("product_units_is_required")),
                  name: Yup.string().optional(),
                }),
                quantity: Yup.number().required(t("product_count_is_required")),
                expense: Yup.number().required().default(0),
                totalExpense: Yup.number().required().default(0),
                total: Yup.number().required().default(0),
                selected: Yup.boolean().nullable(),
              })
            )
            .required()
            .default([]),

          expireInDate: Yup.date()
            .nullable()
            .required(t("expire_date_is_required")),
          expense: Yup.number().required().default(0),
          total: Yup.number().required().default(0),
        })
      )
      .min(1, t("at_least_one_product_is_require"))
      .required(),
  });

export default useSchemaCrateForm;
