"use client";
import ProductsAutoComplete from "@/components/Auto/productAutoComplete";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid2,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Add, Trash } from "iconsax-react";
import { MouseEvent, useContext, useEffect,  useState } from "react";
import CustomSelectMeasure from "../../_components/customeSeleteMeasure";
import Moment from "react-moment";
import { numberToWords } from "@/utils/numberToWords";
import WarehouseAutoComplete from "@/components/Auto/WarehouseAutoComplete";
import PaymentReceiver from "./Payment";
import { InvoiceContext } from "../../_components/invoiceContext";
import { useApolloClient } from "@apollo/client";
import { GET_PRODUCT_COUNT_IN_ENTREPOT } from "@/graphql/queries/GET_PRODUCT_COUNT_IN_ENTREPOT";
import { AppContext } from "@/provider/appContext";
import { useFieldArray, useFormContext, Controller } from "react-hook-form";
import { useTranslations } from "next-intl";

export default function DataTable() {
  const t = useTranslations("invoice");
  const theme = useTheme();
  const client = useApolloClient();
  const { register, control, watch, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });
  const { paymentOff } =
    useContext(InvoiceContext);
  const [calculateSellBill, setCalculateSellBill] = useState<{
    total: number;
    discount?: number;
    totalAfterDiscount:number,
    receipt:number,
    remain:number
  }>({
    total: 0,
    discount: 0,
    totalAfterDiscount: 0,
    receipt: 0,
    remain: 0,
  });
  const { setHandleError } = useContext(AppContext);
  const [statusPayment, setStatusPayment] = useState<"cash" | "loan">("cash");

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

  const handleAddNewRow = () => {
    append({
      productId: "",
      measures: [],
      warehouse: null,
    });
  
  };

const products:any = watch("products");

   useEffect( () => {
    const initialValue = 0;
    let discount = 0;
    let price = 0;
    const sumWithInitial = products?.reduce((accumulator:any, product:any) => {
      const measures = 0;
      const sumMeasures = product?.measures?.reduce(
        (accum: number, measure: any) => {
          if (measure?.selected) {
            price = price + measure.sellPrice * (measure?.amount || 1);
            discount =
              discount + ((measure?.sellPrice * measure?.discount) / 100 || 0);
            return accum + (measure?.totalPrice || measure?.sellPrice);
          } else return accum;
        },
        measures
      );
      return accumulator + sumMeasures;
    }, initialValue);
    setCalculateSellBill({
      receipt:0,
      remain:price,
      total:price,
      totalAfterDiscount:price - discount,
      discount
    })

  },[JSON.stringify(products)]);


  const handleDeleteFunction = (event: MouseEvent<HTMLButtonElement>) => {
    const id = parseInt(event?.currentTarget?.id);
    remove(id);
  };

  const columns: GridColDef[] = [
    {
      field: "Product Name",
      headerName: t("product_name"),
      sortable: false,
      filterable: false,
      width: 200,
      renderCell: ({ row }) => {
        const rowIndex = row._fieldIndex;
        return (
          <>
            <Controller
              control={control}
              name={`products.${rowIndex}.productId`}
              render={({ field }) => (
                <ProductsAutoComplete
                  getProduct={
                    (product) => {
                      
                      remove(rowIndex);
                      field.onChange(product?._id);
                      append({
                        productId: product?._id,
                        measures: product?.measures?.map(
                          (measure: any, index: number) => ({
                            measureId: measure?.measureId?._id,
                            amount: 1,
                            sellPrice: measure?.sellPrice,
                            discount: measure?.discount,
                            selected: index === 0,
                            measureName: measure?.measureId?.name,
                          })
                        ),
                        warehouse: null,
                      });
                    }
                  }
                  defaultValue={{ ...row, id: row?._id, label: row?.name }}
                  isTable
                  productIds={fields?.map((item: any) => item?.productId)}
                />
              )}
            />
          </>
        );
      },
    },
    {
      field: "warehouse",
      headerName: t("warehouse"),
      sortable: false,
      filterable: false,
      width: 200,
      renderCell: ({ row }) => {
        const rowIndex = row._fieldIndex;
        return (
          <>
            <Controller
              control={control}
              name={`products.${rowIndex}.warehouse`}
              render={({ field }) => (
                <WarehouseAutoComplete
                  name="warehouse"
                  getWarehouse={(data: any) => {
                    field.onChange(data?._id);
                  }}
                />
              )}
            />
          </>
        );
      },
    },
    {
      field: "Unit",
      headerName: t("unit"),
      sortable: false,
      filterable: false,
      width: 200,
      renderCell: ({ row }) => {
        const rowIndex = row._fieldIndex;
        return (
          <Controller
            control={control}
            name={`products.${rowIndex}.measures`}
            render={({ field }) => (
              <CustomSelectMeasure
                data={row?.measures || undefined}
                getDataSelect={(selectedMeasures) => {
                  const updatedMeasures = (row?.measures || []).map(
                    (measure: any) => ({
                      ...measure,
                      selected: selectedMeasures.some(
                        (sel) => sel.measureId === measure.measureId
                      ),
                    })
                  );
                  field.onChange(updatedMeasures);
                }}
              />
            )}
          />
        );
      },
    },
    {
      field: "amount",
      headerName: t("amount"),
      sortable: false,
      filterable: false,
      width: 120,
      renderCell: ({ row }) => {
        const rowIndex = row._fieldIndex;
        const measures = watch(`products.${rowIndex}.measures`);
        return (
          <Box display={"grid"} rowGap={1}>
            {measures?.map((measure: any, measureIndex: number) => {
              if (measure?.selected) {
                return (
                  <Controller
                    control={control}
                    name={`products.${rowIndex}.measures.${measureIndex}.amount`}
                    render={({ field }) => {
                      return (
                        <TextField
                          {...field}
                          sx={style}
                          size="small"
                          type="number"
                          placeholder="تعداد"
                          name="amount"
                          onChange={(e) => {
                          const value = parseFloat(e.target.value) || 0;
                          field.onChange(value);
                          const discountPercentage = measures[measureIndex]?.discountPercentage || 0;
                          const sellPrice =
                            measures[measureIndex]?.sellPrice || 0;
                          const discountAmount = ((sellPrice * value * discountPercentage) / 100).toFixed(2);
                          setValue(
                            `products.${rowIndex}.measures.${measureIndex}.discount`,
                            Number(discountAmount)
                          );
                        }}
                        />
                      );
                    }}
                  />
                );
              } else return <></>;
            })}
          </Box>
        );
      },
    },
    {
      field: "Price",
      headerName: t("price"),
      sortable: false,
      filterable: false,
      width: 120,
      renderCell: ({ row }) => {
        const rowIndex = row._fieldIndex;
        const measures = watch(`products.${rowIndex}.measures`);
        return (
          <Box display={"grid"} rowGap={1}>
            {measures?.map((measure: any, measureIndex: number) => {
              if (measure?.selected) {
                return (
                  <Controller
                    control={control}
                    name={`products.${rowIndex}.measures.${measureIndex}.sellPrice`}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        sx={style}
                        size="small"
                        type="number"
                        placeholder="sellPrice"
                        name="sellPrice"
  
                      />
                    )}
                  />
                );
              } else return <></>;
            })}
          </Box>
        );
      },
    },
    {
      field: "discountPercentage",
      headerName: t("discount_percentage"),
      sortable: false,
      filterable: false,
      width: 120,
      renderCell: ({ row }) => {
        const rowIndex = row._fieldIndex;
        const measures = watch(`products.${rowIndex}.measures`);
        return (
          <Box display={"grid"} rowGap={1}>
            {measures?.map((measure: any, measureIndex: number) => {
              if (measure?.selected) {
                return (
                  <Controller
                    control={control}
                    name={`products.${rowIndex}.measures.${measureIndex}.discountPercentage`}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        sx={style}
                        size="small"
                        type="number"
                        placeholder="discount"
                        name="discountPercentage"
                        onChange={(e) => {
                          const value = parseFloat(e.target.value) || 0;
                          field.onChange(value);
                          const sellPrice =
                            measures[measureIndex]?.sellPrice || 0;
                          const amount = measures[measureIndex]?.amount || 1;
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
                    )}
                  />
                );
              } else return <></>;
            })}
          </Box>
        );
      },
    },
    {
      field: "discount",
      headerName: t("discount_amount"),
      sortable: false,
      filterable: false,
      width: 120,
      renderCell: ({ row }) => {
        const rowIndex = row._fieldIndex;
        const measures = watch(`products.${rowIndex}.measures`);
        return (
          <Box display={"grid"} rowGap={1}>
            {measures?.map((measure: any, measureIndex: number) => {
              if (measure?.selected) {
                return (
                  <Controller
                    control={control}
                    name={`products.${rowIndex}.measures.${measureIndex}.discount`}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        sx={style}
                        size="small"
                        type="number"
                        placeholder="discount"
                        name="discount"
                        onChange={(e) => {
                          const value = parseFloat(e.target.value) || 0;
                          field.onChange(value);
                          const sellPrice =
                            measures[measureIndex]?.sellPrice || 0;
                          const amount = measures[measureIndex]?.amount || 1;
                          const discountPercentage =
                            sellPrice * amount > 0
                              ? ((value / (sellPrice * amount)) * 100).toFixed(
                                  2
                                )
                              : 0;
                          setValue(
                            `products.${rowIndex}.measures.${measureIndex}.discountPercentage`,
                            Number(discountPercentage)
                          );
                        }}
                      />
                    )}
                  />
                );
              } else return <></>;
            })}
          </Box>
        );
      },
    },
    {
      field: "total",
      headerName: t("total"),
      sortable: false,
      filterable: false,
      width: 120,
      renderCell: ({ row }) => {
        const rowIndex = row._fieldIndex;
        const measures = watch(`products.${rowIndex}.measures`);
        return (
          <Box display={"grid"} rowGap={1}>
            {measures
              ?.filter((item: any) => item?.selected)
              ?.map((measure: any, index: number) => {
                const discount = measure?.discount || 0;
                const amount = measure?.amount || 1;
                const sellPrice = measure?.sellPrice || 0;
                const total =
                  sellPrice * amount - ((sellPrice * discount) / 100) ;
                return (
                  <Typography key={measure?.measureId}>
                    {total.toFixed(2)}
                  </Typography>
                );
              })}
          </Box>
        );
      },
    },
    {
      field: "expirationDate",
      headerName: t("expiration_date"),
      sortable: false,
      filterable: false,
      width: 120,
      renderCell: ({ row }) => {
        return (
          <Box display={"grid"}>
            <Moment format="MM/DD/YYYY">{row?.expirationDate}</Moment>
          </Box>
        );
      },
    },
    {
      field: "action",
      headerName: t("actions"),
      sortable: false,
      filterable: false,
      width: 120,
      renderCell: ({ row }) => {
        const rowIndex = row._fieldIndex;
        return (
          <IconButton
            size="small"
            onClick={handleDeleteFunction}
            id={rowIndex}
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
        );
      },
    },
  ];

  const handleChangePaymentStatus = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const values = (event.target as HTMLInputElement).value;
    if (values === "cash" || values === "loan") {
      setStatusPayment(values);
    }
  };

  return (
    <Box sx={{ width: "100%", my: 3 }}>
      {fields?.length > 0 && (
        <DataGrid
          rows={fields?.map((item: any, index) => ({
            ...item,
            id: item.productId?._id || index,
            _fieldIndex: index,
          }))}
          columns={columns}
          getRowClassName={(params) => (params.row.error ? "error-row" : "")}
          sx={{
            py: 4,
            border: 0,
            "& .error-row": {
              border: "2px solid #fe12128f", // Red border for error row
              backgroundColor: "#ffebee33", // Light red background
            },
            "& .MuiDataGrid-main": {
              paddingBottom: "3rem",
            },
            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
          hideFooter
          getRowHeight={() => "auto"}
          disableRowSelectionOnClick
        />
      )}
      
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
          onClick={handleAddNewRow}
          disabled={paymentOff?._id ? true : false}
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
        <Grid2 size={8}>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
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
            amount={calculateSellBill?.total}
            customerId={""}
            paymentStatus={statusPayment}
          />
        </Grid2>
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
          <Box
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
              <Typography>{t("remaining")}</Typography>
            </Box>
            <Typography>
              {calculateSellBill?.remain}
            </Typography>
          </Box>
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
