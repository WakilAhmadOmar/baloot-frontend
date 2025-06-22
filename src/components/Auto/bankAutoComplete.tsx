"use client";
import { useApolloClient } from "@apollo/client";
import { MenuItem, Select } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/provider/appContext";
import { GET_BANK_LIST } from "@/graphql/queries/GET_BANK_LIST";
import { Controller, useFormContext } from "react-hook-form";
import { useGetBankListQuery } from "@/hooks/api/definitions/bank/queries/use-get-bank-list-query";

interface IPropsProduct {
  name?:string
  dir?:string
  getBank?: (bank: any) => void;
}
const BankAutoComplete: React.FC<IPropsProduct> = ({
  dir="ltr",
  name,
  getBank
}) => {
  // const client = useApolloClient();
  const {
    control,
    formState: { errors },
  } = useFormContext();
  // const { setHandleError } = useContext(AppContext);
  // const [autoCompleteState, setAutoCompleteState] = useState<{
  //   data: any[];
  //   page: number;
  // }>({
  //   data: [],
  //   page: 1,
  // });
  const {data:bankList} = useGetBankListQuery({page:1})

  // const getBankFunction = async (textSearch?: string) => {
  //   try {
  //     //TODO : use search term for each select box
  //     const variables = {
  //       page: textSearch ? 1 : autoCompleteState?.page,
  //       ...(textSearch ? { searchTerm: textSearch } : {}),
  //     };
  //     const {
  //       data: { getBankList },
  //     } = await client.query({
  //       query: GET_BANK_LIST,
  //       variables,
  //     });
  //     const mapData = getBankList?.bank?.map((item: any) => {
  //       return { _id: item?._id, label: item?.name, ...item };
  //     });
  //     const allCustomer = [...mapData, ...autoCompleteState?.data];
  //     const duplicate = allCustomer?.filter(
  //       (value, index, self) =>
  //         index === self.findIndex((t) => t._id === value._id)
  //     );
  

  //     setAutoCompleteState((prevState) => ({
  //       ...prevState,
  //       page: prevState.page + 1,
  //       data: duplicate,
  //     }));
  //   } catch (error: any) {
  //     setHandleError({
  //       open: true,
  //       status: "error",
  //       message: error.message,
  //     });
  //   }
  // };

  // useEffect(() => {
  //   getBankFunction();
  // }, []);
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
          error={!!errors?.[name || "bankId"]}
          // helperText={errors?.currencyId?.message}
          required
          onChange={(event)=>{
            onChange(event);
            if (getBank) {
              const selectedBank = bankList?.bank?.find(
                (item:any) => item?._id === event.target.value
              );
              getBank(selectedBank);
            }
          }}
        >
          {bankList?.bank?.map((item:any) => {
            return (
              <MenuItem key={item?._id} value={item?._id} dir={dir}>
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
