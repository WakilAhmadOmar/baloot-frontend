"use client";
import ProductsAutoComplete from "@/components/Auto/productAutoComplete";
import { Box, Grid2, Typography } from "@mui/material";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import { CreateFormSchema, ProductSchema } from "./table-container.schema";

export function ContainerTable() {
  const t = useTranslations("invoice");
  const { control } = useFormContext<CreateFormSchema>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });
  const handleAddProduct = (product: any) => {
    console.log("product", product);
    const myProduct: ProductSchema = {
      id: product?._id,
      _id: product?._id,
      price: product?.price?.map((item: any, index: number) => ({
        measureId: item?.measureId,
        quantity: 1,
        buyPrice: item?.buyPrice,
        expense: 0,
        totalExpense: item?.buyPrice,
        total: item?.buyPrice,
        selected: index === 0,
      })),
      expireInDate: new Date(),
      total: 0,
      expense: 0,
    };
    const removeIndex = fields?.findIndex(
      (item) => item?._id === myProduct?._id
    );
    if (removeIndex >= 0) {
      return;
    }
    append(myProduct);
  };
  console.log("fields", fields);
  return (
    <Box bgcolor={"#fff"}>
      <Grid2 container columns={10}>
        <Grid2 size={2}>
          <Typography fontWeight={400} fontSize={"14px"}>
            نام جنس
          </Typography>
        </Grid2>
        <Grid2 size={1}>
          <Typography fontWeight={400} fontSize={"14px"}>
            واحدات
          </Typography>
        </Grid2>
        <Grid2 size={1}>
          <Typography fontWeight={400} fontSize={"14px"}>
            تعداد
          </Typography>
        </Grid2>
        <Grid2 size={1}>
          <Typography fontWeight={400} fontSize={"14px"}>
            قیمت
          </Typography>
        </Grid2>
        <Grid2 size={1}>
          <Typography fontWeight={400} fontSize={"14px"}>
            مقدار مصرف
          </Typography>
        </Grid2>
        <Grid2 size={1}>
          <Typography fontWeight={400} fontSize={"14px"}>
            قیمت تمام شد
          </Typography>
        </Grid2>
        <Grid2 size={1}>
          <Typography fontWeight={400} fontSize={"14px"}>
            جمله
          </Typography>
        </Grid2>
        <Grid2 size={1}>
          <Typography fontWeight={400} fontSize={"14px"}>
            تاریخ انقضاء
          </Typography>
        </Grid2>
        <Grid2 size={1}>
          <Typography fontWeight={400} fontSize={"14px"}>
            عملیات
          </Typography>
        </Grid2>
      </Grid2>
      { [ ...(fields?.length === 0 ? [{_id:"first_item"}]: fields)]?.map((item , index) => (
        <Grid2 container columns={10} key={item?._id}>
          <Grid2 size={2}>
            <ProductsAutoComplete
              getProduct={handleAddProduct}
              productIds={fields?.map((item) => item?._id)}
              name={`product.${index}._id`}
            />
          </Grid2>
          <Grid2 size={1}>
            <Typography fontWeight={400} fontSize={"14px"}>
              واحدات
            </Typography>
          </Grid2>
          <Grid2 size={1}>
            <Typography fontWeight={400} fontSize={"14px"}>
              تعداد
            </Typography>
          </Grid2>
          <Grid2 size={1}>
            <Typography fontWeight={400} fontSize={"14px"}>
              قیمت
            </Typography>
          </Grid2>
          <Grid2 size={1}>
            <Typography fontWeight={400} fontSize={"14px"}>
              مقدار مصرف
            </Typography>
          </Grid2>
          <Grid2 size={1}>
            <Typography fontWeight={400} fontSize={"14px"}>
              قیمت تمام شد
            </Typography>
          </Grid2>
          <Grid2 size={1}>
            <Typography fontWeight={400} fontSize={"14px"}>
              جمله
            </Typography>
          </Grid2>
          <Grid2 size={1}>
            <Typography fontWeight={400} fontSize={"14px"}>
              تاریخ انقضاء
            </Typography>
          </Grid2>
          <Grid2 size={1}>
            <Typography fontWeight={400} fontSize={"14px"}>
              عملیات
            </Typography>
          </Grid2>
        </Grid2>
      ))}
    </Box>
  );
}
