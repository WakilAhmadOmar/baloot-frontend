"use client";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useApolloClient } from "@apollo/client";
import { GET_CUSTOMER_LIST } from "../../graphql/queries/GET_CUSTOMER_LIST";
import { useContext, useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import { AppContext } from "@/provider/appContext";
import { Controller, useFormContext } from "react-hook-form";
import { MenuItem, Select } from "@mui/material";

interface IProps {
  getCustomer?: (data: any) => void;
  register?: any;
  placeholder?: string;
  defaultValue?: any;
  name?: string;
}
const CustomerAutoComplete: React.FC<IProps> = ({
  getCustomer,
  placeholder,
  defaultValue,
  name,
}) => {
  const client = useApolloClient();
  const {
    register,
    control,
    formState: { errors },
    setValue,
  } = useFormContext();
  const { setHandleError } = useContext(AppContext);
  const [autoCompleteState, setAutoCompleteState] = useState<{
    data: any[];
    page: number;
  }>({
    data: [],
    page: 1,
  });

  const getCustomerFunction = useCallback(async () => {
    try {
      const variables = {
        page: autoCompleteState?.page,
      };
      const {
        data: { getCustomerList },
      } = await client.query({
        query: GET_CUSTOMER_LIST,
        variables,
      });

      setValue(name || "customerId", getCustomerList?.customer?.[0]?._id);
      setAutoCompleteState((prevState) => ({
        ...prevState,
        page: prevState.page + 1,
        data: getCustomerList?.customer,
      }));
    } catch (error: any) {
      setHandleError({
        open: true,
        status: "error",
        message: error.message,
      });
    }
  }, [autoCompleteState?.page]);
  const handleChangeCustomerSearch = (
    event: any,
    item: any,
    res: any,
    details: any
  ) => {
    if (getCustomer) {
      getCustomer(item);
    }
  };

  useEffect(() => {
    getCustomerFunction();
  }, []);

  return (
    <>
      {autoCompleteState?.data?.length > 0 && (
        <Controller
          name={name || "customerId"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              fullWidth
              size={"small"}
              value={value}
              // placeholder={placeholder}
              // options={PROGRAM_STATUS}
              // placeholder="Please select status"
              error={!!errors?.[name || "customerId"]}
              // helperText={errors?.currencyId?.message}
              required
              onChange={onChange}
            >
              {autoCompleteState?.data?.map((item) => {
                return (
                  <MenuItem
                    key={item?._id}
                    value={item?._id}
                    sx={{ direction: "rtl" }}
                  >
                    {item?.fullName}
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
export default CustomerAutoComplete;
