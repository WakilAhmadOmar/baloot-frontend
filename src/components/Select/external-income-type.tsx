"use client";
import { MenuItem, Select } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useGetExternalIncomeTypeListQuery } from "@/hooks/api/definitions/external-income/queries/use-get-external-income-type";

interface IPropsExternalIncomeType {
  name?:string,
  dir?:string
}
export const ExternalIncomeTypeSelectBox: React.FC<IPropsExternalIncomeType> = ({
dir="ltr",
  name
}) => {

  const {
    control,
    formState: { errors },
  } = useFormContext();
  const {data:externalIncomeTypeList } = useGetExternalIncomeTypeListQuery()

  return (
    <Controller
      name={name || "externalIncomeTypeId"}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Select
          fullWidth
          size={"small"}
          value={value}
          error={!!errors?.externalIncomeTypeId}
          required
          onChange={onChange}
        >
          {externalIncomeTypeList?.map((item:any) => {
            return (
              <MenuItem key={item?._id} value={item?._id} dir={dir} >
                {item?.name}
              </MenuItem>
            );
          })}
        </Select>
      )}
    />

  );
};

