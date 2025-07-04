"use client";
import { useApolloClient } from "@apollo/client";
import { Autocomplete, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";

import { GET_EMPLOYEE_LIST } from "@/graphql/queries/GET_EMPLOYEE_LIST";
import { Controller, useFormContext } from "react-hook-form";
interface IProps {
  dir?: string;
  name?: string;
  getEmployee?:(employee:any)=> void

}

const EmployeeAutoCompleteComponent: React.FC<IProps> = ({
  dir="ltr",
  name,
  getEmployee
}) => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();
  const client = useApolloClient();
  const [optionsAuto, setOptionAuto] = useState<{
    page: number;
    options: any[];
  }>({
    page: 1,
    options: [],
  });

  const getProductsFunction = async (searchTerm?: string) => {
    try {
      const variables = {
        ...(searchTerm
          ? { searchTerm: searchTerm }
          : { page: optionsAuto?.page }),
      };
      const {
        data: { getEmployeeList },
      } = await client.query({
        query: GET_EMPLOYEE_LIST,
        variables,
      });
      const allCustomer = [
        ...optionsAuto?.options,
        ...getEmployeeList?.employee,
      ];
      const duplicate = allCustomer?.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t._id === value._id)
      );
      setOptionAuto((prevState) => ({
        page: prevState?.page + 1,
        options: duplicate?.map((item) => ({
          ...item,
          id: item?._id,
          label: item?.name,
        })),
      }));
    } catch (error: any) {
      
    }
  };

  useEffect(() => {
    if (!optionsAuto?.options?.length) {
      getProductsFunction();
    }
  }, []);



  return (
    <>
      {/* {optionsAuto?.options?.length > 0 && <Autocomplete
        disablePortal={false}
        {...register("employee", { required: true })}
        onChange={handleSelectItem}
        fullWidth
        size="small"
        id="combo-box-demo"
        options={optionsAuto?.options}
        defaultValue={
          (optionsAuto?.options && defaultValue?._id)
            ? optionsAuto?.options?.filter((item) =>defaultValue?._id === item?._id)?.[0]
            : {}
        }
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            {...register("employee", { required: true })}
          />
        )}
      />} */}
      {optionsAuto?.options?.length > 0 && (
        <Controller
          name={name || "employeeId"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              fullWidth
              size={"small"}
              value={value}
              error={!!errors?.[name || "employeeId"]}
              required
              onChange={(event)=> {
                onChange(event)
                if (getEmployee){
                  const selectedOption = optionsAuto?.options?.find((item) => item?._id === event.target.value);
                  getEmployee(selectedOption)
                }
              }}
            >
              {optionsAuto?.options?.map((item) => {
                return (
                  <MenuItem
                    key={item?._id}
                    value={item?._id}
                    dir={dir}
                  >
                    {item?.name}
                  </MenuItem>
                );
              })}
            </Select>
          )}
        />
      )}
    </>
  );
};

export default EmployeeAutoCompleteComponent;
