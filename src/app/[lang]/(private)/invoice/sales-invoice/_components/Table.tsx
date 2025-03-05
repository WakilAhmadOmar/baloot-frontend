"use client";
import ProductsAutoComplete from "@/components/Auto/productAutoComplete";
import { Box, Button, FormControl, FormControlLabel, Grid2, IconButton, Radio, RadioGroup, TextField, Typography, useTheme } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Add, Trash } from "iconsax-react";
import { MouseEvent, useState } from "react";
import CustomSelectMeasure from "../../_components/customeSeleteMeasure";
import Moment from "react-moment";
import PaymentComponent from "../../_components/PaymentComponent";
import { numberToWords } from "@/utils/numberToWords";

interface IPropsTable {
  t: any;
}
export default function DataTable({ t }: IPropsTable) {
  const theme = useTheme();
  const [statusPayment, setStatusPayment] = useState<"cash" | "loan">("cash");
  const [billPrice, setBillPrice] = useState({
    totalPrice: 0,
    consumption: 0,
    price: 0,
    payment: 0,
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
  const [rows, setRows] = useState<any>([]);

  const handleAddNewRow = () => {
    setRows([...rows, { id: rows?.length + 1 }]);
  };

  const sumBillFunction = (filterItems: any[]) => {
    const initialValue = 0;
    let consumptionPrice = 0;
    let price = 0;
    const sumWithInitial = filterItems?.reduce((accumulator, product) => {
      const measures = 0;
      const sumMeasures = product?.measures?.reduce(
        (accum: number, measure: any) => {
          if (measure?.selected){

            price = price + measure.buyPrice * (measure?.amount || 1);
            consumptionPrice = consumptionPrice + (measure?.consumption || 0);
            return accum + (measure?.totalPrice || measure?.buyPrice);
          }else return accum
        },
        measures
      );
      return accumulator + sumMeasures;
    }, initialValue);
    setBillPrice((prevState: any) => ({
      ...prevState,
      price,
      totalPrice: sumWithInitial,
      consumption: consumptionPrice,
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
              ...( index === 0 ? {totalPrice:item?.buyPrice} : {})
              
            })),
          };
        } else return item;
      });
      sumBillFunction(allRow)
      return allRow;
    });

  };

  const handleGetMeasureFunction = (data: any[], idNumber: number) => {
    setRows((prev: any) =>
      prev?.map((item: any, index: number) => {
        if (index === idNumber) {
          return {
            ...item,
            measures: item?.measures?.map((measure: any) =>
              data.some((d) => d?.measureId._id === measure?.measureId?._id)
                ? { ...measure, selected: true }
                : { ...measure, selected: false }
            ),
          };
        }
        return item;
      })
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
    let buyPrice =
      productBill?.[index as number]?.measures?.[measureIndex]
        ?.buyPrice || 0;
    let amount =
      productBill?.[index as number]?.measures?.[measureIndex]?.amount ||
      0;
    let consumption =
      productBill?.[index as number]?.measures?.[measureIndex]
        ?.consumption || 0;

    let totalPrice = (buyPrice + consumption) * amount;

    let measures = productBill?.[index]?.measures;

    if (name === "amount" && value) {
      
      totalPrice = (buyPrice + consumption) * value;

      measures[measureIndex] = {
        ...measures?.[measureIndex],
        [name]: value > 1 ? value : 1,
        // discountAmount: discountAmount.toFixed(2),
        totalPrice: parseFloat(totalPrice.toFixed(2)),
      };
      productBill[index as number] = {
        ...productBill?.[index as number],
        measures: measures,
      };
    }
    // if (name === "discountPrecentage") {
    //   // change discountPrecentage = value
    //   // finde discocuntAmount
    //   // discountAmount = (price * discountPrecentage) / 100
    //   //finde  totalPrice
    //   // totalPrice = totalPrice - (discountAmount * count)
    //   measures[measureIndex] = {
    //     ...measures?.[measureIndex],
    //     [name]: value <= 0 ? 0 : value,
    //     discountAmount: discountAmount,
    //     totalPrice: totalPrice.toFixed(2),
    //   };
    //   productBill[index as number] = {
    //     ...productBill?.[index as number],
    //     measures: measures,
    //   };
    //   return setProductBilState(productBill);
    // }

    if (name === "buyPrice") {
      // discountAmount = ((value * discountPrecentage) / 100) * count;
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
    // if (name === "discountAmount") {
    //   discountPrecentage = (value * 100) / price;
    //   totalPrice = price * count - value;

    //   measures[measureIndex] = {
    //     ...measures?.[measureIndex],
    //     [name]: value <= 0 ? 0 : value,
    //     discountPrecentage: discountPrecentage.toFixed(2),
    //     totalPrice: totalPrice.toFixed(2),
    //   };

    //   productBill[index as number] = {
    //     ...productBill?.[index as number],
    //     measures: measures,
    //   };
    // }
    if (name === "consumption") {
      totalPrice = (buyPrice + value) * amount;
      measures[measureIndex] = {
        ...measures?.[measureIndex],
        [name]: value > 0 ? value : 0,
        // discountPrecentage: discountPrecentage.toFixed(2),
        totalPrice: parseFloat(totalPrice.toFixed(2)),
        overPrice: buyPrice + value,
      };

      productBill[index as number] = {
        ...productBill?.[index as number],
        measures: measures,
      };
    }
    sumBillFunction(productBill);
    setRows(productBill);
  };
  const handleDeleteFunction = (event:MouseEvent<HTMLButtonElement>) => {
    const id = parseInt(event?.currentTarget?.id)
    setRows(rows?.filter((item:any , index:number) => index !== id))
  }
  const columns: GridColDef[] = [
    {
      field: "Product Name",
      headerName: t?.invoice?.product_name,
      sortable:false,
      filterable:false,
      width: 200,
      renderCell: ({ row }) => {
        const rowIndex = rows.findIndex((r: any) => r._id === row._id);
        return (
          <>
            <ProductsAutoComplete
              getProduct={(product) =>
                handleGetSelectedProduct(product, rowIndex)
              }
              defaultValue={row}
              t={t}
              isTable
              productIds={rows?.map((item: any) => item?.id)}
            />
          </>
        );
      },
    },
    {
      field: "Unit",
      headerName: t?.invoice?.unit,
      sortable:false,
      filterable:false,
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
      sortable:false,
      filterable:false,
      width: 120,
      renderCell: ({ row }) => {

        return (
          <Box display={"grid"}>
            {row?.measures?.map((measure: any , measureIndex:number) => {
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
                      handleChangeBillFunction(
                        event,
                        rowIndex,
                        measureIndex
                      )
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
      sortable:false,
      filterable:false,
      width: 120,
      renderCell: ({ row }) => {
        return (
          <Box display={"grid"}>
            {row?.measures?.map((measure: any , measureIndex:number) => {
              const rowIndex = rows.findIndex((r: any) => r._id === row._id);
              if (measure?.selected) {
                return (
                  <TextField
                    sx={style}
                    size="small"
                    type="number"
                    placeholder="buyPrice"
                    value={measure?.buyPrice || 1}
                    name="buyPrice"
                    onChange={(event) =>
                      handleChangeBillFunction(
                        event,
                        rowIndex,
                        measureIndex
                      )
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
      field: "consumption",
      headerName: t?.invoice?.consumption,
      sortable:false,
      filterable:false,
      width: 120,
      renderCell: ({ row }) => {
        return (
          <Box display={"grid"}>
            {row?.measures?.map((measure: any , measureIndex:number)  => {
              const rowIndex = rows.findIndex((r: any) => r._id === row._id);
              if (measure?.selected) {
                return (
                  <TextField
                    sx={style}
                    size="small"
                    type="number"
                    placeholder="consumption"
                    value={measure?.consumption || 0}
                    name="consumption"
                    onChange={(event) =>
                      handleChangeBillFunction(
                        event,
                        rowIndex,
                        measureIndex
                      )
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
      sortable:false,
      filterable:false,
      width: 120,
      renderCell: ({ row }) => {
        return (
          <Box display={"grid"}>

            {row?.measures?.map((measure:any , index:number) => {
              return <Typography key={index + measure?.totalPrice}>{measure?.totalPrice}</Typography>
            })}
          </Box>
        );
      },
    },
    {
      field: "expirationDate",
      headerName: t?.invoice?.expiration_date,
      sortable:false,
      filterable:false,
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
      sortable:false,
      filterable:false,
      width: 120,
      renderCell: ({ row }) => {
        const rowIndex = rows.findIndex((r: any) => r._id === row._id);
        return (
          <IconButton
            size="small"
            onClick={handleDeleteFunction}
            id={rowIndex}
          >
            <Trash size={20} color={theme.palette.primary.contrastText} />
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
    <Box sx={{ width: "100%", my:3}}>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{
          border: 0,
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
        <Grid2  size={8}>
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
          <PaymentComponent
              customer={"Ahmad"}
              amount={billPrice?.totalPrice}
              customerId={""}
              paymentStatus={statusPayment}
              t={t}
            />
        </Grid2>
        <Grid2  size={4} marginTop={3}>
          <Box
            sx={{ borderBottom: `2px solid ${theme.palette?.grey[100]}` }}
            display="grid"
            gridTemplateColumns={"50% 50%"}
            columnGap="1rem"
            
            
          >
            <Box bgcolor={theme.palette?.grey[100]} p={1}  paddingInlineStart={2}>
              {" "}
              <Typography>{t?.invoice?.total_invoice_amount}</Typography>
            </Box>
            <Typography alignItems={"center"} display="grid">
              {billPrice.price}
            </Typography>
          </Box>
          <Box
            sx={{ borderBottom: `1px solid ${theme.palette?.grey[100]}` }}
            display="grid"
            gridTemplateColumns={"50% 50%"}
            columnGap="1rem"
            
          >
            <Box bgcolor={theme.palette?.grey[100]} p={1}  paddingInlineStart={2}>
              {" "}
              <Typography>{t?.invoice?.total_expense}</Typography>
            </Box>
            <Typography alignItems={"center"} display="grid">
              {billPrice?.consumption}
            </Typography>
          </Box>
          <Box
            sx={{ borderBottom: `1px solid ${theme.palette?.grey[100]}` }}
            display="grid"
            gridTemplateColumns={"50% 50%"}
            columnGap="1rem"
            
          >
            <Box bgcolor={theme.palette?.grey[100]} p={1}  paddingInlineStart={2}>
              {" "}
              <Typography>{t?.invoice?.total_invoice_after_expense} </Typography>
            </Box>
            <Typography alignItems={"center"} display="grid">
              {billPrice?.totalPrice}
            </Typography>
          </Box>
          <Box
            sx={{ borderBottom: `1px solid ${theme.palette?.grey[100]}` }}
            display="grid"
            gridTemplateColumns={"50% 50%"}
            columnGap="1rem"
            alignItems={"center"}
            
          >
            <Box bgcolor={theme.palette?.grey[100]} p={1}  paddingInlineStart={2}>
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
            <Box bgcolor={theme.palette?.grey[100]} p={1}  paddingInlineStart={2}>
              {" "}
              <Typography>{t?.invoice?.remaining}</Typography>
            </Box>
            <Typography>
              {/* {billPrice?.totalPrice - (paymentOff?.payAmount || 0)} */}
              {billPrice?.totalPrice }
            </Typography>
          </Box>
        </Grid2>
      </Grid2>
      <Box display="flex" columnGap={"1rem"}>
        <Typography variant="overline" bgcolor={theme.palette.grey[100]}>
                {t?.invoice?.total_invoice_after_discount_in_words} :
        </Typography>
        <Typography variant="overline">
          {numberToWords(billPrice?.totalPrice, t)}
        </Typography>
      </Box>
    </Box>
  );
}
