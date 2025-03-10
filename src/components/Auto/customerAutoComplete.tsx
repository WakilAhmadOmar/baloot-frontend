"use client"
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useApolloClient } from "@apollo/client";
import { GET_CUSTOMER_LIST } from "../../graphql/queries/GET_CUSTOMER_LIST";
import { useContext, useEffect, useState  , useCallback} from "react";
import { debounce } from "lodash";
import { AppContext } from "@/provider/appContext";

interface IProps {
  getCustomer?: (data: any) => void;
  register:any
}
const CustomerAutoComplete: React.FC<IProps> = ({ getCustomer , register }) => {
  const client = useApolloClient();
  const { setHandleError } = useContext(AppContext);
  const [autoCompleteState, setAutoCompleteState] = useState<{
    data: any[];
    page: number;
  }>({
    data: [],
    page: 1,
  });

  const getCustomerFunction =  useCallback( async() => {
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

      const mapData = getCustomerList?.customer.map((item: any) => {
        return { _id: item?._id, label: item?.fullName, ...item };
      });
      const allCustomer = [...mapData, ...autoCompleteState?.data];
      const duplicate = allCustomer?.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t._id === value._id)
      );
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
  },[autoCompleteState?.page]);
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

  const handleDebounce = debounce(() => {
    getCustomerFunction();
  }, 500);
  const handleSearch = (event: any, value: string) => {
    handleDebounce();
  };

  return (
    <Autocomplete
      disablePortal
      fullWidth
      getOptionLabel={(option: any) => option.fullName}
      size="small"
      id="combo-box-demo"
      options={autoCompleteState?.data}
      onChange={handleChangeCustomerSearch}
      onInputChange={handleSearch}
      renderInput={(params) => <TextField {...params} 
      {...register("customer" )}
      name="customer"
       />}
    />
  );
};
export default CustomerAutoComplete;
