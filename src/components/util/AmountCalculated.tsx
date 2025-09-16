"use client";
import { useGetUserCurrenciesQuery } from "@/hooks/api/currencies/queries/use-get-user-currencies";
import { Box, InputLabel, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export function AmountCalculated() {
  const t = useTranslations("invoice");
  const { register, setValue, watch } = useFormContext();
  const currencyId = watch("currencyId");
  const amount = watch("amount");
  const calculatedTo = watch("calculatedTo");

  const { data: currencies, isLoading } = useGetUserCurrenciesQuery();

  useEffect(() => {
    if (calculatedTo && currencyId) {
      const findSelectedCurrency = currencies?.find(
        (item: any) => item?._id === currencyId
      );
      if (findSelectedCurrency) {
        const result = amount / findSelectedCurrency.rate;
        const formattedResult = Number.isInteger(result)
          ? result
          : result.toFixed(2);
        setValue("amountCalculated", formattedResult);
      }
    }
  }, [calculatedTo, currencyId, amount]);

  return (
    <Box>
      <InputLabel required >{t("amount_calculated")}</InputLabel>
      <TextField
        fullWidth
        size="small"
        {...register("amountCalculated", { required: false })}
        name={"amountCalculated"}
        disabled
      />
    </Box>
  );
}
