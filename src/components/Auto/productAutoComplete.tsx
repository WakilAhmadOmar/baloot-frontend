"use client"
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useApolloClient } from "@apollo/client";
import { GET_PRODUCTS } from "../../graphql/queries/GET_PRODUCTS"
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/provider/appContext";
import { useTheme } from "@mui/material";




interface IPropsProduct {
  getProduct?: (product: any , index?:number) => void;
  productIds?: string[];
  isTable?:boolean
  index?:number
  defaultValue?: any;
  t:any
}
const ProductsAutoComplete: React.FC<IPropsProduct> = ({
  getProduct,
  productIds,
  isTable = false,
  index,
  defaultValue,
  t
}) => {
  const client = useApolloClient();
  const theme = useTheme()
  const {setHandleError} = useContext(AppContext)
  const [autoCompleteState, setAutoCompleteState] = useState<{
    data: any[];
    page: number;
  }>({
    data: [],
    page: 1,
  });
  const [selectedValue, setSelectedValue] = useState<any>(
    defaultValue?.name || ""
  );

  const inputStyle = {
    maxWidth: "90%",

    "& .MuiInputBase-sizeSmall": {
      paddingRight: "10px",
    },
    "& .MuiAutocomplete-endAdornment": {
      display: "none",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderColor: theme.palette.primary.main,
    },
    "& .MuiOutlinedInput-root": {
      paddingRight: "10px !important",
      "& fieldset": {
        borderColor: theme.palette.grey[100],
      },
      "&:hover fieldset": {
        borderColor: theme.palette.grey[100],
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
  }

  const getCustomerFunction = async (textSearch?: string) => {
    try {
      const variables = {
        page: textSearch ? 1 : autoCompleteState?.page,
        ...(textSearch ? { searchTerm: textSearch } : {}),
      };
      const {
        data: { getProducts },
      } = await client.query({
        query: GET_PRODUCTS,
        variables,
      });
      const mapData = getProducts?.product.map((item: any) => {
        return { _id: item?._id, label: item?.name, ...item };
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
    const value = event.currentTarget?.value;
    if (getProduct && item?._id) {
      getProduct(item , index);
    } else {
      getCustomerFunction(value);
    }
  };

  useEffect(() => {
    getCustomerFunction();
  }, []);
  return (
    <Autocomplete
      disablePortal
      onChange={handleChangeCustomerSearch}
      fullWidth
      size="small"
      id="combo-box-demo"
      inputValue={selectedValue}
      options={autoCompleteState?.data}
      getOptionDisabled={(option: any) => {
        const filterItems = productIds?.filter((item) => item === option?._id);
        return (filterItems?.length as number) > 0;
      }}
      renderInput={(params) => <TextField {...params} placeholder={t?.invoice?.product_name} sx={isTable ? inputStyle : {}} />}
    />
  );
};

export default ProductsAutoComplete;
