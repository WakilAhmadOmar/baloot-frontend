"use client";
import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";

import { Controller, useFormContext } from "react-hook-form";
import { useGetUserCurrenciesQuery } from "@/hooks/api/currencies/queries/use-get-user-currencies";
import { useEffect } from "react";

interface IPropsUserCurrencies {
  defaultValue?: string;
  onSelected?: (currencyId: any) => void;
  name?: string;
  dir?: string;
  required?: boolean;
  disabled?: boolean;
  isBaseCurrency?: boolean;
}
const CurrenciesAutoComplete: React.FC<IPropsUserCurrencies> = ({
  defaultValue,
  onSelected,
  name,
  dir = "ltr",
  required = true,
  disabled = false,
  isBaseCurrency = false,
}) => {
  const { data: currencies } = useGetUserCurrenciesQuery();

  const {
    formState: { errors },
    control,
    register,
    setValue,
    watch,
  } = useFormContext();

  const handleChange = (event: SelectChangeEvent) => {
    const selectedId = event.target.value as string;
    const selectedItem = currencies?.find(
      (item: any) => item?._id === selectedId
    );

    if (onSelected && selectedItem) {
      onSelected(selectedItem);
    }
  };
  const value = watch(name || "currencyId");

  useEffect(() => {
    if (!value && currencies && !isBaseCurrency) {
      setValue(name || "currencyId", currencies?.[0]?._id);
      // if (onSelected && currencies) {
      //   onSelected(currencies?.[0]);
      // }
    }
    if (isBaseCurrency) {
      const findBaseCurrency = currencies?.filter((item: any) => item?.isBase);
      setValue(name || "currencyId", findBaseCurrency?.[0]?._id);
      if (onSelected && findBaseCurrency) {
        onSelected(findBaseCurrency?.[0]);
      }
    }
  }, [value, currencies]);

  return (
    <Box>
      {currencies?.length > 0 && (
        <Controller
          control={control}
          {...register(name || "currencyId", { required })}
          name={name || "currencyId"}
          render={({ field: { onChange, value } }) => (
            <Select
              fullWidth
              size={"small"}
              value={value || ""}
              disabled={disabled}
              defaultValue={defaultValue}
              error={!!errors?.[name || "currencyId"]}
              required
              onChange={(event) => {
                onChange(event);
                handleChange(event);
              }}
            >
              {currencies?.map((item: any) => {
                return (
                  <MenuItem key={item?._id} value={item?._id} dir={dir}>
                    {item?.name}
                  </MenuItem>
                );
              })}
            </Select>
          )}
        />
      )}
    </Box>
  );
};

export default CurrenciesAutoComplete;
