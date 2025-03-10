
import TextField from "@mui/material/TextField";
import Autocomplete, {
  AutocompleteChangeDetails,
} from "@mui/material/Autocomplete";
import { useApolloClient } from "@apollo/client";
import { useTheme } from "@mui/material";
import { GET_SAFE_LIST } from "../../graphql/queries/GET_SAFE_LIST";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/provider/appContext";

interface IPropsProduct {
  getCashBox?: (product: any) => void;
  cashBoxIds?: string[];
}
const CashBoxAutoComplete: React.FC<IPropsProduct> = ({
  getCashBox,
  cashBoxIds,
}) => {
  const client = useApolloClient();
const {setHandleError} = useContext(AppContext)
  const [autoCompleteState, setAutoCompleteState] = useState<{
    data: any[];
    page: number;
  }>({
    data: [],
    page: 1,
  });


  const getCustomerFunction = async (textSearch?: string) => {
    try {
      const variables = {
        page: textSearch ? 1 : autoCompleteState?.page,
        ...(textSearch ? { searchTerm: textSearch } : {}),
      };
      const {
        data: { getSafeList },
      } = await client.query({
        query: GET_SAFE_LIST,
        variables,
      });
      const mapData = getSafeList?.safe.map((item: any) => {
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
      getCustomerFunction(value);
    }
  };


  useEffect(() => {
    getCustomerFunction();
  }, []);
  return (
    <Autocomplete
      disablePortal={false}
      onChange={handleChangeCustomerSearch}
      fullWidth
      size="small"
      id="combo-box-demo"
      options={autoCompleteState?.data}
      // onSelect={onSelectFunction}
      getOptionDisabled={(option: any) => {
        const filterItems = cashBoxIds?.filter((item) => item === option?._id);
        return (filterItems?.length as number) > 0;
      }}
      renderInput={(params) => <TextField {...params} placeholder="Cash Box" />}
    />
  );
};

export default CashBoxAutoComplete;
