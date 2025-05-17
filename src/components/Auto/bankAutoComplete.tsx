"use client";
import { useApolloClient } from "@apollo/client";
import { MenuItem, Select, useTheme } from "@mui/material";
import { GET_SAFE_LIST } from "../../graphql/queries/GET_SAFE_LIST";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/provider/appContext";
import { GET_BANK_LIST } from "@/graphql/queries/GET_BANK_LIST";
import { Controller, useFormContext } from "react-hook-form";

interface IPropsProduct {
  getCashBox?: (product: any) => void;
  placeholder?: string;
  isRequired?: boolean;
  name?:string
}
const BankAutoComplete: React.FC<IPropsProduct> = ({
  getCashBox,
  placeholder,
  isRequired = true,
  name
}) => {
  const client = useApolloClient();
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { setHandleError } = useContext(AppContext);
  const [autoCompleteState, setAutoCompleteState] = useState<{
    data: any[];
    page: number;
  }>({
    data: [],
    page: 1,
  });

  const getBankFunction = async (textSearch?: string) => {
    try {
      //TODO : use search term for each select box
      const variables = {
        page: textSearch ? 1 : autoCompleteState?.page,
        ...(textSearch ? { searchTerm: textSearch } : {}),
      };
      const {
        data: { getBankList },
      } = await client.query({
        query: GET_BANK_LIST,
        variables,
      });
      const mapData = getBankList?.bank?.map((item: any) => {
        return { _id: item?._id, label: item?.name, ...item };
      });
      const allCustomer = [...mapData, ...autoCompleteState?.data];
      const duplicate = allCustomer?.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t._id === value._id)
      );
      // if (autoCompleteState?.data?.length && getCashBox) {
      //   getCashBox(allCustomer?.[0]);
      // }
      setAutoCompleteState((prevState) => ({
        ...prevState,
        page: prevState.page + 1,
        data: duplicate,
      }));
    } catch (error: any) {
      setHandleError({
        open: true,
        status: "error",
        message: error.message,
      });
    }
  };
  const handleChangeCustomerSearch = (
    event: React.ChangeEvent<any>,
    item: any
  ) => {
    const value = event.currentTarget?.value;
    if (getCashBox && item?._id) {
      getCashBox(item);
    } else {
      getBankFunction(value);
    }
  };

  useEffect(() => {
    getBankFunction();
  }, []);
  return (
    <Controller
      name={name || "bankId"}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Select
          // label="Status"
          fullWidth
          size={"small"}
          value={value}
          // placeholder={placeholder}
          // options={PROGRAM_STATUS}
          // placeholder="Please select status"
          error={!!errors?.currencyId}
          // helperText={errors?.currencyId?.message}
          required
          onChange={onChange}
        >
          {autoCompleteState?.data?.map((item) => {
            return (
              <MenuItem key={item?._id} value={item?._id}>
                {item?.name}
              </MenuItem>
            );
          })}
        </Select>
      )}
    />
    // <Autocomplete
    // disablePortal={false}
    // {...register("bank", { required: isRequired })}
    //   onChange={handleChangeCustomerSearch}
    //   fullWidth
    //   size="small"
    //   id="combo-box-demo"
    //   options={autoCompleteState?.data}
    //     renderInput={(params) => (
    //       <TextField
    //       {...params}
    //       placeholder={placeholder}

    //     />
    //   )}
    // />
  );
};

export default BankAutoComplete;
