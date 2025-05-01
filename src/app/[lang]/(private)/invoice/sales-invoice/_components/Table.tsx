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
import { MouseEvent, useContext, useState } from "react";
import CustomSelectMeasure from "../../_components/customeSeleteMeasure";
import Moment from "react-moment";
import { numberToWords } from "@/utils/numberToWords";
import WarehouseAutoComplete from "@/components/Auto/WarehouseAutoComplete";
import PaymentReceiver from "./Payment";
import { InvoiceContext } from "../../_components/invoiceContext";
import { useApolloClient } from "@apollo/client";
import { GET_PRODUCT_COUNT_IN_ENTREPOT } from "@/graphql/queries/GET_PRODUCT_COUNT_IN_ENTREPOT";
import { AppContext } from "@/provider/appContext";
import { useFormContext } from "react-hook-form";

interface IPropsTable {
  t: any;
 
}
export default function DataTable({ t }: IPropsTable) {
  const theme = useTheme();
  const client = useApolloClient();
  const {register} = useFormContext()
  const { rows, setRows, sellBillPrice, setSellBillPrice, paymentOff } =
    useContext(InvoiceContext);
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
    setRows([...rows, { id: rows?.length + 1 }]);
  };

  const sumBillFunction = (filterItems: any[]) => {
    const initialValue = 0;
    let discount = 0;
    let price = 0;
    const sumWithInitial = filterItems?.reduce((accumulator, product) => {
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
    setSellBillPrice((prevState: any) => ({
      ...prevState,
      price,
      totalPrice: sumWithInitial,
      discount: discount,
    }));
  };

  const handleGetSelectedProduct = (product: any, indexItem: number) => {
    setRows((prev: any[]) => {
      const allRow = prev?.map((item, index) => {
        if (index === indexItem) {
          return {
            id: product?._id,
            ...product,
            measures: product?.measures?.map((item: any, index: number) => ({
              ...item,
              selected: index === 0,
              ...(index === 0 ? { totalPrice: item?.buyPrice, amount: 1 } : {}),
            })),
          };
        } else return item;
      });
      sumBillFunction(allRow);
      return allRow;
    });
  };

  const handleGetMeasureFunction = (data: any[], idNumber: number) => {
    setRows((prev: any) =>{
      const allRows = prev?.map((item: any, index: number) => {
        if (index === idNumber) {
          return {
            ...item,
            measures: item?.measures?.map((measure: any) =>
              data.some((d) => d?.measureId._id === measure?.measureId?._id)
                ? { ...measure, selected: true ,totalPrice: measure?.buyPrice, }
                : { ...measure, selected: false , totalPrice: null}
            ),
          };
        }
        return item;
      })
      sumBillFunction(allRows);
      return allRows;
    }
    );
  };

  const handleChangeBillFunction = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index: number,
    measureIndex: number
  ) => {
    const name = event?.currentTarget?.name;
    const value = parseInt(event?.currentTarget?.value) || 0;
    let productBill = [...rows];
    let sellPrice =
      productBill?.[index as number]?.measures?.[measureIndex]?.sellPrice || 0;
    let amount =
      productBill?.[index as number]?.measures?.[measureIndex]?.amount || 0;
    let consumption =
      productBill?.[index as number]?.measures?.[measureIndex]?.consumption ||
      0;

    let totalPrice = (sellPrice + consumption) * amount;

    let measures = productBill?.[index]?.measures;

    if (name === "amount" && value) {
      totalPrice = (sellPrice + consumption) * value;

      measures[measureIndex] = {
        ...measures?.[measureIndex],
        [name]: value > 1 ? value : 1,
        totalPrice: parseFloat(totalPrice.toFixed(2)),
      };
      productBill[index as number] = {
        ...productBill?.[index as number],
        measures: measures,
      };
    }

    if (name === "sellPrice") {
      totalPrice = (value + consumption) * amount;

      measures[measureIndex] = {
        ...measures?.[measureIndex],
        [name]: value <= 0 ? 0 : value,
        // discountAmount: discountAmount,
        totalPrice: parseFloat(totalPrice.toFixed(2)),
      };
      productBill[index as number] = {
        ...productBill?.[index as number],
        measures: measures,
      };
    }
    if (name === "discount") {
      totalPrice = sellPrice * amount - ((sellPrice * value) / 100) * amount;
      measures[measureIndex] = {
        ...measures?.[measureIndex],
        [name]: value > 0 ? value : 0,
        totalPrice: parseFloat(totalPrice.toFixed(2)),
        overPrice: sellPrice + value,
      };

      productBill[index as number] = {
        ...productBill?.[index as number],
        measures: measures,
      };
    }
    sumBillFunction(productBill);
    setRows(productBill);
  };
  const handleDeleteFunction = (event: MouseEvent<HTMLButtonElement>) => {
    const id = parseInt(event?.currentTarget?.id);
    setRows(rows?.filter((item: any, index: number) => index !== id));
  };

  const handleGetWarehouse = async (warehouse: any, rowIndex: number) => {
    try {
      const variables = {
        entrepotId: warehouse?._id,
        productId: rows?.[rowIndex]?._id,
      };
      const {
        data: { getProductCountInEntrepot },
      } = await client.query({
        query: GET_PRODUCT_COUNT_IN_ENTREPOT,
        variables,
      });

      const existProduct = getProductCountInEntrepot?.measures?.some(
        (d: any) => d?.amountOfProduct > 0
      );
      setRows((prevState: any) => {
        const allRow = prevState?.map((item: any, index: number) => {
          if (index === rowIndex) {
            return {
              ...item,
              warehouse: warehouse,
              error: !existProduct,
            };
          } else return item;
        });
        return allRow;
      });
      if (!existProduct) {
        setHandleError({
          open: true,
          message: "this product is not exist in this warehouse.",
          type: "error",
        });
      }
    } catch (error) {}
  };
  const columns: GridColDef[] = [
    {
      field: "Product Name",
      headerName: t?.invoice?.product_name,
      sortable: false,
      filterable: false,
      width: 200,
      renderCell: ({ row }) => {
        const rowIndex = rows.findIndex((r: any) => r._id === row._id);
        return (
          <>
            <ProductsAutoComplete
              getProduct={(product) =>
                handleGetSelectedProduct(product, rowIndex)
              }
              defaultValue={{ ...row, id: row?._id, label: row?.name }}
              t={t}
              isTable
              productIds={rows?.map((item: any) => item?.id)}
            />
          </>
        );
      },
    },
    {
      field: "warehouse",
      headerName: t?.invoice?.warehouse,
      sortable: false,
      filterable: false,
      width: 200,
      renderCell: ({ row }) => {
        const rowIndex = rows.findIndex((r: any) => r._id === row._id);
        return (
          <>
            <WarehouseAutoComplete
              // register={register}
              getWarehouse={(data: any) => handleGetWarehouse(data, rowIndex)}
              defaultValue={{ ...row?.warehouse, id: row?.warehouse?._id }}
            />
          </>
        );
      },
    },
    {
      field: "Unit",
      headerName: t?.invoice?.unit,
      sortable: false,
      filterable: false,
      width: 200,
      renderCell: ({ row }) => {
        const rowIndex = rows.findIndex((r: any) => r._id === row._id);
        return (
          <CustomSelectMeasure
            // idNumber={index}
            data={row?.measures || undefined}
            getDataSelect={(data) => handleGetMeasureFunction(data, rowIndex)}
          />
        );
      },
    },
    {
      field: "amount",
      headerName: t?.invoice?.amount,
      sortable: false,
      filterable: false,
      width: 120,
      renderCell: ({ row }) => {
        return (
          <Box display={"grid"}>
            {row?.measures?.map((measure: any, measureIndex: number) => {
              const rowIndex = rows.findIndex((r: any) => r._id === row._id);
              if (measure?.selected) {
                return (
                  <TextField
                    sx={style}
                    size="small"
                    type="number"
                    placeholder="تعداد"
                    value={measure?.amount || 1}
                    name="amount"
                    onChange={(event) =>
                      handleChangeBillFunction(event, rowIndex, measureIndex)
                    }
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
      headerName: t?.invoice?.price,
      sortable: false,
      filterable: false,
      width: 120,
      renderCell: ({ row }) => {
        return (
          <Box display={"grid"}>
            {row?.measures?.map((measure: any, measureIndex: number) => {
              const rowIndex = rows.findIndex((r: any) => r._id === row._id);
              if (measure?.selected) {
                return (
                  <TextField
                    sx={style}
                    size="small"
                    type="number"
                    placeholder="sellPrice"
                    value={measure?.sellPrice || 1}
                    name="sellPrice"
                    onChange={(event) =>
                      handleChangeBillFunction(event, rowIndex, measureIndex)
                    }
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
      headerName: t?.invoice?.discount,
      sortable: false,
      filterable: false,
      width: 120,
      renderCell: ({ row }) => {
        return (
          <Box display={"grid"}>
            {row?.measures?.map((measure: any, measureIndex: number) => {
              const rowIndex = rows.findIndex((r: any) => r._id === row._id);
              if (measure?.selected) {
                return (
                  <TextField
                    sx={style}
                    size="small"
                    type="number"
                    placeholder="discount"
                    value={measure?.discount || 0}
                    name="discount"
                    onChange={(event) =>
                      handleChangeBillFunction(event, rowIndex, measureIndex)
                    }
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
      headerName: t?.invoice?.total,
      sortable: false,
      filterable: false,
      width: 120,
      renderCell: ({ row }) => {
        return (
          <Box display={"grid"}>
            {row?.measures?.map((measure: any, index: number) => {
              return (
                <Typography key={index + measure?.totalPrice}>
                  {measure?.totalPrice}
                </Typography>
              );
            })}
          </Box>
        );
      },
    },
    {
      field: "expirationDate",
      headerName: t?.invoice?.expiration_date,
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
      headerName: t?.invoice?.actions,
      sortable: false,
      filterable: false,
      width: 120,
      renderCell: ({ row }) => {
        const rowIndex = rows.findIndex((r: any) => r._id === row._id);
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
      <DataGrid
        rows={rows}
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
      {/* <Box my={3}>
        <Button
          startIcon={<Add style={{ margin: "0 1rem" }} />}
          variant={"outlined"}
          size={"small"}
          onClick={handleAddNewRow}
        >
          {t?.invoice?.insert_new_row}
        </Button>
      </Box> */}
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
          {t?.invoice?.insert_new_row}
        </Button>
        <Typography variant="overline">{t?.invoice?.total_products}</Typography>
        <Typography
          variant="overline"
          bgcolor={theme.palette.grey[100]}
          minWidth={"15rem"}
          sx={{ paddingInlineStart: "1rem", borderRadius: "5px" }}
        >
          {rows?.length}
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
                label={t?.invoice?.cash_payment}
              />
              <FormControlLabel
                value="loan"
                control={<Radio />}
                label={t?.invoice?.total_invoice_on_credit}
              />
            </RadioGroup>
          </FormControl>
          {/* <Box>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="پرداخت بصورت نقدی ( پرداخت کننده صندوق مرکزی)"
              />
            </Box>
            <Box>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="کل فاکتور به صورت قرض"
              />
            </Box>
            <Box>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="حساب گذشته مبلغ 2300 افغانی"
              />
            </Box> */}
          <PaymentReceiver
            customer={"Ahmad"}
            amount={sellBillPrice?.totalPrice}
            customerId={""}
            paymentStatus={statusPayment}
            t={t}
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
              <Typography>{t?.invoice?.total_invoice_amount}</Typography>
            </Box>
            <Typography alignItems={"center"} display="grid">
              {sellBillPrice.price}
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
              <Typography>{t?.invoice?.total_expense}</Typography>
            </Box>
            <Typography alignItems={"center"} display="grid">
              {sellBillPrice?.discount}
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
                {t?.invoice?.total_invoice_after_expense}{" "}
              </Typography>
            </Box>
            <Typography alignItems={"center"} display="grid">
              {sellBillPrice?.totalPrice}
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
              <Typography>{t?.invoice?.receipt}</Typography>
            </Box>
            <Typography alignItems={"center"} display="grid">
              {/* {paymentOff?.payAmount || 0} */}
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
              <Typography>{t?.invoice?.remaining}</Typography>
            </Box>
            <Typography>
              {/* {sellBillPrice?.totalPrice - (paymentOff?.payAmount || 0)} */}
              {sellBillPrice?.totalPrice}
            </Typography>
          </Box>
        </Grid2>
      </Grid2>
      <Box display="flex" columnGap={"1rem"}>
        <Typography variant="overline" bgcolor={theme.palette.grey[100]}>
          {t?.invoice?.total_invoice_after_discount_in_words} :
        </Typography>
        <Typography variant="overline">
          {numberToWords(sellBillPrice?.totalPrice, t)}
        </Typography>
      </Box>
    </Box>
  );
}
