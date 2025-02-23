import {
    Box,
    Chip,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Theme,
    useTheme,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { useApolloClient } from "@apollo/client";

  import { getProductMeansureFunction } from "./getProductMeansureFunction";
  
  interface IPropsProductMeansure {
    register?: any;
    getDataSelect?: (value: any[], index?: number) => void;
    defaultValue: any[];
    index?: number;
    showLabel?: boolean;
  }
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const ProductMeansureComponent: React.FC<IPropsProductMeansure> = ({
    register,
    getDataSelect,
    defaultValue,
    index,
    showLabel,
  }) => {
    const cleint = useApolloClient();
    const theme = useTheme();
    const [productMeansure, setProductMeansure] = useState<any[]>([]);
    const [personName, setPersonName] = React.useState<string[]>([]);
    const [handleError, setHandleError] = useState<{
      status: "success" | "info" | "warning" | "error";
      open: boolean;
      message: string;
    }>({
      status: "success",
      open: false,
      message: "",
    });
  
    const getDefaultDataProduct = async () => {
      const getMeansuresData: any = await getProductMeansureFunction(cleint);
      if (getMeansuresData?.type === "success") {
        setProductMeansure(getMeansuresData?.getMeasures);
      }
      if (getMeansuresData?.type === "error") {
        setHandleError((prevState) => ({
          ...prevState,
          open: true,
          status: "error",
          message: getMeansuresData?.error,
        }));
      }
    };
  
    useEffect(() => {
      if (productMeansure?.length === 0) {
        getDefaultDataProduct();
      }
      if (defaultValue?.length > 0) {
        setPersonName(defaultValue?.map((item) => item.name));
      }
    }, [defaultValue?.length]);
  
    const handleChange = (event: any) => {
      const {
        target: { value },
      } = event;
      let values: string[] = typeof value === "string" ? [value] : value;
      if (getDataSelect) {
        const allMea = values?.map((item) => {
          let productM: any = productMeansure?.filter((mea) => {
            return item === mea.name;
          });
          return {
            measure: productM?.[0]?._id,
            name: productM?.[0]?.name,
            boughtPrice: 0,
            salePrice: 0,
          };
        });
        getDataSelect(allMea, index);
      }
  
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    };
    return (
      <Box>
        {!showLabel && (
          <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }} required>
            واحد از بزرگ به کوچک انتخاب کنید
          </InputLabel>
        )}
        <Select
          // labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          fullWidth
          size="small"
          value={personName}
          onChange={handleChange}
          defaultValue={[]}
          input={<OutlinedInput id="select-multiple-chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  sx={{
                    fontWeight: 400,
                    fontSize: "1.4rem",
                  }}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {productMeansure.map((item) => (
            <MenuItem
              key={item?.name}
              value={item?.name}
              id={item?._id}
              style={getStyles(item.name, personName, theme)}
              disabled={
                personName?.length >= 3 && !personName.includes(item?.name)
              }
            >
              {item?.name}
            </MenuItem>
          ))}
        </Select>
      </Box>
    );
  };
  
  export default ProductMeansureComponent;
  