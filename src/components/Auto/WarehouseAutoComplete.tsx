
import { useEffect } from "react";
import { Controller,  useFormContext } from "react-hook-form";
import { MenuItem, Select } from "@mui/material";
import { useGetWarehouseList } from "@/hooks/api/definitions/warehouse/queries/use-get-list";

interface IPropsFormFactore {
  getWarehouse?: (warehouse: any) => void;
  name?:string
  dir?:string
  error?:boolean
}
const WarehouseAutoComplete: React.FC<IPropsFormFactore> = ({
  getWarehouse,
name,
dir="ltr",
error= false
}) => {

  const { control , formState:{errors} , watch , setValue} = useFormContext()

  

  const {data:getEntrepotList , isLoading } = useGetWarehouseList()


  const handleChangeCustomerSearch = (
    event: any,
  ) => {
    const id = event.target?.value
    
    const objectItem = getEntrepotList?.filter((item:any) => item?._id ===id )?.[0]

    if (objectItem?._id && getWarehouse) {
      getWarehouse(objectItem);
    }
  };

const value = watch(name || "warehouseId")

 useEffect(() => {
    if (getEntrepotList?.length && !value) {
      const defaultWarehouse = getEntrepotList?.[0];
      setValue(name || "warehouseId", defaultWarehouse._id);
      setValue("warehouseName", defaultWarehouse.name);
      // if (getWarehouse) {
      //   getWarehouse(defaultWarehouse);
      // }
    }
  }, [getEntrepotList, setValue, getWarehouse, name, value]);
  

  return (

    <>
    {!isLoading && <Controller
          name={name || "warehouseId"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              fullWidth
              size={"small"}
              value={value}
              defaultValue={value}
              defaultOpen={false}
              error={ error || !!errors?.warehouseId}
              required
              onChange={(event)=> {
                onChange(event);
                handleChangeCustomerSearch(event)
              }}

            >
              {getEntrepotList?.map((item:any) => {
                return (
                  <MenuItem key={item?._id} value={item?._id} dir={dir}>
                    {item?.name}
                  </MenuItem>
                );
              })}
            </Select>
          )}
        />}
    </>
   
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
