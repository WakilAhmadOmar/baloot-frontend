"use client";
import { Controller, useFormContext } from "react-hook-form";
import { MenuItem, Select } from "@mui/material";
import { useGetCustomerListQuery } from "@/hooks/api/definitions/customer/queries/use-get-customer-list-query";
import { useEffect } from "react";

interface IProps {
  name?: string;
  dir?: string;
  getCustomer?: (customer: any) => void;
  disabled?: boolean;
}
const CustomerAutoComplete: React.FC<IProps> = ({
  dir = "ltr",
  name,
  getCustomer,
  disabled = false,
}) => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const { data: getCustomerList } = useGetCustomerListQuery({ page: 1 });

  const value = watch(name || "customerId");

  useEffect(() => {
    if (getCustomerList?.customer?.length && !value) {
      const defaultCustomer = getCustomerList?.customer?.[0];

      setValue(name || "customerId", defaultCustomer._id);
      // if (getCustomer) {
      //   getCustomer(defaultCustomer);
      // }
    }
  }, [getCustomerList, setValue, getCustomer, name, value]);
  return (
    <>
      <Controller
        name={name || "customerId"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            fullWidth
            size={"small"}
            value={value}
            error={!!errors?.[name || "customerId"]}
            required
            disabled={disabled}
            onChange={(event) => {
              onChange(event);
              if (getCustomer) {
                const selectedCustomer = getCustomerList?.customer?.find(
                  (item: any) => item?._id === event.target.value
                );
                getCustomer(selectedCustomer);
              }
            }}
          >
            {getCustomerList?.customer?.map((item: any) => {
              return (
                <MenuItem key={item?._id} value={item?._id} dir={dir}>
                  {item?.fullName}
                </MenuItem>
              );
            })}
          </Select>
        )}
      />
    </>
  );
};
export default CustomerAutoComplete;
