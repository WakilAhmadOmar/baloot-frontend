"use client"

import {
    AppBar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    IconButton,
    InputAdornment,
    Pagination,
    Slide,
    Stack,
    Toolbar,
    Typography,
    useTheme,
  } from "@mui/material";
  import { TransitionProps } from "@mui/material/transitions";
  import { Calendar, CloseSquare } from "iconsax-react";
  import React, { useContext, useState } from "react";
  //   import { useForm } from "react-hook-form";
  //   import FormFactor from "../../../components/factors/formFactore";
  //   import TableFactore from "../../../components/factors/tableBuyFactore";
  import RowFactor from "../../_components/RowFactor";
  //   import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
  //   import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
  //   import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
  //   import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
  //   import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
    import CustomSearch from "@/components/search/CustomSearch";
  //   import FactorContextComponent, {
  //     FactorContext,
  //   } from "@/components/context/factorContext";
  import { useApolloClient } from "@apollo/client";
  import { ADD_BUY_BILL } from "@/graphql/mutation/ADD_BUY_BILL";
  import CreateSalesInvoice from "./Create";
  import InvoiceContextProvider from "../../_components/invoiceContext";
  import { getDictionary } from "@/dictionaries";
  import SingleInputDateRangePicker from "@/components/util/SingleInputDateRangePicker";
  
  interface IProps {
    t:any
  }
   const PurchaseInvoicePage:React.FC<IProps> =  ({t}) => {
   
    // const {
    //   hooksForm: { register, handleSubmit, errors },
    //   customer,
    //   entrepot,
    //   productBilState,
    //   billPrice,
    //   paymentOff
    // } = useContext(FactorContext);
    // const {
    //   register,
    //   handleSubmit,
    //   watch,
    //   formState: { errors },
    //   getValues,
    //   getFieldState,
    // } = useForm();
  
    // const client = useApolloClient()
    // const [openDialog, setOpenDialog] = React.useState(false);
    // const [custmerState, setCustomerState] = useState<any>({});
    const handleClose = () => {
      //   setOpenDialog(!openDialog);
    };
  
    const onSubmitFunction = async (data: any) => {
      //     customerId: ID
      // billDate: DateTime
      // entrepotId: ID
      // billCurrencyId: ID
      // billProducts: [BuyBillProductInput]
      // productsCount: Int
      // totalPriceOfBill: Float
      // consumptionPrice: Float
      // recieve: Float
      // rest: Float
      //   console.log("entrepot onSubmitFunction: ", entrepot);
      const newData: any = [];
      //   const billProductsData = productBilState?.map((item: any) => {
      //     const data = item?.selectedMeasure?.map((measure: any) => {
      //       const product = {
  
      //         productId: item?._id,
      //         measureId: measure.measureId?._id,
      //         count: measure?.amount || 1,
      //         pricePerMeasure: measure?.buyPrice,
      //         consumptionPrice: measure?.consumption,
      //       }
      //       newData.push(product)
      //        return product
      //     });
      //     return {...data}
      //   })
      try {
        const variables = {
          buyBillObject: {
            // customerId: customer?._id,
            billDate: new Date(),
            // entrepotId: entrepot?._id,
            billCurrencyId: data?.currencyId,
            billProducts: newData,
            // totalPriceOfBill: billPrice?.price,
            // consumptionPrice: billPrice?.consumption,
            // productsCount:productBilState?.length
          },
        };
  
        console.log("variables", variables);
        // const {data : { addBuyBill }} = await client.mutate({
        //   mutation:ADD_BUY_BILL,
        //   variables
        // })
        // console.log("addBuyBill" , addBuyBill)
      } catch (error: any) {
        console.log("error", error);
      }
    };
    return (
      <InvoiceContextProvider>
        <Box>
          <Typography variant="h3">فاکتور های خرید</Typography>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            mt={2}
            mb={2}
          >
            <CreateSalesInvoice t={t}/>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              columnGap={"2rem"}
            >
              <Box display="flex" columnGap={"1rem"} alignItems={"center"} pb={1}>
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["SingleInputDateRangeField"]}>
                    <DateRangePicker
                      slots={{ field: SingleInputDateRangeField }}
                      name="allowedRange"
                      slotProps={{
                        textField: {
                          size: "small",
                          fullWidth: true,
                          InputProps: {
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                sx={{ paddingInlineEnd: "1rem" }}
                              >
                                <Calendar
                                  color={theme.palette.grey[400]}
                                  size={20}
                                />
                              </InputAdornment>
                            ),
                          },
                          sx: {
                            bgcolor: "#FFF",
                          },
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider> */}
                {/* <SingleInputDateRangePicker /> */}
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                <CustomSearch t={t}/>
              </Box>
            </Box>
          </Box>
          <Box>
            <RowFactor />
            <RowFactor />
            <RowFactor />
            <RowFactor />
            <RowFactor />
            <RowFactor />
            <RowFactor />
            <RowFactor />
          </Box>
          <Box display="flex" justifyContent={"end"} mt={2}>
            <Stack spacing={2} p={1}>
              <Pagination
                count={Math.ceil(100 / 10)}
                size={"medium"}
                shape="rounded"
                variant="outlined"
                color="primary"
                sx={{
                  fontSize: "2rem !important",
                }}
              />
            </Stack>
          </Box>
        </Box>
      </InvoiceContextProvider>
    );
  };
  
  export default PurchaseInvoicePage;
  