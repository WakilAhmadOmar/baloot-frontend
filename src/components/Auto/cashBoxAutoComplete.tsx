import { MenuItem, Select } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useGetSafeListQuery } from "@/hooks/api/definitions/safe/queries/use-get-safe-list-query";
import { useEffect } from "react";

interface IPropsProduct {
  name?: string;
  dir?: string;
  getCashbox?: (cashbox: any) => void;
}
const CashBoxAutoComplete: React.FC<IPropsProduct> = ({
  dir = "ltr",
  name,
  getCashbox,
}) => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const { data: safeList } = useGetSafeListQuery({ page: 1 });

  

  const value = watch(name || "cashboxId");
  useEffect(() => {
    if (safeList?.safe?.length && !value) {
      const defaultCustomer = safeList.safe[0];
      setValue(name || "cashboxId", defaultCustomer._id);
      // if (getCashbox) {
      //   getCashbox(defaultCustomer);
      // }
    }
  }, [safeList, setValue, getCashbox, name, value]);
  return (
    <Controller
      name={name || "cashboxId"}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Select
          fullWidth
          size={"small"}
          value={value}
          error={!!errors?.[name || "cashboxId"]}
          required
          onChange={(event) => {
            onChange(event);
            if (getCashbox) {
              const selectedCustomer = safeList?.safe?.find(
                (item: any) => item?._id === event.target.value
              );
              getCashbox(selectedCustomer);
            }
          }}
        >
          {safeList?.safe?.map((item: any) => {
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

export default CashBoxAutoComplete;
