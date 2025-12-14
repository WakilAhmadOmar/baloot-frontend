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
import {
  Box,
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
import { Trash } from "iconsax-react";
import { InvoiceContext } from "../../../_components/invoiceContext";
import { numberToWords } from "@/utils/numberToWords";
import Moment from "react-moment";
import EditCustomSelectMeasure from "./select-measure";
import SkeletonComponent from "../../../_components/Skeleton";
import { EditRow } from "./edit-row";
import { SaveRow } from "./save-row";
import { AddNewRow } from "../add-new-row";

export function EditForm({ isLoadingData }: { isLoadingData: boolean }) {
  const t = useTranslations("invoice");
  const editRowRef = useRef<React.RefObject<HTMLTableRowElement>[]>([]);
  const theme = useTheme();
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

  const [editProductId, setEditProductId] = useState<string | null>(null);

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

  const getSelectedProduct = (product: any) => {
    append(product);
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
              <TableCell align="right">{t("warehouse")}</TableCell>
              <TableCell align="right">{t("unit")}</TableCell>
              <TableCell align="right">{t("amount")}</TableCell>
              <TableCell align="right">{t("price")}</TableCell>
              <TableCell align="right">{t("discount_percentage")}</TableCell>
              <TableCell align="right">{t("discount_amount")}</TableCell>
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
                if (
                  editProductId === rows.productId ||
                  rows?.productId === "new-product"
                ) {
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
                        <Typography>
                          {rows?.productName}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography width={100}>

                        {rows?.warehouseName}
                        </Typography>
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
                              <EditCustomSelectMeasure
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
                            {
                              (errors.products as any)[rowIndex].measureId
                                .message
                            }
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
                                const discountPercentage =
                                  item?.discountPercentage || 0;
                                const sellPrice = item?.sellPrice || 0;
                                const discountAmount = (
                                  (sellPrice * value * discountPercentage) /
                                  100
                                ).toFixed(2);
                                setValue(
                                  `products.${rowIndex}.measures.${measureIndex}.discount`,
                                  Number(discountAmount)
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
                              value={item?.sellPrice}
                              name={`products.${rowIndex}.measures.${measureIndex}.sellPrice`}
                              onChange={(e) => {
                                const value = parseFloat(e.target.value) || 0;
                                setValue(
                                  `products.${rowIndex}.measures.${measureIndex}.sellPrice`,
                                  value
                                );
                              }}
                              error={
                                !!(errors?.products as any)?.[rowIndex]
                                  ?.sellPrice
                              }
                            />
                          ))}
                        {(errors?.products as any)?.[rowIndex]?.sellPrice && (
                          <Typography color="error" variant="body1">
                            {
                              (errors.products as any)[rowIndex].sellPrice
                                .message
                            }
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
                                placeholder="Discount percentage"
                                value={item?.discountPercentage}
                                name={`products.${rowIndex}.measures.${measureIndex}.discountPercentage`}
                                onChange={(e) => {
                                  const value = parseFloat(e.target.value) || 0;
                                  setValue(
                                    `products.${rowIndex}.measures.${measureIndex}.discountPercentage`,
                                    value
                                  );
                                  const sellPrice = item?.sellPrice || 0;
                                  const amount = item?.amount || 1;
                                  const discountAmount = (
                                    (sellPrice * amount * value) /
                                    100
                                  ).toFixed(2);
                                  setValue(
                                    `products.${rowIndex}.measures.${measureIndex}.discount`,
                                    Number(discountAmount)
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
                              placeholder="discount"
                              value={item?.discount}
                              name={`products.${rowIndex}.measures.${measureIndex}.discount`}
                              onChange={(e) => {
                                const value = parseFloat(e.target.value) || 0;
                                setValue(
                                  `products.${rowIndex}.measures.${measureIndex}.discount`,
                                  value
                                );
                                const sellPrice = item?.sellPrice || 0;
                                const amount = item?.amount || 1;
                                const discountPercentage =
                                  sellPrice * amount > 0
                                    ? (
                                        (value / (sellPrice * amount)) *
                                        100
                                      ).toFixed(2)
                                    : 0;
                                setValue(
                                  `products.${rowIndex}.measures.${measureIndex}.discountPercentage`,
                                  Number(discountPercentage)
                                );
                              }}
                            />
                          ))}
                      </TableCell>
                      <TableCell align="right">
                        {watch(`products.${rowIndex}.measures`)
                          ?.filter((f: any) => f.selected)
                          ?.map((item: any, measureIndex: number) => {
                            const discount = item?.discount || 0;
                            const amount = item?.amount || 1;
                            const sellPrice = item?.sellPrice || 0;
                            const total =
                              sellPrice * amount - (sellPrice * discount) / 100;
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
                                new Date(
                                  expirationDate?.[0]
                                )?.toLocaleDateString("en-GB")
                              );
                            }

                            return (
                              <Select
                                {...field}
                                fullWidth
                                sx={{ minWidth: "10rem" }}
                                value={new Date(
                                  expirationDate?.[0]
                                ).toLocaleDateString("en-GB")}
                                size="small"
                                onChange={(event: SelectChangeEvent) => {
                                  setValue(
                                    `products.${rowIndex}.expireInDateSelected`,
                                    event?.target?.value
                                  );
                                  // field.onChange(event.target.value as string);
                                }}
                                name={`products.${rowIndex}.expireInDateSelected`}
                                error={
                                  !!(errors?.products as any)?.[rowIndex]
                                    ?.expireInDateSelected
                                }
                              >
                                {(expirationDate || [])?.map(
                                  (item: string, index: number) => (
                                    <MenuItem
                                      key={"expireInDate_" + index}
                                      value={new Date(item)?.toLocaleDateString(
                                        "en-GB"
                                      )}
                                    >
                                      <Moment format="YYYY/MM/DD">
                                        {item}
                                      </Moment>
                                    </MenuItem>
                                  )
                                )}
                              </Select>
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
                        <Box display={"flex"} gap={"0.5rem"}>

                        <SaveRow
                          getProductId={(id: string) => setEditProductId(id)}
                        />
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
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                }

                return (
                  <TableRow
                    key={rows?.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      // border: rows?.error ? "2px solid #fe1212" : undefined,
                    }}
                  >
                    <TableCell component="th" scope="row" align="right">
                      {rows?.productName}
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">
                        {rows?.warehouseName}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Box display={"grid"} rowGap={0.5}>
                        {rows?.measures
                          ?.filter((f: any) => f.selected)
                          ?.map((item: any) => (
                            <Chip
                              key={item?.measureId}
                              label={item?.measureName}
                              sx={{ fontSize: "12px", width: "fit-content" }}
                              size={"medium"}
                            />
                          ))}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Box display={"grid"} rowGap={1}>
                        {rows?.measures
                          ?.filter((f: any) => f.selected)
                          ?.map((item: any) => (
                            <span>{item?.amount}</span>
                          ))}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Box display={"grid"} rowGap={1}>
                        {rows?.measures
                          ?.filter((f: any) => f.selected)
                          ?.map((item: any) => (
                            <span>{item?.sellPrice}</span>
                          ))}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Box display={"grid"} rowGap={1}>
                        {rows?.measures
                          ?.filter((f: any) => f.selected)
                          ?.map((item: any) => (
                            <span>{item?.discountPercentage || 0}</span>
                          ))}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Box display={"grid"} rowGap={1}>
                        {rows?.measures
                          ?.filter((f: any) => f.selected)
                          ?.map((item: any) => (
                            <span>{item?.discount || 0}</span>
                          ))}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Box display={"grid"} rowGap={1}>
                        {rows?.measures
                          ?.filter((f: any) => f.selected)
                          ?.map((item: any, measureIndex: number) => {
                            const discount = item?.discount || 0;
                            const amount = item?.amount || 1;
                            const sellPrice = item?.sellPrice || 0;
                            const total =
                              sellPrice * amount - (sellPrice * discount) / 100;
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
                        {rows?.expirationDate?.[0]}
                      </Moment>
                    </TableCell>
                    <TableCell align="right">
                      <Box
                        display={"flex"}
                        columnGap={1}
                        justifyContent={"center"}
                      >
                        <EditRow
                          getProductId={handleGetProductId}
                          productId={rows?.productId}
                          warehouse={rows?.warehouse}
                        />
                        <IconButton
                          size="medium"
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
                      </Box>
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
        <AddNewRow getSelectedProduct={getSelectedProduct} />
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
