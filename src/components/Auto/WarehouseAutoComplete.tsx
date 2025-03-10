
import TextField from "@mui/material/TextField";
import Autocomplete, {
} from "@mui/material/Autocomplete";
import { useApolloClient } from "@apollo/client";
import { GET_ENTREPOT_LIST } from "../../graphql/queries/GET_ENTREPOT_LIST";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/provider/appContext";
import { debounce } from "lodash";


interface IPropsFormFactore {
 getWarehouse?:(warehouse:any) => void;
 register:any
}
const WarehouseAutoComplete: React.FC<IPropsFormFactore> = ({
 getWarehouse,
 register
}) => {
    const { setHandleError } = useContext(AppContext);
  const client = useApolloClient();
  const [autoCompleteState, setAutoCompleteState] = useState<{
    data: any[];
    page: number;
  }>({
    data: [],
    page: 1,
  });
 

  const getWarehouseFunction = async () => {
    try {
      const variables = {
        page: autoCompleteState?.page,
      };
      const {
        data: { getEntrepotList },
      } = await client.query({
        query: GET_ENTREPOT_LIST,
        variables,
      });
      const mapData = getEntrepotList?.entrepot.map((item: any) => {
        return { id: item?._id, label: item?.name, ...item };
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
  };
  const handleChangeCustomerSearch = (
    event: React.ChangeEvent<any>,
    item: any
  ) => {
    if (item?._id && getWarehouse){
        getWarehouse(item)

    }
    // getCustomerFunction();
  };

  useEffect(() => {
    getWarehouseFunction();
  }, []);

  const handleDebounce = debounce(() => {
    getWarehouseFunction();
  }, 500);
  const handleSearch = () => {
    handleDebounce();
  };

  return (
    <Autocomplete
      disablePortal={false}
      onChange={handleChangeCustomerSearch}
      fullWidth
      size="small"
      id="combo-box-demo"

      options={autoCompleteState?.data}
      
      onInputChange={handleSearch}
      renderInput={(params) => (
        <TextField

        {...(register ? register("warehouse") : {})}
          {...params}
          name="warehouse"
        />
      )}
      
    />
  );
};
export default WarehouseAutoComplete;
