"use client";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import { CircularProgress, useTheme } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useGetProductList } from "@/hooks/api/definitions/product/queries/use-get-list";

interface IPropsProduct {
  getProduct?: (product: any, index?: number) => void;
  productIds?: string[];
  isTable?: boolean;
  index?: number;
  defaultValue?: any;
  error?: boolean;
  name?: string;
  helperText?: string;
  limit?: number;
}
const ProductsAutoComplete: React.FC<IPropsProduct> = ({
  getProduct,
  productIds,
  isTable = false,
  index,
  defaultValue,
  name,
  error = false,
  helperText,
  limit = 10,
}) => {
  const { control } = useFormContext();
  const theme = useTheme();

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

  const { data: getProductList, isLoading } = useGetProductList({
    page: 1,
    limit: limit,
  });

  const handleChangeCustomerSearch = (
    event: React.ChangeEvent<any>,
    item: any
  ) => {
    const value = event.currentTarget?.value;
    setSelectedValue(item);
    if (getProduct && item?._id) {
      getProduct(item, index);
    }
  };

  useEffect(() => {
    if (defaultValue && !selectedValue) {
      setSelectedValue(defaultValue);
    }
  }, [defaultValue]);
  return (
    <Controller
      name={name || "productId"}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          disablePortal={false}
          onChange={(event: any, value: any) => {
            handleChangeCustomerSearch(event, value);
            onChange(value?._id);
          }}
          fullWidth
          size="small"
          id="auto-complete-product"
          options={getProductList?.product?.map((item: any) => ({
            _id: item?._id,
            name: item?.name,
            ...item,
          }))}
          value={selectedValue}
          getOptionLabel={(option: any) => (option?.name ? option?.name : "")} // Specify which property to display
          getOptionDisabled={(option: any) => {
            const filterItems = productIds?.filter(
              (item) => item === option?._id
            );
            return (filterItems?.length as number) > 0;
          }}
          loading={isLoading}
          renderInput={(params) => (
            <TextField
              {...params}
              error={error}
              helperText={helperText}
              slotProps={{
                input: {
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {isLoading ? (
                        <CircularProgress color="inherit" size={15} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                },
              }}
              // sx={inputStyle}
              // placeholder={placeholder}
            />
          )}
        />
      )}
    />
  );
};

export default ProductsAutoComplete;
