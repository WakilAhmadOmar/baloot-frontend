import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Grid2,
  IconButton,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Add, CloseSquare } from "iconsax-react";
import React, { useContext, useState } from "react";

//   import CashBoxAutoCopalete from "../muiComponent/cashBoxAutoCompalete";

import { useApolloClient } from "@apollo/client";
//   import CircularProgressComponent from "../muiComponent/CircularProgressComponent";
//   import SnackbarComponent from "../muiComponent/snackbarComponent";
import { ADD_PAY_OFF } from "@/graphql/mutation/ADD_PAY_OF";

import { AppContext } from "@/provider/appContext";
import CurrenciesAutoComplete from "@/components/Auto/currencyAutoComplete";
import CashBoxAutoComplete from "@/components/Auto/cashBoxAutoComplete";
import { InvoiceContext } from "../../_components/invoiceContext";
import { ADD_NEW_RECEIVE } from "@/graphql/mutation/ADD_RECEIVE_FROM_CUSTOMER";
import CustomerAutoComplete from "@/components/Auto/customerAutoComplete";
import { useFormContext } from "react-hook-form";

interface IPropsPayment {
  customer: string;
  amount: number;
  customerId: string;
  paymentStatus: "cash" | "loan";
  t: any;
}
const PaymentReceiver: React.FC<IPropsPayment> = ({
  amount,
  customerId,
  paymentStatus,
  t,

}) => {
  const { setPaymentOff, customer, currency, setCurrency, paymentOff  } =
    useContext(InvoiceContext);
  const { setHandleError } = useContext(AppContext);
  const { register , handleSubmit  } = useFormContext()
  const client = useApolloClient();
  const [open, setOpen] = React.useState(false);
  const [cashboxSelected, setCashboxSelected] = useState<any>(null);
  const [loadingPage, setLoadingPage] = useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };
  const handleGetCustomerFunction = () => {};

  const getCashBoxFunction = (item: any) => {
    setCashboxSelected(item);
  };
  const handlePayFunction = async (data:any) => {
    setLoadingPage(true);
    try {
      const variables = {
        receiveObject: {
          customerId: data?.customerId,
          amount: parseFloat(`${data?.amount}`),
          currencyId: data?.currencyId,
          receiver: data?.cashboxId,
          invoiceType: "ReceiveBill",
          receiverType:"Safe"
        },
      };
      const {
        data: { addNewReceive },
      } = await client.mutate({
        mutation: ADD_NEW_RECEIVE,
        variables,
      });

      if (addNewReceive?._id) {
        setPaymentOff(addNewReceive);
        setOpen(false);
        setLoadingPage(false);
        setHandleError({
          message: t?.invoice?.payment_was_successfully,
          open: true,
          status: "success",
        });
      }
    } catch (error: any) {
      setLoadingPage(false);
      setHandleError({
        message: error.message,
        status: "error",
        open: true,
      });
    }
  };
  const handleSelectCurrency = (data: any) => {
    console.log("seleted currency", data);
    setCurrency(data);
  };
  // const handleCloseError = () => {
  //   setHandleError((prevState) => ({
  //     ...prevState,
  //     open: false,
  //   }));
  // };

  return (
    <Box mt={2}>
      {/* {loadingPage && <CircularProgressComponent />} */}
      {/* <SnackbarComponent
          status={handleError?.status}
          open={handleError?.open}
          message={handleError?.message}
          handleClose={handleCloseError}
        /> */}
      <Dialog
        open={open}
        onClose={handleClickOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        dir={t?.home?.dir}
        fullWidth
      >
        <DialogTitle sx={{ display: "flex" }} justifyContent="space-between">
          <Typography variant="caption">{t?.invoice?.payment}</Typography>
          <IconButton onClick={handleClickOpen}>
            <CloseSquare size={30} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid2 container spacing={3}>
            <Grid2 size={6}>
              <InputLabel required>{t?.invoice?.Company_Name}</InputLabel>
              <CustomerAutoComplete name={"customerId"} />
              {/* <TextField
                fullWidth
                size="small"
                disabled
                value={customer?.fullName}
              /> */}
            </Grid2>
            <Grid2 size={6}>
              <InputLabel required>{t?.invoice?.receipt_amount}</InputLabel>
              <TextField
                fullWidth
                size="small"
                disabled
                value={amount}
                {...register("amount", { required: true })}
                name={"amount"}
              />
            </Grid2>
          </Grid2>
          <Grid2 container spacing={3} mt={3}>
            <Grid2 size={6}>
              <InputLabel required>{t?.invoice?.receiver}</InputLabel>
              <CashBoxAutoComplete
                // getCashBox={getCashBoxFunction}
                placeholder=""
                name={"cashboxId"}
              />
            </Grid2>
            <Grid2 size={6}>
              <InputLabel required> {t?.invoice?.Currency}</InputLabel>
              <CurrenciesAutoComplete 
              name="currencyId"
              // onSelected={handleSelectCurrency}
               />
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions>
          <Box
            display="flex"
            columnGap={"1rem"}
            justifyContent="flex-start"
            width="100%"
          >
            <Button
              onClick={handleSubmit(handlePayFunction)}
              variant="contained"
              loading={loadingPage}
              
            >
              {t?.invoice?.save}
            </Button>
            <Button onClick={handleClickOpen} variant="outlined">
              {t?.invoice?.cancel}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      <Button
        startIcon={<Add style={{ margin: "0 0 0 1rem" }} />}
        variant="outlined"
        onClick={handleClickOpen}
        disabled={paymentStatus === "loan"  || paymentOff?._id ? true : false}
      >
        {t?.invoice?.payment}
      </Button>
    </Box>
  );
};

export default PaymentReceiver;
