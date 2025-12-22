"use client";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid2,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
} from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";

import { useTranslations } from "next-intl";
import { CreateFormSchema, ProductSchema } from "./table-container.schema";
import { Add } from "iconsax-react";
import ProductItem from "./table-item";
import { useState } from "react";
import PaymentReceiver from "./Payment";
import { numberToWords } from "@/utils/numberToWords";
import { CalculateTotal } from "./calculate-total";

export function ContainerTable() {
  const [totalBill, setTotalBill] = useState(0);

  const [statusPayment, setStatusPayment] = useState<"cash" | "loan">("cash");
  const theme = useTheme();
  const t = useTranslations("invoice");
  const { control, setValue } = useFormContext<CreateFormSchema>();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "products",
  });

  const handleAddProduct = (product: any, indexProduct: number) => {
    const myProduct: ProductSchema = {
      name: product?.name,
      price: product?.price?.map((item: any, index: number) => ({
        measureId: item?.measureId,
        quantity: 1,
        buyPrice: item?.buyPrice,
        expense: 0,
        totalExpense: item?.buyPrice,
        total: item?.buyPrice,
        selected: index === 0,
      })),
      expireInDate: null,
      total: product?.price?.length > 0 ? product?.price[0]?.buyPrice : 0,
      expense: 0,
      productId: product?._id,
    };

    update(indexProduct, myProduct);
  };

  const handleAddNewProduct = () => {
    const newProduct = {
      productId: "",
      price: [],
      expireInDate: null,
      total: 0,
      expense: 0,
    };
    append(newProduct);
  };

  const handleChangePaymentStatus = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = (event.target as HTMLInputElement).value;
    if (value === "cash" || value === "loan") {
      setValue("paymentMethod", value);
      setStatusPayment(value);
    }
  };

  const deleteProductBill = (event: React.MouseEvent<HTMLButtonElement>) => {
    const index = event?.currentTarget?.id;
    const indexNumber = Number(index);
    remove(indexNumber);
  };
  return (
    <Box>
      <Box
        my={3}
        pb={2}
        bgcolor={theme.palette.background.default}
        borderRadius={"10px"}
        sx={{ overflow: "hidden" }}
      >
        <Grid2
          container
          columns={10}
          columnSpacing={2}
          px={3}
          py={2}
          borderBottom={`1px solid ${theme.palette.grey[200]}`}
        >
          <Grid2 size={2}>
            <Typography fontWeight={400} fontSize={"14px"}>
              {t("product_name")}
            </Typography>
          </Grid2>
          <Grid2 size={1}>
            <Typography fontWeight={400} fontSize={"14px"} textAlign={"center"}>
              {t("unit")}
            </Typography>
          </Grid2>
          <Grid2 size={1}>
            <Typography fontWeight={400} fontSize={"14px"}>
              {t("quantity")}
            </Typography>
          </Grid2>
          <Grid2 size={1}>
            <Typography fontWeight={400} fontSize={"14px"}>
              {t("price")}
            </Typography>
          </Grid2>
          <Grid2 size={1}>
            <Typography fontWeight={400} fontSize={"14px"}>
              {t("expense")}
            </Typography>
          </Grid2>
          <Grid2 size={1}>
            <Typography fontWeight={400} fontSize={"14px"} textAlign={"center"}>
              {t("total_price")}
            </Typography>
          </Grid2>
          <Grid2 size={1}>
            <Typography fontWeight={400} fontSize={"14px"} textAlign={"center"}>
              {t("total")}
            </Typography>
          </Grid2>
          <Grid2 size={1}>
            <Typography fontWeight={400} fontSize={"14px"}>
              {t("expiration_date")}
            </Typography>
          </Grid2>
          <Grid2 size={1}>
            <Typography fontWeight={400} fontSize={"14px"} textAlign={"end"}>
              {t("actions")}
            </Typography>
          </Grid2>
        </Grid2>
        {fields.map((item, index) => {
          return (
            <ProductItem
              control={control}
              key={item.id}
              index={index}
              remove={remove}
              watch={useFormContext().watch}
              setValue={useFormContext().setValue}
              product={item as unknown as ProductSchema}
              productIds={fields?.map((item: any) => item?.productId)}
              errors={useFormContext().formState.errors}
              reset={useFormContext().reset}
              handleAddProduct={handleAddProduct}
              handleDeleteFunction={deleteProductBill}
            />
          );
        })}
      </Box>
      <Box
        sx={{
          backgroundColor: theme.palette.grey[100],
          display: "flex",
          columnGap: "1rem",
          alignItems: "center",
        }}
        mt={1}
        px={3}
        py={2}
      >
        <Button
          startIcon={<Add style={{ margin: "0 1rem" }} />}
          variant={"outlined"}
          size={"small"}
          onClick={handleAddNewProduct}
        >
          {t("insert_new_row")}
        </Button>
        <Typography variant="overline">{t("total_products")}</Typography>
        <Typography
          variant="overline"
          bgcolor={theme.palette.grey[100]}
          minWidth={"15rem"}
          sx={{ paddingInlineStart: "1rem", borderRadius: "5px" }}
        >
          {fields.length}
        </Typography>
      </Box>
      <Grid2
        container
        spacing={3}
        maxWidth="100%"
        justifyContent="space-between"
        sx={{ marginTop: "1.5rem" }}
        px={3}
      >
        <Grid2 size={8}>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="paymentMethod"
              onChange={handleChangePaymentStatus}
              value={statusPayment}
            >
              <FormControlLabel
                value="cash"
                control={<Radio />}
                label={t("cash_payment")}
              />
              <FormControlLabel
                value="loan"
                control={<Radio />}
                label={t("total_invoice_on_credit")}
              />
            </RadioGroup>
          </FormControl>
          <PaymentReceiver
            customer={"Ahmad"}
            amount={totalBill}
            customerId={""}
            paymentStatus={statusPayment}
          />
        </Grid2>
        <CalculateTotal getTotal={(total) => setTotalBill(total)} />
      </Grid2>
      <Box display="flex" columnGap={"1rem"} px={3}>
        <Typography variant="overline">
          {t("total_invoice_after_discount_in_words")} :
        </Typography>
        <Typography
          variant="overline"
          px={1}
          py="1px"
          bgcolor={theme.palette.grey[100]}
        >
          {numberToWords(totalBill)}
        </Typography>
      </Box>
    </Box>
  );
}
