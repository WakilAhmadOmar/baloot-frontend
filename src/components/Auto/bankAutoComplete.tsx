"use client";
import { MenuItem, Select } from "@mui/material";
import {  useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useGetBankListQuery } from "@/hooks/api/definitions/bank/queries/use-get-bank-list-query";

interface IPropsProduct {
  name?: string;
  dir?: string;
  getBank?: (bank: any) => void;
}
const BankAutoComplete: React.FC<IPropsProduct> = ({
  dir = "ltr",
  name,
  getBank,
}) => {
  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const { data: bankList } = useGetBankListQuery();

  const value = watch(name || "bankId");
  useEffect(() => {
    if (bankList?.bank?.length && !value) {
      const defaultCustomer = bankList?.bank?.[0];
      setValue(name || "bankId", defaultCustomer._id);
      if (getBank) {
        getBank(defaultCustomer);
      }
    }
  }, [bankList, setValue, getBank, name, value]);

  return (
    <Controller
      name={name || "bankId"}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Select
          fullWidth
          size={"small"}
          value={value || ""}
          error={!!errors?.[name || "bankId"]}
          required
          onChange={(event) => {
            onChange(event);
            if (getBank) {
              const selectedBank = bankList?.bank?.find(
                (item: any) => item?._id === event.target.value
              );
              getBank(selectedBank);
            }
          }}
        >
          {bankList?.bank?.map((item: any) => {
            return (
              <MenuItem key={item?._id} value={item?._id} dir={dir}>
                {item?.name}
              </MenuItem>
            );
          })}
        </Select>
      )}
    />
  );
};

export default BankAutoComplete;
