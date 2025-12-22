"use client";
import { string, number, object, array, InferType } from "yup";

//get the type of the schema

const useSchemaCreateForm = (t: any) =>
  object().shape({
    name: string().required(t("product_name_is_required")),
    category: string().required(t("category_name_is_required")),
    currencyId: string().required(t("currency_is_required")),
    barcode: string().optional(),
    measures: array()
      .of(
        object().shape({
          measureId: string().required(t("measure_is_required")),
          measureName: string().optional(),
          buyPrice: number()
            .required(t("amount_is_required"))
            .typeError(t("amount_is_required")),
          sellPrice: number()
            .required(t("amount_is_required"))
            .typeError(t("amount_is_required")),
          conversionFactor: number()
            .typeError(t("amount_is_required"))
            // It seems it's required for secondary units but maybe not for the first one?
            // The form only renders it for index > 0.
            // But structurally, the field exists on the object.
            // I'll make it optional generally, or required.
            // Given the code `errors.measures[index]?.conversionFactor`, validation is expected.
            // Simplest is to make it a number, maybe required validation is handled conditionally or it's always required but effectively 1 for base?
            // Let's stick to simple number() for now, maybe with min(1).
            .transform((value) => (isNaN(value) ? undefined : value))
            .nullable()
            .optional(),
        })
      )
      .min(1, t("measure_is_required"))
      .required(),

  });

  export type CreateProductFormSchema = InferType<ReturnType<typeof useSchemaCreateForm>>;
  export default useSchemaCreateForm;
