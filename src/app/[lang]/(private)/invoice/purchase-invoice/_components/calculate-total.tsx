import { Box, Grid2, Typography, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import { useContext, useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { InvoiceContext } from "../../_components/invoiceContext";

export function CalculateTotal({
  getTotal,
}: {
  getTotal: (total: number) => void;
}) {
  const t = useTranslations("invoice");
  const { setValue } = useFormContext();
  const { paymentOff } = useContext(InvoiceContext);
  const theme = useTheme();
  const [calculateSellBill, setCalculateSellBill] = useState<{
    total: number;
    expense: number;
    receipt: number;
    remain: number;
  }>({
    total: 0,
    expense: 0,
    receipt: 0,
    remain: 0,
  });

  const products: any = useWatch({ name: "products" });
  console.log("products in total calc", products);
  useEffect(() => {
    const initialValue = 0;
    let expense = 0;
    let price = 0;
    const sumWithInitial = products?.reduce(
      (accumulator: any, product: any) => {
        const measures = 0;
        const sumMeasures = product?.price?.reduce(
          (accum: number, measure: any) => {
            if (measure?.selected) {
              price = price + measure.buyPrice * (measure?.quantity || 1);
              expense = expense + measure?.expense * measure?.quantity;
              return accum + (measure?.total || measure?.buyPrice);
            } else return accum;
          },
          measures
        );
        return accumulator + sumMeasures;
      },
      initialValue
    );

    setCalculateSellBill({
      receipt: 0,
      remain: price,
      total: price,
      expense: expense,
    });
    getTotal(price + expense);
    setValue("totalPrice", price);
    setValue("totalPriceAfterExpense", price + expense);
  }, [JSON.stringify(products)]);
  return (
    <Grid2 size={4} marginTop={3}>
      <Box
        sx={{ borderBottom: `2px solid ${theme.palette?.grey[100]}` }}
        display="grid"
        gridTemplateColumns={"50% 50%"}
        columnGap="1rem"
      >
        <Box p={1} paddingInlineStart={2}>
          {" "}
          <Typography>{t("total_invoice_amount")}</Typography>
        </Box>
        <Typography
          alignItems={"center"}
          display="grid"
          bgcolor={theme.palette?.grey[100]}
          px={2}
        >
          {calculateSellBill.total}
        </Typography>
      </Box>

      <Box
        sx={{ borderBottom: `1px solid ${theme.palette?.grey[100]}` }}
        display="grid"
        gridTemplateColumns={"50% 50%"}
        columnGap="1rem"
      >
        <Box p={1} paddingInlineStart={2}>
          {" "}
          <Typography>{t("expense")}</Typography>
        </Box>
        <Typography
          alignItems={"center"}
          display="grid"
          bgcolor={theme.palette?.grey[100]}
          px={2}
        >
          {calculateSellBill?.expense}
        </Typography>
      </Box>
      <Box
        sx={{ borderBottom: `1px solid ${theme.palette?.grey[100]}` }}
        display="grid"
        gridTemplateColumns={"50% 50%"}
        columnGap="1rem"
      >
        <Box p={1} paddingInlineStart={2}>
          {" "}
          <Typography>{t("total_invoice_amount_after_discount")}</Typography>
        </Box>
        <Typography
          alignItems={"center"}
          display="grid"
          bgcolor={theme.palette?.grey[100]}
          px={2}
        >
          {calculateSellBill?.total + calculateSellBill?.expense}
        </Typography>
      </Box>
      <Box
        sx={{ borderBottom: `1px solid ${theme.palette?.grey[100]}` }}
        display="grid"
        gridTemplateColumns={"50% 50%"}
        columnGap="1rem"
      >
        <Box p={1} paddingInlineStart={2}>
          {" "}
          <Typography>{t("receipt")}</Typography>
        </Box>
        <Typography
          alignItems={"center"}
          display="grid"
          bgcolor={theme.palette?.grey[100]}
          px={2}
        >
          {paymentOff?.payAmount || calculateSellBill?.receipt}
        </Typography>
      </Box>
      <Box
        sx={{ borderBottom: `1px solid ${theme.palette?.grey[100]}` }}
        display="grid"
        gridTemplateColumns={"50% 50%"}
        columnGap="1rem"
      >
        <Box p={1} paddingInlineStart={2}>
          {" "}
          <Typography>{t("remaining")}</Typography>
        </Box>
        <Typography
          alignItems={"center"}
          display="grid"
          bgcolor={theme.palette?.grey[100]}
          px={2}
        >
          {paymentOff?.payAmount ? calculateSellBill?.remain : 0}
        </Typography>
      </Box>
    </Grid2>
  );
}
