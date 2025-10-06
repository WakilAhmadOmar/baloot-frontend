import React, {
  MouseEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import ProductsAutoComplete from "@/components/Auto/productAutoComplete";
import WarehouseAutoComplete from "@/components/Auto/WarehouseAutoComplete";
import { uniqueId } from "lodash";
import {
  Box,
  Button,
  Chip,
  Grid2,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { Add, Trash } from "iconsax-react";
import { InvoiceContext } from "../../../_components/invoiceContext";
import { numberToWords } from "@/utils/numberToWords";
import Moment from "react-moment";
import EditCustomSelectMeasure from "./select-measure";
import SkeletonComponent from "../../../_components/Skeleton";
import CustomSelectMeasure from "../../../_components/customeSeleteMeasure";

export function EditForm({ isLoadingData }: { isLoadingData: boolean }) {
  const t = useTranslations("invoice");
  const editRowRef = useRef<React.RefObject<HTMLTableRowElement>[]>([]);
  const theme = useTheme();
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const { paymentOff } = useContext(InvoiceContext);
  const [calculateSellBill, setCalculateSellBill] = useState<{
    total: number;
    discount?: number;
    totalAfterDiscount: number;
    receipt: number;
    remain: number;
  }>({
    total: 0,
    discount: 0,
    totalAfterDiscount: 0,
    receipt: 0,
    remain: 0,
  });
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
    getValues,
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });
  const [productCount, setProductCount] = useState<{
    productId: string;
    entrepotId: string;
    rowIndex: number | undefined;
  }>({
    productId: "",
    entrepotId: "",
    rowIndex: undefined,
  });

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
  const handleAddNewProduct = () => {
    append({
      id: uniqueId(),
      productId: "new-product",
      productName: "",
      measures: [],
      warehouse: "",
    });
  };

  const products: any = useWatch({ name: "products" });
  useEffect(() => {
    const initialValue = 0;
    let discount = 0;
    let price = 0;
    const sumWithInitial = products?.reduce(
      (accumulator: any, product: any) => {
        const measures = 0;
        const sumMeasures = product?.measures?.reduce(
          (accum: number, measure: any) => {
            if (measure?.selected) {
              price = price + measure.sellPrice * (measure?.amount || 1);
              discount =
                discount +
                ((measure?.sellPrice * measure?.discount) / 100 || 0);
              return accum + (measure?.totalPrice || measure?.sellPrice);
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
      totalAfterDiscount: price - discount,
      discount,
    });
    setValue("totalPrice", price);
    setValue("totalPriceAfterDiscount", price - discount);
  }, [JSON.stringify(products)]);

  const handleDeleteFunction = (event: MouseEvent<HTMLButtonElement>) => {
    const id = parseInt(event?.currentTarget?.id);
    remove(id);
  };

  const handleGetProductId = (id: string, warehouse: string) => {
    setEditProductId(id);
  };

  return (
    <Box sx={{ width: "100%", my: 3 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right" sx={{ width: 200 }}>
                {t("product_name")}
              </TableCell>
              <TableCell align="right">{t("unit")}</TableCell>
              <TableCell align="right">{t("amount")}</TableCell>
              <TableCell align="right">{t("price")}</TableCell>
              <TableCell align="right">{t("expense")}</TableCell>
              <TableCell align="right">{t("cost_price")}</TableCell>
              <TableCell align="right">{t("total")}</TableCell>
              <TableCell align="right">{t("expiration_date")}</TableCell>
              <TableCell align="right">{t("actions")}</TableCell>
            </TableRow>
          </TableHead>
          {isLoadingData ? (
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
              {fields?.map((row: any, rowIndex: number) => {
                const rows = watch(`products.${rowIndex}`);

                return (
                  <TableRow
                    key={rows?.id}
                    ref={(el: any) => (editRowRef.current[rowIndex] = el)}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      // border: rows?.error ? "2px solid #fe1212" : undefined,
                    }}
                  >
                    <TableCell component="th" scope="row" align="right">
                      {rows?.productName}
                    </TableCell>

                    <TableCell align="right">
                      <Controller
                        control={control}
                        name={`products.${rowIndex}.measures`}
                        render={({ field }) => {
                          const measures = watch(
                            `products.${rowIndex}.measures`
                          );
                          return (
                            <CustomSelectMeasure
                              data={measures || undefined}
                              getDataSelect={(selectedMeasures) => {
                                const updatedMeasures = (measures || [])?.map(
                                  (measure: any) => ({
                                    ...measure,
                                    selected: selectedMeasures?.some(
                                      (sel) =>
                                        sel.measureId === measure.measureId
                                    ),
                                  })
                                );
                                field.onChange(updatedMeasures);
                              }}
                            />
                          );
                        }}
                      />
                      {(errors?.products as any)?.[rowIndex]?.measureId && (
                        <Typography color="error" variant="body1">
                          {(errors.products as any)[rowIndex].measureId.message}
                        </Typography>
                      )}
                    </TableCell>

                    <TableCell align="right" sx={{ display: "grad", gap: 4 }}>
                      {watch(`products.${rowIndex}.measures`)
                        ?.filter((f: any) => f.selected)
                        ?.map((item: any, measureIndex: number) => (
                          <TextField
                            sx={style}
                            size="small"
                            type="number"
                            placeholder="تعداد"
                            value={item?.amount || 1}
                            name={`products.${rowIndex}.measures.${measureIndex}.amount`}
                            onChange={(e) => {
                              const value =
                                parseFloat(e.target.value) > 1
                                  ? parseFloat(e?.target.value)
                                  : 1;
                              setValue(
                                `products.${rowIndex}.measures.${measureIndex}.amount`,
                                value
                              );
                            }}
                            error={
                              !!(errors?.products as any)?.[rowIndex]?.amount
                            }
                          />
                        ))}
                      {(errors?.products as any)?.[rowIndex]?.amount && (
                        <Typography color="error" variant="body1">
                          {(errors.products as any)[rowIndex].amount.message}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {watch(`products.${rowIndex}.measures`)
                        ?.filter((f: any) => f.selected)
                        ?.map((item: any, measureIndex: number) => (
                          <TextField
                            sx={style}
                            size="small"
                            type="number"
                            placeholder="sell price"
                            value={item?.buyPrice}
                            name={`products.${rowIndex}.measures.${measureIndex}.buyPrice`}
                            onChange={(e) => {
                              const value = parseFloat(e.target.value) || 0;
                              setValue(
                                `products.${rowIndex}.measures.${measureIndex}.buyPrice`,
                                value
                              );
                            }}
                            error={
                              !!(errors?.products as any)?.[rowIndex]?.sellPrice
                            }
                          />
                        ))}
                      {(errors?.products as any)?.[rowIndex]?.sellPrice && (
                        <Typography color="error" variant="body1">
                          {(errors.products as any)[rowIndex].sellPrice.message}
                        </Typography>
                      )}
                    </TableCell>

                    <TableCell align="right">
                      {watch(`products.${rowIndex}.measures`)
                        ?.filter((f: any) => f.selected)
                        ?.map((item: any, measureIndex: number) => {
                          return (
                            <TextField
                              sx={style}
                              size="small"
                              type="number"
                              placeholder={t("expense")}
                              value={item?.expense}
                              name={`products.${rowIndex}.measures.${measureIndex}.expense`}
                              onChange={(e) => {
                                const value = parseFloat(e.target.value) || 0;
                                setValue(
                                  `products.${rowIndex}.measures.${measureIndex}.expense`,
                                  value
                                );

                                setValue(
                                  `products.${rowIndex}.measures.${measureIndex}.totalExpense`,
                                  Number(value * item?.amount)
                                );
                              }}
                            />
                          );
                        })}
                    </TableCell>
                    <TableCell align="right">
                      {watch(`products.${rowIndex}.measures`)
                        ?.filter((f: any) => f.selected)
                        ?.map((item: any, measureIndex: number) => (
                          <TextField
                            sx={style}
                            size="small"
                            type="number"
                            placeholder={t("cost_price")}
                            value={item?.totalExpense}
                            name={`products.${rowIndex}.measures.${measureIndex}.totalExpanse`}
                            onChange={(e) => {
                              const value = parseFloat(e.target.value) || 0;
                              setValue(
                                `products.${rowIndex}.measures.${measureIndex}.totalExpense`,
                                value
                              );
                              const expense = (
                                (item?.expense || 0) / item?.amount
                              ).toFixed(2);

                              setValue(
                                `products.${rowIndex}.measures.${measureIndex}.expense`,
                                Number(expense)
                              );
                            }}
                          />
                        ))}
                    </TableCell>
                    <TableCell align="right">
                      {watch(`products.${rowIndex}.measures`)
                        ?.filter((f: any) => f.selected)
                        ?.map((item: any, measureIndex: number) => {
                          const total =
                            (item?.buyPrice + item?.expense) * item?.amount;
                          return (
                            <Typography key={item?.measureId}>
                              {Number.isInteger(total)
                                ? total
                                : total.toFixed(2)}
                            </Typography>
                          );
                        })}
                    </TableCell>
                    <TableCell align="right">
                      <Controller
                        control={control}
                        name={`products.${rowIndex}.expireInDate`}
                        render={({ field }) => {
                          const expirationDate = watch(
                            `products.${rowIndex}.expireInDate`
                          );

                          if (
                            !getValues()?.products?.[rowIndex]
                              ?.expireInDateSelected &&
                            expirationDate?.length > 0
                          ) {
                            setValue(
                              `products.${rowIndex}.expireInDateSelected`,
                              new Date(expirationDate?.[0])?.toLocaleDateString(
                                "en-GB"
                              )
                            );
                          }

                          return (
                            <TextField
                              {...field}
                              sx={style}
                              size="small"
                              type="date"
                            />
                          );
                        }}
                      />
                      {(errors?.products as any)?.[rowIndex]
                        ?.expireInDateSelected && (
                        <Typography color="error" variant="body1">
                          {
                            (errors.products as any)[rowIndex]
                              .expireInDateSelected.message
                          }
                        </Typography>
                      )}
                    </TableCell>

                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={handleDeleteFunction}
                        id={`${rowIndex}`}
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
        <Button
          startIcon={<Add style={{ margin: "0 1rem" }} />}
          variant={"outlined"}
          size={"small"}
          onClick={handleAddNewProduct}
          // disabled={paymentOff?._id ? true : false}
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
          {fields?.length}
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
              {calculateSellBill.total}
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
              {calculateSellBill.discount}
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
              {calculateSellBill?.totalAfterDiscount}
            </Typography>
          </Box>
          {/* <Box
            sx={{ borderBottom: `1px solid ${theme.palette?.grey[100]}` }}
            display="grid"
            gridTemplateColumns={"50% 50%"}
            columnGap="1rem"
            alignItems={"center"}
          >
            <Box
              bgcolor={theme.palette?.grey[100]}
              p={1}
              paddingInlineStart={2}
            >
              {" "}
              <Typography>{t("receipt")}</Typography>
            </Box>
            <Typography alignItems={"center"} display="grid">
              {paymentOff?.payAmount || calculateSellBill?.receipt}
            </Typography>
          </Box> */}
          {/* <Box
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
              <Typography>{t("remaining")}</Typography>
            </Box>
            <Typography>{calculateSellBill?.remain}</Typography>
          </Box> */}
        </Grid2>
      </Grid2>
      <Box display="flex" columnGap={"1rem"}>
        <Typography variant="overline" bgcolor={theme.palette.grey[100]}>
          {t("total_invoice_after_discount_in_words")} :
        </Typography>
        <Typography variant="overline">
          {numberToWords(calculateSellBill?.total)}
        </Typography>
      </Box>
    </Box>
  );
}
