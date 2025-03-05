import { Box, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useContext, useEffect, useState } from "react";

import { useApolloClient } from "@apollo/client";
import { GET_USER_CURRENCIES } from "../../graphql/queries/GET_USER_CURRENCIES";
import { AppContext } from "@/provider/appContext";

interface IPropsUserCurrencies {

  defaultValue?: string;
  onSelected?: (currencyId: any) => void;
  register?: any;
}
const CurrenciesAutoComplete: React.FC<IPropsUserCurrencies> = ({
  defaultValue,
  onSelected,
  register
}) => {
  const client = useApolloClient();
  const {setHandleError} = useContext(AppContext)
  const [userCurrenciesState, setUserCurrenciesState] = useState<any[]>([]);



// user selected curencies
const getUserCurrenciesFunction = async () => {
  try {
    const {
      data: { getUserCurrencies },
    } = await client.query({
      query: GET_USER_CURRENCIES,
    });
    setUserCurrenciesState(getUserCurrencies)
  } catch (error: any) {
    setHandleError((prevState:any) => ({
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
    const selectedId = (event.target.value as string)
    const selectedItem = userCurrenciesState?.find((item) => item?._id === selectedId)

    if (onSelected && selectedItem) {
        onSelected(selectedItem)
    }
  };
  return (
    <Box>
      {userCurrenciesState?.length > 0 && (
        <Select
          fullWidth
          size={"small"}
          name="currencyId"
          defaultValue={defaultValue || userCurrenciesState?.[0]?._id}
          onChange={handleChange}
          // {...register("currencyId")}
        >
          {userCurrenciesState?.map((item) => {
            return (
              <MenuItem key={item?._id} value={item?._id}>
                {item?.name}
              </MenuItem>
            );
          })}
        </Select>
      )}
    </Box>
  );
};

export default CurrenciesAutoComplete;
