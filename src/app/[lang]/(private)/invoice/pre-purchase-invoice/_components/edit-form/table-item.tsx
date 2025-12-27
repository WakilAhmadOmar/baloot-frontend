"use client";
import React, { useContext, useState } from "react";
import { Controller } from "react-hook-form";
import { Box, IconButton, TextField, Grid2, useTheme } from "@mui/material";
import ProductsAutoComplete from "@/components/Auto/productAutoComplete";
import { ProductSchema } from "../table-container.schema";
import { CustomSelectMeasure } from "../select-measure";
import { Trash } from "iconsax-react";
import { InvoiceContext } from "../../../_components/invoiceContext";
import { FormInputSkeleton } from "./form-input-skeleton";

interface ProductItemProps {
  control: any;
  errors: any;
  index: number;
  remove: (index: number) => void;
  watch: any;
  setValue: any;
  product: ProductSchema;
  productIds: string[];
  reset: any;
  handleAddProduct: (product: any, index: number) => void;
  handleDeleteFunction: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading: boolean;
}

export default function ProductItem({
  control,
  errors,
  index,
  watch,
  product,
  productIds,
  handleAddProduct,
  handleDeleteFunction,
  isLoading,
}: ProductItemProps) {
  const [productPrice, setProductPrice] = useState(product?.price || []);
  const theme = useTheme();
  const { paymentOff } = useContext(InvoiceContext);
  const style = {
    width: "100%",
    paddingInlineStart: "3px !important",
    "& .MuiInputBase-input": {
      paddingInlineStart: "3px !important",
    },
    "& .MuiInputBase-sizeSmall": {
      // paddingRight: "10px",
      paddingInlineStart: "3px !important",
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
      // paddingRight: "10px !important",
      paddingInlineStart: "3px !important",
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

  return (
    <Grid2 container columns={10} columnSpacing={2} mt={2} key={index} px={3}>
      <Grid2 size={2} sx={{ display: "grid", alignContent: "space-around" }}>
        {isLoading ? (
          <FormInputSkeleton />
        ) : (
          <ProductsAutoComplete
            getProduct={(product) => handleAddProduct(product, index)}
            productIds={productIds}
            name={`products.${index}.productId`}
            defaultValue={product}
            error={!!errors.products?.[index]?.productId}
            helperText={errors.products?.[index]?.productId?.message}
            limit={100}
          />
        )}
      </Grid2>
      <Grid2 size={1}>
        {isLoading ? (
          <FormInputSkeleton />
        ) : (
          <Controller
            control={control}
            name={`products.${index}.price`}
            render={({ field }) => {
              return (
                <CustomSelectMeasure
                  data={product?.price || undefined}
                  getDataSelect={(selectedMeasures) => {
                    const updatedMeasures = (product?.price || [])?.map(
                      (measure: any) => ({
                        ...measure,
                        selected: selectedMeasures?.some(
                          (sel) => sel.measureId === measure.measureId
                        ),
                      })
                    );
                    setProductPrice(updatedMeasures);
                    field.onChange(updatedMeasures);
                  }}
                />
              );
            }}
          />
        )}
      </Grid2>
      <Grid2 size={1} sx={{ display: "grid", alignContent: "space-around" }}>
        {productPrice
          ?.filter((item: any) => item.selected)
          .map((measure: any, measureIndex: number) => (
            <Box
              key={measure.measureId._id}
              mb={
                measureIndex <
                productPrice.filter((item: any) => item.selected).length - 1
                  ? 1
                  : 0
              }
            >
              {isLoading ? (
                <FormInputSkeleton />
              ) : (
                <Controller
                  name={`products.${index}.price.${measureIndex}.quantity`}
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      onChange={(e) => field.onChange(e)}
                      size="small"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              )}
            </Box>
          ))}
      </Grid2>
      <Grid2 size={1} sx={{ display: "grid", alignContent: "space-around" }}>
        {productPrice
          ?.filter((item: any) => item.selected)
          .map((measure: any, measureIndex: number) => (
            <Box
              key={measure.measureId._id}
              mb={
                measureIndex <
                productPrice.filter((item: any) => item.selected).length - 1
                  ? 1
                  : 0
              }
            >
              {isLoading ? (
                <FormInputSkeleton />
              ) : (
                <Controller
                  name={`products.${index}.price.${measureIndex}.buyPrice`}
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      onChange={(e) => field.onChange(e)}
                      size="small"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              )}
            </Box>
          ))}
      </Grid2>
      <Grid2 size={1} sx={{ display: "grid", alignContent: "space-around" }}>
        {productPrice
          ?.filter((item: any) => item.selected)
          .map((measure: any, measureIndex: number) => (
            <Box
              key={measure.measureId._id}
              mb={
                measureIndex <
                productPrice.filter((item: any) => item.selected).length - 1
                  ? 1
                  : 0
              }
            >
              {isLoading ? (
                <FormInputSkeleton />
              ) : (
                <Controller
                  name={`products.${index}.price.${measureIndex}.expense`}
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      onChange={(e) => field.onChange(e)}
                      size="small"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              )}
            </Box>
          ))}
      </Grid2>
      <Grid2 size={1} sx={{ display: "grid", alignContent: "space-around" }}>
        {productPrice
          ?.filter((item: any) => item.selected)
          .map((measure: any, measureIndex: number) => {
            const price = parseInt(
              watch(`products.${index}.price.${measureIndex}.buyPrice`)
            );
            const expense = parseInt(
              watch(`products.${index}.price.${measureIndex}.expense`)
            );
            return (
              <Box key={measure.measureId._id} textAlign={"center"}>
                {price + expense}
              </Box>
            );
          })}
      </Grid2>
      <Grid2 size={1} sx={{ display: "grid", alignContent: "space-around" }}>
        {productPrice
          ?.filter((item: any) => item.selected)
          .map((measure: any, measureIndex: number) => {
            const price = parseInt(
              watch(`products.${index}.price.${measureIndex}.buyPrice`)
            );
            const expense = parseInt(
              watch(`products.${index}.price.${measureIndex}.expense`)
            );
            const quantity = parseInt(
              watch(`products.${index}.price.${measureIndex}.quantity`)
            );
            return (
              <Box key={measure.measureId._id} textAlign={"center"}>
                {(price + expense) * (quantity || 1)}
              </Box>
            );
          })}
      </Grid2>
      <Grid2 size={1.5} sx={{ display: "grid", alignContent: "space-around" }}>
        {isLoading ? (
          <FormInputSkeleton />
        ) : (
          <Controller
            name={`products.${index}.expireInDate`}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="date"
                onChange={(e) => field.onChange(e)}
                size="small"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        )}
      </Grid2>
      <Grid2
        size={0.5}
        textAlign={"end"}
        sx={{
          display: "grid",
          alignContent: "space-around",
          justifyItems: "end",
        }}
      >
        <IconButton
          size="small"
          onClick={handleDeleteFunction}
          id={`${index}`}
          disabled={paymentOff?._id ? true : false}
        >
          <Trash
            size={20}
            color={
              paymentOff?._id
                ? theme.palette.grey?.[600]
                : theme.palette.primary.contrastText
            }
          />
        </IconButton>
      </Grid2>
    </Grid2>
  );
}
