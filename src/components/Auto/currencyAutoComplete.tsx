"use client";
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { Controller, useFormContext } from "react-hook-form";
import { useGetUserCurrenciesQuery } from "@/hooks/api/currencies/queries/use-get-user-currencies";
import { useContext, useEffect } from "react";
import { InvoiceContext } from "@/app/[lang]/(private)/invoice/_components/invoiceContext";

interface IPropsUserCurrencies {
  defaultValue?: string;
  onSelected?: (currencyId: any) => void;
  name?: string;
  dir?: string;
  required?: boolean;
  disabled?:boolean
  isBaseCurrency?:boolean
  
}
const CurrenciesAutoComplete: React.FC<IPropsUserCurrencies> = ({
  defaultValue,
  onSelected,
  name,
  dir = "ltr",
  required = true,
  disabled = false,
  isBaseCurrency = false

}) => {
const { setBaseCurrency} = useContext(InvoiceContext)
    const {data:currencies , isLoading} = useGetUserCurrenciesQuery()

  const {
    formState: { errors },
    control,
    register,
    setValue
  } = useFormContext();

  const handleChange = (event: SelectChangeEvent) => {
    const selectedId = event.target.value as string;
    const selectedItem = currencies?.find(
      (item:any) => item?._id === selectedId
    );

    if (onSelected && selectedItem) {
      onSelected(selectedItem);
    }
  };

  useEffect(() =>{
    if (isBaseCurrency && disabled && currencies){
      const findBaseCurrency = currencies?.filter((item:any) => item?.isBase)
      setBaseCurrency(findBaseCurrency?.[0])
      setValue("currencyId" , findBaseCurrency?.[0]?._id)
    }
  },[isBaseCurrency , disabled , currencies])

  return (
    <Box>
      {currencies?.length > 0 && (
        <Controller
          control={control}
          {...register(name || "currencyId", { required })}
          name={name || "currencyId"}
          render={({ field: { onChange, value } }) => (
            <Select
              // label="Status"
              fullWidth
              size={"small"}
              value={value}
              disabled={disabled}
              defaultValue={defaultValue}
              // options={PROGRAM_STATUS}
              // placeholder="Please select status"
              error={!!errors?.[name || "currencyId"]}
              // helperText={errors?.currencyId?.message}
              required
              onChange={(event) => {
                onChange(event);
                handleChange(event);
              }}
            >
              {currencies?.map((item:any) => {
                return (
                  <MenuItem key={item?._id} value={item?._id} dir={dir}>
                    {item?.name}
                  </MenuItem>
                );
              })}
            </Select>
          )}
        />
        // <Select
        //   fullWidth
        //   size={"small"}
        //   defaultValue={defaultValue?._id || userCurrenciesState?.[0]?._id}
        //   {...(register ?  register("currencyId" , {required:isRequired}) : {})}
        //   onChange={handleChange}
        // >
        // {userCurrenciesState?.map((item) => {
        //   return (
        //     <MenuItem key={item?._id} value={item?._id}>
        //       {item?.name}
        //     </MenuItem>
        //   );
        // })}
        // </Select>
      )}
      
    </Box>
  );
};

export default CurrenciesAutoComplete;
