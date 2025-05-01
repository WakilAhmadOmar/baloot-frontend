"use client";
import { useApolloClient } from "@apollo/client";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";

import { GET_EMPLOYEE_LIST } from "@/graphql/queries/GET_EMPLOYEE_LIST";
interface IProps {
  value?: string | number;
  name?: string;
  getValue?: (data: any) => void;
  register?: any;
  placeholder: string;
  defaultValue?:any
}

const EmployeeAutoCompleteComponent: React.FC<IProps> = ({
  getValue,
  value,
  name,
  register,
  placeholder,
  defaultValue
}) => {
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
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!optionsAuto?.options?.length) {
      getProductsFunction();
    }
  }, []);

  const handleSelectItem = (event: any, value: any) => {
    if (getValue) getValue(value);
  };
  
  return (
    <>
      {optionsAuto?.options?.length > 0 && <Autocomplete
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
      />}
    </>
  );
};

export default EmployeeAutoCompleteComponent;
