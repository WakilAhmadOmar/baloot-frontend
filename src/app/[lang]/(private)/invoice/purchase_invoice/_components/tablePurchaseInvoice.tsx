import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Grid2,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Add, Trash } from "iconsax-react";

//   import PaymentComponent from "./payment";

//   import CustomSelect from "../muiComponent/customSelect";
//   import { useForm } from "react-hook-form";
//   import SelectComponent from "../muiComponent/selectComponent";
import React, { useContext, useState } from "react";
//   import ComboBox from "../muiComponent/testAutoComplete";
//   import ProductMeansureComponent from "../muiComponent/productMeansure";

//   import { FactorContext } from "../context/factorContext";
import { InvoiceContext } from "../../_components/invoiceContext";
import ProductsAutoComplete from "@/components/Auto/productAutoComplete";
import { numberToWords } from "@/utils/numberToWords";
import CustomSelectMeasure from "../../_components/customeSeleteMeasure";
import SelectComponent from "../../_components/customeSelect";
import Moment from "react-moment";
import PaymentComponent from "../../_components/PaymentComponent";
interface IPropsTableFactore {
  showWearehous?: Boolean;
  t: any;
}
const TablePurchaseInvoice: React.FC<IPropsTableFactore> = ({
  showWearehous = false,
  t,
}) => {
  const theme = useTheme();
  // const [productBilState, setProductBilState] = useState<any[]>([]);
  const styles = {
    width: "90%",
    border: "none",
    padding: "3px 5px",
    margin: "0 auto",
  };
  const {
    paymentOff,
    billPrice,
    setBillPrice,
    productBilState,
    setProductBilState,
  } = useContext(InvoiceContext);
  // const [billPrice, setBillPrice] = useState({
  //   totalPrice: 0,
  //   consumption: 0,
  //   price: 0,
  //   payment: 0,
  // });

  // const [statusPayment, setStatusPayment] = useState<"cash" | "loan">("cash");

  const style = {
    width: "90%",
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

  const sumBillFunction = (filterItems: any[]) => {
    const initialValue = 0;
    let consumptionPrice = 0;
    let price = 0;
    const sumWithInitial = filterItems?.reduce((accumulator, product) => {
      const measures = 0;
      const sumMeasures = product?.selectedMeasure?.reduce(
        (accum: number, measure: any) => {
          price = price + measure.buyPrice * (measure?.amount || 1);
          consumptionPrice = consumptionPrice + (measure?.consumption || 0);
          return accum + (measure?.totalPrice || measure?.buyPrice);
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

  const handleGetSelectedProduct = (newProduct: any, index?: number) => {
    let allProducts = [...productBilState];
    allProducts[index as number] = {
      ...newProduct,
      selectedMeasure: [
        {
          ...newProduct?.measures?.[0],
          totalPrice: newProduct?.measures?.[0]?.buyPrice,
        },
      ],
    };
    sumBillFunction(allProducts);
    // const duplicate = allCustomer?.filter(
    //   (value, index, self) =>
    //     index === self.findIndex((t) => t._id === value._id)
    // );
    setProductBilState(allProducts);
  };
  const handleAddNewRow = () => {
    setProductBilState((prevState: any) => [
      ...(prevState?.length > 0 ? prevState : []),
      {
        // ...prevState?.[prevState?.length - 1],
        // selectedMeasure: [prevState?.[prevState?.length - 1]?.measures?.[0]],
        selectedMeasure: [],
      },
    ]);
  };

  const handleGetUnitProduct = (data: any, index?: number) => {
    let allCustomer = [...productBilState];
    allCustomer[index as number] = {
      ...allCustomer?.[index as number],
      selectedMeasure: {
        ...data,
        count: 1,
      },
      totalPrice: data?.buyPrice,
    };
    setProductBilState(allCustomer);
  };

  const handleChangeBillFunction = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index: number,
    measureIndex: number
  ) => {
    const name = event?.currentTarget?.name;
    const value = parseInt(event?.currentTarget?.value) || 0;
    let productBill = [...productBilState];
    let buyPrice =
      productBill?.[index as number]?.selectedMeasure?.[measureIndex]
        ?.buyPrice || 0;
    let amount =
      productBill?.[index as number]?.selectedMeasure?.[measureIndex]?.amount ||
      0;
    let consumption =
      productBill?.[index as number]?.selectedMeasure?.[measureIndex]
        ?.consumption || 0;
    // let discountPrecentage =
    //   productBill?.[index as number]?.selectedMeasure?.[measureIndex]
    //     ?.discountPrecentage || 0;
    // let discountAmount = discountPrecentage ? (price * value) / 100 : 0;
    let totalPrice = (buyPrice + consumption) * amount;

    let selectedMeasure = productBill?.[index]?.selectedMeasure;

    if (name === "amount" && value) {
      //change count === value
      // change discountAmount if discountPrecentage is exist
      // discountAmount = discountPrecentage
      //   ? ((price * discountPrecentage) / 100) * value
      //   : 0;
      totalPrice = (buyPrice + consumption) * value;

      selectedMeasure[measureIndex] = {
        ...selectedMeasure?.[measureIndex],
        [name]: value > 1 ? value : 1,
        // discountAmount: discountAmount.toFixed(2),
        totalPrice: parseFloat(totalPrice.toFixed(2)),
      };
      productBill[index as number] = {
        ...productBill?.[index as number],
        selectedMeasure: selectedMeasure,
      };
    }
    // if (name === "discountPrecentage") {
    //   // change discountPrecentage = value
    //   // finde discocuntAmount
    //   // discountAmount = (price * discountPrecentage) / 100
    //   //finde  totalPrice
    //   // totalPrice = totalPrice - (discountAmount * count)
    //   selectedMeasure[measureIndex] = {
    //     ...selectedMeasure?.[measureIndex],
    //     [name]: value <= 0 ? 0 : value,
    //     discountAmount: discountAmount,
    //     totalPrice: totalPrice.toFixed(2),
    //   };
    //   productBill[index as number] = {
    //     ...productBill?.[index as number],
    //     selectedMeasure: selectedMeasure,
    //   };
    //   return setProductBilState(productBill);
    // }

    if (name === "buyPrice") {
      // discountAmount = ((value * discountPrecentage) / 100) * count;
      totalPrice = (value + consumption) * amount;

      selectedMeasure[measureIndex] = {
        ...selectedMeasure?.[measureIndex],
        [name]: value <= 0 ? 0 : value,
        // discountAmount: discountAmount,
        totalPrice: parseFloat(totalPrice.toFixed(2)),
      };
      productBill[index as number] = {
        ...productBill?.[index as number],
        selectedMeasure: selectedMeasure,
      };
    }
    // if (name === "discountAmount") {
    //   discountPrecentage = (value * 100) / price;
    //   totalPrice = price * count - value;

    //   selectedMeasure[measureIndex] = {
    //     ...selectedMeasure?.[measureIndex],
    //     [name]: value <= 0 ? 0 : value,
    //     discountPrecentage: discountPrecentage.toFixed(2),
    //     totalPrice: totalPrice.toFixed(2),
    //   };

    //   productBill[index as number] = {
    //     ...productBill?.[index as number],
    //     selectedMeasure: selectedMeasure,
    //   };
    // }
    if (name === "consumption") {
      totalPrice = (buyPrice + value) * amount;
      selectedMeasure[measureIndex] = {
        ...selectedMeasure?.[measureIndex],
        [name]: value > 0 ? value : 0,
        // discountPrecentage: discountPrecentage.toFixed(2),
        totalPrice: parseFloat(totalPrice.toFixed(2)),
        overPrice: buyPrice + value,
      };

      productBill[index as number] = {
        ...productBill?.[index as number],
        selectedMeasure: selectedMeasure,
      };
    }
    sumBillFunction(productBill);
    setProductBilState(productBill);
  };
  const handleGetProductFunction = (item: any) => {
    let productBill = [
      ...productBilState,
      {
        ...item,
        selectedMeasure: [item?.measures?.[0]],
      },
    ];
    sumBillFunction(productBill);
    setProductBilState(productBill);
  };

  const handleGetMeasureFunction = (data: string[], index?: number) => {
    let productBill = [...productBilState];

    productBill[index as number] = {
      ...productBill?.[index as number],
      selectedMeasure: data,
    };

    sumBillFunction(productBill);

    setProductBilState(productBill);
  };

  const habdleDeleteFunction = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = parseInt(event?.currentTarget?.id);
    const filterItems = productBilState?.filter(
      (item: any, index: number) => index !== id
    );
    setProductBilState(filterItems);
    sumBillFunction(filterItems);
  };

  // const handleChangePaymentStatus = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const values = (event.target as HTMLInputElement).value;
  //   if (values === "cash" || values === "loan") {
  //     setStatusPayment(values);
  //   }
  // };
  return (
    <Box mt={3} p={1}>
      <Box>
        <Box maxWidth={"40rem"} mb={2}>
            <ProductsAutoComplete 
            t={t}
              getProduct={handleGetProductFunction}
              productIds={productBilState?.map((item:any) => item?._id)}
            />
          </Box>
        {/* <TextField placeholder="جستجو یا فیلتر کردن محصول..." size="small" /> */}

        <Box
          p={1}
          sx={{
            display: "grid",
            ...(showWearehous
              ? { gridTemplateColumns: `15% 10% 10% auto  5rem` }
              : { gridTemplateColumns: `20%  15% auto  5rem` }),
            borderBottom: `1px solid ${theme.palette?.grey[100]} `,
            background: theme.palette.grey[100],
          }}
        >
          <Typography variant="overline">{t?.invoice?.product_name}</Typography>
          {showWearehous && <Typography variant="overline">{t?.invoice?.warehouse}</Typography>}
          <Typography variant="overline">{t?.invoice?.unit}</Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "20% 20% 20% 15% 15%  10%",
            //   borderBottom: `1px solid ${theme.palette?.grey[100]} `,
            }}
          >
            <Typography variant="overline">{t.invoice?.count}</Typography>
            <Typography variant="overline">{t.invoice?.price}</Typography>
            <Typography variant="overline">{t?.invoice?.expense}</Typography>
            <Typography variant="overline">{t?.invoice?.total_price}</Typography>
            {/* <Typography variant="overline">مبلغ تخفیف</Typography> */}

            <Typography variant="overline">{t?.invoice?.expiration_data}</Typography>
            <Typography variant="overline">{t?.invoice?.total}</Typography>
          </Box>
          <Typography variant="overline">{t?.invoice?.actions}</Typography>
        </Box>
        {productBilState?.map((item: any, index: number) => {
          return (
            <Box
              key={item?._id}
              p={1}
              sx={{
                display: "grid",
                ...(showWearehous
                  ? { gridTemplateColumns: `15% 10% 10% auto  5rem` }
                  : { gridTemplateColumns: `20%  15% auto  5rem` }),
                borderBottom: `1px solid ${theme.palette?.grey[100]} `,
              }}
            >
              <Box display={"grid"} alignItems={"center"}>
                <ProductsAutoComplete
                  getProduct={handleGetSelectedProduct}
                  defaultValue={item}
                  index={index}
                  // name={"productName"}
                  t={t}
                  isTable
                  productIds={productBilState?.map((item: any) => item?._id)}
                />
              </Box>
              {showWearehous && (
                <Box>
                  <SelectComponent
                    data={[
                      { name: "کدام مرکزی", _id: "sdfdsfasdfsdf" },
                      { name: "گدام دفتر", _id: "dskfjkdfkffsdff" },
                    ]}
                  />
                </Box>
              )}
              <Box>
                <CustomSelectMeasure
                  idNumber={index}
                  data={item?.measures || undefined}
                  getDataSelect={handleGetMeasureFunction}
                />
              </Box>
              <Box>
                {item?.selectedMeasure?.map(
                  (measure: any, measureIndex: number) => {
                    return (
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "20% 20% 20% 15% 15%  10%",
                          ...(measureIndex === item?.selectedMeasure?.length - 1
                            ? {}
                            : {
                                borderBottom: `1px solid ${theme.palette?.grey[100]} `,
                              }),
                        }}
                      >
                        <Box>
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
                                index,
                                measureIndex
                              )
                            }
                          />
                        </Box>
                        <Box>
                          {" "}
                          <TextField
                            sx={style}
                            size="small"
                            placeholder="قیمت"
                            value={measure?.buyPrice}
                            name="buyPrice"
                            type="number"
                            onChange={(event) =>
                              handleChangeBillFunction(
                                event,
                                index,
                                measureIndex
                              )
                            }
                          />
                        </Box>
                        <Box>
                          {" "}
                          <TextField
                            sx={style}
                            size="small"
                            placeholder={t?.invoice?.expense}
                            value={measure?.consumption}
                            name="consumption"
                            type="number"
                            onChange={(event) =>
                              handleChangeBillFunction(
                                event,
                                index,
                                measureIndex
                              )
                            }
                          />
                        </Box>
                        <Box display={"flex"} alignItems={"center"}>
                          <Typography>
                            {measure?.buyPrice + (measure?.consumption || 0)}
                          </Typography>
                        </Box>
                        <Box
                          display={"flex"}
                          alignItems={"center"}
                          fontSize={"1.3rem"}
                        >
                          <Typography>
                            {" "}
                            <Moment format="MM/DD/YYYY">{item?.expirationDate}</Moment>{" "}
                          </Typography>
                        </Box>
                        <Box
                          display={"flex"}
                          alignItems={"center"}
                          fontSize={"1.3rem"}
                        >
                          <Typography>
                            {measure?.totalPrice || measure?.buyPrice || 0}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  }
                )}
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                
              >
                <IconButton
                  size="small"
                  onClick={habdleDeleteFunction}
                  id={`${index}`}
                  
                >
                  <Trash size={20} color={theme.palette.primary.contrastText}/>
                </IconButton>
              </Box>
            </Box>
          );
        })}
      </Box>
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
          {productBilState?.length}
        </Typography>
      </Box>
      {/* <Grid2
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
              {paymentOff?.payAmount || 0}
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
              {billPrice?.totalPrice - (paymentOff?.payAmount || 0)}
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
      </Box> */}
    </Box>
  );
};
export default TablePurchaseInvoice;
