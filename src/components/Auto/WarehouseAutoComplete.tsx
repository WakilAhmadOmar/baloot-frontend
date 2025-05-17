import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useApolloClient } from "@apollo/client";
import { GET_ENTREPOT_LIST } from "../../graphql/queries/GET_ENTREPOT_LIST";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AppContext } from "@/provider/appContext";
import { debounce } from "lodash";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { MenuItem, Select } from "@mui/material";

interface IPropsFormFactore {
  getWarehouse?: (warehouse: any) => void;
  defaultValue?: any;
  name?:string
}
const WarehouseAutoComplete: React.FC<IPropsFormFactore> = ({
  getWarehouse,
name,
  defaultValue,
}) => {

  const { register ,control , formState:{errors}} = useFormContext()
  const { setHandleError } = useContext(AppContext);
  const client = useApolloClient();
  const [selectedValue, setSelectedValue] = useState<any>(null);
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
      // const mapData = getEntrepotList?.entrepot.map((item: any) => {
      //   return { id: item?._id, label: item?.name, ...item };
      // });
      const allCustomer = [...getEntrepotList?.entrepot, ...autoCompleteState?.data];
      const duplicate = allCustomer?.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t._id === value._id)
      );
      if (autoCompleteState?.data?.length === 0 && getWarehouse && !defaultValue) {
        getWarehouse(duplicate?.[0]);
      }
      if (selectedValue === null) {
        setSelectedValue(duplicate?.[0]);
      }
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
    event: any,
  ) => {
    const id = event.target?.value
    
    const objectItem = autoCompleteState?.data?.filter((item) => item?._id ===id )?.[0]

    setSelectedValue(objectItem);
    if (objectItem?._id && getWarehouse) {
      getWarehouse(objectItem);
    }
    // getCustomerFunction();
  };

  useEffect(() => {
    getWarehouseFunction();
  }, []);

  const handleDebounce = debounce((value) => {
    getWarehouseFunction();
  }, 500);
  const handleSearch = (event: React.ChangeEvent<{}>, value: any | null) => {
    console.log("search value", value);
    if (
      value &&
      !autoCompleteState?.data?.some((option) => option.name === value.name)
    ) {
      handleDebounce(value);
    }
  };

  return (

     <Controller
          name={name || "warehouseId"}
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
              error={!!errors?.warehouseId}
              // helperText={errors?.currencyId?.message}
              required
              onChange={(event)=> {
                onChange(event);
                handleChangeCustomerSearch(event)
              }}
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
        //   disablePortal={false}
        //   onChange={handleChangeCustomerSearch}
        //   fullWidth
        //   size="small"
        //   id="auto-complete-warehouse"
        //   options={autoCompleteState?.data}
        //   value={defaultValue || selectedValue}
        //   getOptionLabel={(option: any) => (option?.name ? option?.name : "")} // Specify which property to display
        //   renderInput={(params) => (
        //     <TextField
        //       {...params}
        //      {...(register ?  (register("warehouse", {required:true})) : {})}
        //      name="warehouse"
        //       // placeholder={placeholder}
        //     />
        //   )}
        // />
      
    

    // <Autocomplete
    //   disablePortal={false}
    //   onChange={handleChangeCustomerSearch}
    //   fullWidth
    //   size="small"
    //   id="combo-box-demo"

    //   options={autoCompleteState?.data}
    //   value={value}
    //   getOptionLabel= {(option: any) => option.name}

    //   onInputChange={handleSearch}
    //   renderInput={(params) => (
    //     <TextField

    //     {...(register ? register("warehouse") : {})}
    //       {...params}
    //       name="warehouse"
    //     />
    //   )}

    // />
  );
};
export default WarehouseAutoComplete;
