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
  name?: string;
  dir?:string
  getCustomer?: (customer: any) => void;
}
const CustomerAutoComplete: React.FC<IProps> = ({
  dir="ltr",
  name,
  getCustomer,
}) => {
  const client = useApolloClient();
  const {
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
              error={!!errors?.[name || "customerId"]}
              required
              onChange={(event)=> {
                onChange(event);
                if (getCustomer) {
                  const selectedCustomer = autoCompleteState?.data?.find(
                    (item) => item?._id === event.target.value
                  );
                  getCustomer(selectedCustomer);
                }
              }}
            >
              {autoCompleteState?.data?.map((item) => {
                return (
                  <MenuItem
                    key={item?._id}
                    value={item?._id}
                    dir={dir}
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
