"use client";
import {
  AppBar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Grid2,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { CloseSquare, Eye } from "iconsax-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useGetSellsBillByIdQuery } from "@/hooks/api/invoice/queries/get-sells-bill-by-id-query";

import SkeletonComponent from "../../../_components/Skeleton";
import Moment from "react-moment";
import { numberToWords } from "@/utils/numberToWords";

interface IProps {
  id: string;
}

const DetailsSalesInvoice: React.FC<IProps> = ({ id }) => {
  const t = useTranslations("invoice");
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();
  const { data: billData, isLoading } = useGetSellsBillByIdQuery(
    {
      billId: id,
    },
    openDialog
  );

  const handleOpenDialogBox = () => {
    setOpenDialog(!openDialog);
  };

  return (
    <Box>
      <IconButton onClick={handleOpenDialogBox}>
        <Eye color={theme.palette.primary.main} size={22} />
      </IconButton>
      <Dialog
        fullScreen
        open={openDialog}
        onClose={handleOpenDialogBox}
        dir={t("dir")}
      >
        <AppBar
          sx={{
            position: "relative",
            color: theme.palette.grey["A700"],
            bgcolor: theme.palette.background.default,
            boxShadow: "none",
            borderBottom: `1px solid ${theme.palette?.grey[200]} `,
          }}
        >
          <Toolbar>
            <Typography component="div" variant="button" sx={{ flex: 1 }}>
              {t("details_sales_invoice")}
            </Typography>

            <IconButton
              edge="start"
              color="inherit"
              onClick={handleOpenDialogBox}
              aria-label="close"
            >
              <CloseSquare />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Grid2 container columnSpacing={3} rowSpacing={3} mb={3}>
            <Grid2 size={2} gap={1} display={"flex"}>
              <Typography component={"span"}>{t("customer_name")}</Typography>:
              <Typography component={"span"}>
                {billData?.customerId?.fullName}
              </Typography>
            </Grid2>
            <Grid2 size={2} gap={1} display={"flex"}>
              <Typography component={"span"}>{t("warehouse")} </Typography>:
              <Typography component={"span"}>
                {billData?.entrepotId?.name}
              </Typography>
            </Grid2>
            <Grid2 size={2} gap={1} display={"flex"}>
              <Typography component={"span"}>{t("Currency")}</Typography>:
              <Typography component={"span"}>
                {billData?.currencyId?.name}
              </Typography>
            </Grid2>
          </Grid2>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right" sx={{ width: 200 }}>
                    {t("product_name")}
                  </TableCell>
                  <TableCell align="right">{t("warehouse")}</TableCell>
                  <TableCell align="right">{t("unit")}</TableCell>
                  <TableCell align="right">{t("amount")}</TableCell>
                  <TableCell align="right">{t("price")}</TableCell>
                  <TableCell align="right">
                    {t("discount_percentage")}
                  </TableCell>
                  <TableCell align="right">{t("discount_amount")}</TableCell>
                  <TableCell align="right">{t("total")}</TableCell>
                  <TableCell align="right">{t("expiration_date")}</TableCell>
                </TableRow>
              </TableHead>
              {isLoading ? (
                <TableBody>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell colSpan={10}>
                        <SkeletonComponent />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody>
                  {billData?.products?.map((row: any) => {
                    return (
                      <TableRow
                        key={row?.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" align="right">
                          {row?.productId?.name}
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2">
                            {row?.entrepotId?.name}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Box display={"grid"} rowGap={0.5}>
                            {row?.productMeasures?.map((item: any) => (
                              <Chip
                                key={item?.measureId?._id}
                                label={item?.measureId?.name}
                                sx={{
                                  fontSize: "12px",
                                  width: "fit-content",
                                }}
                                size={"medium"}
                              />
                            ))}
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Box display={"grid"} rowGap={1}>
                            {row?.productMeasures?.map((item: any) => (
                              <span>{item?.amountOfProduct}</span>
                            ))}
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Box display={"grid"} rowGap={1}>
                            {row?.productMeasures?.map((item: any) => (
                              <span>{item?.pricePerMeasure}</span>
                            ))}
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Box display={"grid"} rowGap={1}>
                            {row?.productMeasures?.map((item: any) => (
                              <span>{item?.discountPercentage || 0}</span>
                            ))}
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Box display={"grid"} rowGap={1}>
                            {row?.productMeasures?.map((item: any) => (
                              <span>
                                {(item?.discountPercentage *
                                  item?.pricePerMeasure) /
                                  100 || 0}
                              </span>
                            ))}
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Box display={"grid"} rowGap={1}>
                            {row?.productMeasures?.map((item: any) => {
                              const discount = item?.discountPercentage || 0;
                              const amount = item?.amountOfProduct || 1;
                              const sellPrice = item?.pricePerMeasure || 0;
                              const total =
                                sellPrice * amount -
                                (sellPrice * discount) / 100;
                              return (
                                <Typography key={item?.measureId}>
                                  {Number.isInteger(total)
                                    ? total
                                    : total.toFixed(2)}
                                </Typography>
                              );
                            })}
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Moment format="YYYY/MM/DD">
                            {row?.expirationDate?.[0]}
                          </Moment>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              )}
            </Table>
          </TableContainer>

          <Box
            sx={{
              backgroundColor: theme.palette.grey[100],
              padding: "1rem 1rem",
              display: "flex",
              columnGap: "1rem",
              alignItems: "center",
            }}
            mt={1}
          >
            <Typography variant="overline">{t("total_products")}</Typography>
            <Typography
              variant="overline"
              bgcolor={theme.palette.grey[100]}
              minWidth={"15rem"}
              sx={{ paddingInlineStart: "1rem", borderRadius: "5px" }}
            >
              {billData?.products?.length}
            </Typography>
          </Box>
          <Grid2
            container
            spacing={3}
            maxWidth="100%"
            justifyContent="space-between"
            sx={{ marginTop: "1.5rem" }}
          >
            <Grid2 size={8}></Grid2>
            <Grid2 size={4} marginTop={3}>
              <Box
                sx={{ borderBottom: `2px solid ${theme.palette?.grey[100]}` }}
                display="grid"
                gridTemplateColumns={"50% 50%"}
                columnGap="1rem"
              >
                <Box
                  bgcolor={theme.palette?.grey[100]}
                  p={1}
                  paddingInlineStart={2}
                >
                  {" "}
                  <Typography>{t("total_invoice_amount")}</Typography>
                </Box>
                <Typography alignItems={"center"} display="grid">
                  {billData?.products?.reduce((total: number, product: any) => {
                    const productTotal = product?.productMeasures?.reduce(
                      (sum: number, item: any) => {
                        const amount = item?.amountOfProduct || 1;
                        const price = item?.pricePerMeasure || 0;
                        return sum + amount * price;
                      },
                      0
                    );
                    return total + (productTotal || 0);
                  }, 0)}
                </Typography>
              </Box>
              <Box
                sx={{ borderBottom: `1px solid ${theme.palette?.grey[100]}` }}
                display="grid"
                gridTemplateColumns={"50% 50%"}
                columnGap="1rem"
              >
                <Box
                  bgcolor={theme.palette?.grey[100]}
                  p={1}
                  paddingInlineStart={2}
                >
                  {" "}
                  <Typography>{t("discount_amount")}</Typography>
                </Box>
                <Typography alignItems={"center"} display="grid">
                  {billData?.products?.reduce(
                    (totalDiscount: number, product: any) => {
                      const productDiscount = product?.productMeasures?.reduce(
                        (sum: number, item: any) => {
                          const price = item?.pricePerMeasure || 0;
                          const amount = item?.amountOfProduct || 1;
                          const discountPercentage =
                            item?.discountPercentage || 0;
                          return (
                            sum + (price * amount * discountPercentage) / 100
                          );
                        },
                        0
                      );
                      return totalDiscount + (productDiscount || 0);
                    },
                    0
                  )}
                </Typography>
              </Box>
              <Box
                sx={{ borderBottom: `1px solid ${theme.palette?.grey[100]}` }}
                display="grid"
                gridTemplateColumns={"50% 50%"}
                columnGap="1rem"
              >
                <Box
                  bgcolor={theme.palette?.grey[100]}
                  p={1}
                  paddingInlineStart={2}
                >
                  {" "}
                  <Typography>
                    {t("total_invoice_amount_after_discount")}
                  </Typography>
                </Box>
                <Typography alignItems={"center"} display="grid">
                  {billData?.totalPriceAfterDiscount}
                </Typography>
              </Box>
            </Grid2>
          </Grid2>
          <Box display="flex" columnGap={"1rem"}>
            <Typography variant="overline" bgcolor={theme.palette.grey[100]}>
              {t("total_invoice_after_discount_in_words")} :
            </Typography>
            <Typography variant="overline">
              {numberToWords(billData?.totalPriceAfterDiscount || 0)}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Box display={"flex"} justifyContent="space-between" width={"100%"}>
            <Box display="flex" columnGap={"1rem"}>
              <Button variant="outlined" onClick={handleOpenDialogBox}>
                {t("cancel")}
              </Button>
            </Box>
            <Box display="flex" columnGap={"1rem"}>
              <Button variant="outlined" disabled>
                {t("print_invoice")}
              </Button>
              {/* <PrintInvoice  /> */}
              {/* <PrintTable /> */}
              <Button variant="outlined" disabled>
                {t("print_warehouse_receipt")}
              </Button>
            </Box>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DetailsSalesInvoice;
