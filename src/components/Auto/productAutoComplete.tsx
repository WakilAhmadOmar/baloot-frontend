"use client";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useApolloClient } from "@apollo/client";
import { GET_PRODUCTS } from "../../graphql/queries/GET_PRODUCTS";
import { forwardRef, useContext, useEffect, useState } from "react";
import { AppContext } from "@/provider/appContext";
import { useTheme } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface IPropsProduct {
  getProduct?: (product: any, index?: number) => void;
  productIds?: string[];
  isTable?: boolean;
  index?: number;
  defaultValue?: any;
  t: any;
  name?:string
}
const ProductsAutoComplete: React.FC<IPropsProduct> = ({
  getProduct,
  productIds,
  isTable = false,
  index,
  defaultValue,
  name,
  t,
}) => {
  const { control } = useFormContext()
  const client = useApolloClient();
  const theme = useTheme();
  const { setHandleError } = useContext(AppContext);
  const [autoCompleteState, setAutoCompleteState] = useState<{
    data: any[];
    page: number;
  }>({
    data: [],
    page: 1,
  });
  const [selectedValue, setSelectedValue] = useState<any>(null);

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
  };

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
        return { id: item?._id, label: item?.name, ...item };
      });
      const allCustomer = [...mapData, ...autoCompleteState?.data];
      const duplicate = allCustomer?.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t._id === value._id)
      );
      if (selectedValue === undefined) {
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
    event: React.ChangeEvent<any>,
    item: any
  ) => {
    const value = event.currentTarget?.value;
    setSelectedValue(item);
    if (getProduct && item?._id) {
      getProduct(item, index);
    } else {
      getCustomerFunction(value);
    }
  };

  useEffect(() => {
    getCustomerFunction();

  }, []);
  useEffect(() => {
    if (defaultValue && !selectedValue) {
      setSelectedValue(defaultValue);
    }
  }, [defaultValue]);
  return (

            // <Controller 
            //   name={name || "productId"}
            //   control={control}
            //   render={({ field: { onChange, value } }) => (

                <Autocomplete
                  disablePortal={false}
                  // {...register("product", { required: isRequired })}
                  onChange={handleChangeCustomerSearch}
                  fullWidth
                  size="small"
                  id="auto-complete-product"
                  options={autoCompleteState?.data}
                  value={ selectedValue}
                  getOptionLabel={(option: any) => option?.name ? option?.name : ""
                  } // Specify which property to display
                  getOptionDisabled={(option: any) => {
                    const filterItems = productIds?.filter((item) => item === option?._id);
                    return (filterItems?.length as number) > 0;
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      // placeholder={placeholder}
                    />
                  )}
                />
            //   )}
            // />
  );
};

export default ProductsAutoComplete;
