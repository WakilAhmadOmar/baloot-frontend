"use client";
import { MenuItem, Select } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useGetConsumptionTypeQuery } from "@/hooks/api/definitions/consumption/queries/use-get-consumption-type";

interface IPropsConsumptionType {
  name?:string
  dir?:string
}
const ConsumptionTypeSelectBox: React.FC<IPropsConsumptionType> = ({
dir="ltr",
  name
}) => {

  const {
    control,
    formState: { errors },
  } = useFormContext();
  const {data:consumptionTypeList } = useGetConsumptionTypeQuery({page:1})

  return (
    <Controller
      name={name || "consumptionTypeId"}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Select
          fullWidth
          size={"small"}
          value={value}
          error={!!errors?.currencyId}
          required
          onChange={onChange}
        >
          {consumptionTypeList?.map((item:any) => {
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

export default ConsumptionTypeSelectBox;
