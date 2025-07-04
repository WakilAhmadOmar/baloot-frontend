import { number, object, string } from "yup";
import * as Yup from "yup";

export const useSchemaCrateForm = (t: any) => {
  return object().shape({
    wareObject: Yup.array().of(
      Yup.object().shape({
        productId: string().required(),
        productName:string().notRequired(),
        measures: Yup.array().of(
          Yup.object().shape({
            measureName:string().notRequired(),
            measureId: string().required(),
            amountOfProduct: number().required(),
          })
        ) .required(),
        expireInDate: string(),
      })
    ),
  });
};

// payerId: string().required(t("payer")),
// currencyId: string().required(t("currency_is_required")),
// amount: number().typeError(t("amount_is_required")).required(t("amount_is_required")),
// description: string().max(255, t("description_to_much")),
// receiver: string().required(t("recipient")),