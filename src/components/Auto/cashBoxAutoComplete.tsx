
import { MenuItem, Select } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useGetSafeListQuery } from "@/hooks/api/definitions/safe/queries/use-get-safe-list-query";

interface IPropsProduct {
  name?:string
  dir?:string
  getCashbox?: (cashbox: any) => void;
}
const CashBoxAutoComplete: React.FC<IPropsProduct> = ({
dir="ltr",
  name,
  getCashbox
}) => {
  const {  control , formState: { errors },} =  useFormContext()
  // const client = useApolloClient();
// const {setHandleError} = useContext(AppContext)
  // const [autoCompleteState, setAutoCompleteState] = useState<{
  //   data: any[];
  //   page: number;
  // }>({
  //   data: [],
  //   page: 1,
  // });

  const {data:safeList} = useGetSafeListQuery({page:1})


  // const getCustomerFunction = async (textSearch?: string) => {
  //   try {
  //     const variables = {
  //       page: textSearch ? 1 : autoCompleteState?.page,
  //       ...(textSearch ? { searchTerm: textSearch } : {}),
  //     };
  //     //TODO : use search term for each select box
  //     const {
  //       data: { getSafeList },
  //     } = await client.query({
  //       query: GET_SAFE_LIST,
  //       variables,
  //     });
  //     const mapData = getSafeList?.safe.map((item: any) => {
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
  //   getCustomerFunction();
  // }, []);
  return (
    <Controller
          name={name ||  "cashboxId"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              fullWidth
              size={"small"}
              value={value}
              error={!!errors?.[name || "cashboxId"] }
              required
              onChange={(event)=> {
                onChange(event);
                if (getCashbox) {
                  const selectedCustomer = safeList?.safe?.find(
                    (item:any) => item?._id === event.target.value
                  );
                  getCashbox(selectedCustomer);
                }
              }}
            >
              {safeList?.safe?.map((item:any) => {
                return (
                  <MenuItem key={item?._id} value={item?._id}dir={dir}>
                    {item?.name}
                  </MenuItem>
                );
              })}
            </Select>
          )}
        />
    // <Autocomplete
    //   disablePortal={false}
    //   {...register("bank", { required: isRequired })}
    //   onChange={handleChangeCustomerSearch}
    //   fullWidth
    //   size="small"
    //   id="combo-box-demo"
    //   options={autoCompleteState?.data}
    //   // onSelect={onSelectFunction}
    //   // getOptionDisabled={(option: any) => {
    //   //   const filterItems = cashBoxIds?.filter((item) => item === option?._id);
    //   //   return (filterItems?.length as number) > 0;
    //   // }}
    //   renderInput={(params) => <TextField {...params} placeholder={placeholder} />}
    // />
  );
};

export default CashBoxAutoComplete;
