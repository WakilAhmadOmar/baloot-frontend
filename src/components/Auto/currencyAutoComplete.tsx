"use client";
import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";

import { useApolloClient } from "@apollo/client";
import { GET_USER_CURRENCIES } from "../../graphql/queries/GET_USER_CURRENCIES";
import { AppContext } from "@/provider/appContext";

import { Controller, useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";

interface IPropsUserCurrencies {
  defaultValue?: string;
  onSelected?: (currencyId: any) => void;
  name?: string;
  dir?: string;
  required?: boolean;
}
const CurrenciesAutoComplete: React.FC<IPropsUserCurrencies> = ({
  defaultValue,
  onSelected,
  name,
  dir = "ltr",
  required = true,
}) => {
  const client = useApolloClient();
  const { setHandleError } = useContext(AppContext);
  const [userCurrenciesState, setUserCurrenciesState] = useState<any[]>([]);

  const {
    formState: { errors },
    control,
    register,
  } = useFormContext();

  // user selected curencies
  const getUserCurrenciesFunction = async () => {
    try {
      const {
        data: { getUserCurrencies },
      } = await client.query({
        query: GET_USER_CURRENCIES,
      });
      if (userCurrenciesState?.length === 0 && onSelected && !defaultValue) {
        onSelected(getUserCurrencies?.[0]);
      }
      setUserCurrenciesState(getUserCurrencies);
    } catch (error: any) {
      setHandleError((prevState: any) => ({
        ...prevState,
        open: true,
        status: "error",
        message: error?.message,
      }));
    }
  };

  useEffect(() => {
    if (userCurrenciesState?.length === 0) {
      getUserCurrenciesFunction();
    }
  }, [defaultValue]);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedId = event.target.value as string;
    const selectedItem = userCurrenciesState?.find(
      (item) => item?._id === selectedId
    );

    if (onSelected && selectedItem) {
      onSelected(selectedItem);
    }
  };

  return (
    <Box>
      {userCurrenciesState?.length > 0 && (
        <Controller
          control={control}
          {...register(name || "currencyId", { required })}
          name={name || "currencyId"}
          render={({ field: { onChange, value } }) => (
            <Select
              // label="Status"
              fullWidth
              size={"small"}
              value={value}
              defaultValue={defaultValue}
              // options={PROGRAM_STATUS}
              // placeholder="Please select status"
              error={!!errors?.[name || "currencyId"]}
              // helperText={errors?.currencyId?.message}
              required
              onChange={(event) => {
                onChange(event);
                handleChange(event);
              }}
            >
              {userCurrenciesState?.map((item) => {
                return (
                  <MenuItem key={item?._id} value={item?._id} dir={dir}>
                    {item?.name}
                  </MenuItem>
                );
              })}
            </Select>
          )}
        />
        // <Select
        //   fullWidth
        //   size={"small"}
        //   defaultValue={defaultValue?._id || userCurrenciesState?.[0]?._id}
        //   {...(register ?  register("currencyId" , {required:isRequired}) : {})}
        //   onChange={handleChange}
        // >
        // {userCurrenciesState?.map((item) => {
        //   return (
        //     <MenuItem key={item?._id} value={item?._id}>
        //       {item?.name}
        //     </MenuItem>
        //   );
        // })}
        // </Select>
      )}
      
    </Box>
  );
};

export default CurrenciesAutoComplete;
