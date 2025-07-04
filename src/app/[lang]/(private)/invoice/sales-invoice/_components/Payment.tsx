import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  IconButton,
  InputLabel,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Add, CloseSquare } from "iconsax-react";
import React, { useContext, useEffect } from "react";

//   import CashBoxAutoCopalete from "../muiComponent/cashBoxAutoCompalete";

//   import CircularProgressComponent from "../muiComponent/CircularProgressComponent";
//   import SnackbarComponent from "../muiComponent/snackbarComponent";

import { AppContext } from "@/provider/appContext";
import CurrenciesAutoComplete from "@/components/Auto/currencyAutoComplete";
import CashBoxAutoComplete from "@/components/Auto/cashBoxAutoComplete";
import { InvoiceContext } from "../../_components/invoiceContext";
import CustomerAutoComplete from "@/components/Auto/customerAutoComplete";
import { useFormContext } from "react-hook-form";
import { useAddReceiveCustomerMutation } from "@/hooks/api/transactions/mutations/use-add-receive-customer-mutation";
import { useTranslations } from "next-intl";
import { AmountCalculated } from "@/components/util/AmountCalculated";
import { useGetUserCurrenciesQuery } from "@/hooks/api/currencies/queries/use-get-user-currencies";

interface IPropsPayment {
  customer: string;
  amount: number;
  customerId: string;
  paymentStatus: "cash" | "loan";
}
const PaymentReceiver: React.FC<IPropsPayment> = ({
  amount,
  paymentStatus,
}) => {
  const theme = useTheme();
  const { setPaymentOff, paymentOff } =
    useContext(InvoiceContext);
  const t = useTranslations("invoice");
  const { setHandleError } = useContext(AppContext);
  const { register, handleSubmit, watch, setValue } = useFormContext();
  const [open, setOpen] = React.useState(false);

  const { mutate: addReceiveCustomer, isLoading } =
    useAddReceiveCustomerMutation({
      onSuccess: (data) => {
        setPaymentOff(data);
      },
    });

  const handleClickOpen = () => {
    setOpen(!open);
  };
  const handlePayFunction = async (data: any) => {
    const variables = {
      receiveObject: {
        amount: parseFloat(`${data?.amount}`),
        payerId: data?.customerId,
        receiver: data?.receiver,
        currencyId: data?.currencyId,
        invoiceType: "ReceiveBill",
        receiverType: "Safe",
      },
    };
    addReceiveCustomer(variables, {
      onSuccess: () => {
        setOpen(false);
        setHandleError({
          message: t("payment_was_successfully"),
          open: true,
          status: "success",
        });
      },
      onError: (error: any) => {
        setHandleError({
          message: error.message,
          status: "error",
          open: true,
        });
      },
    });
  };

  const currencyId = watch("currencyId");

  useEffect(() => {
    if (currencyId) {
      setValue("calculatedTo", currencyId);
    }
  }, [currencyId]);

  return (
    <Box mt={2}>
      <Dialog
        open={open}
        onClose={handleClickOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        dir={t("dir")}
        fullWidth
      >
        <DialogTitle
          sx={{
            px: 2,
            py: 1,
            color: theme.palette.primary.contrastText,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${theme.palette.grey[200]}`,
          }}
        >
          <Typography>{t("payment")}</Typography>
          <IconButton size="medium" onClick={handleClickOpen}>
            <CloseSquare size={20} color="gray" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid2 container spacing={3} mt={2}>
            <Grid2 size={6}>
              <InputLabel required>
                {t("customer_name")} ({t("payer")} )
              </InputLabel>
              <CustomerAutoComplete
                name={"customerId"}
                dir={t("dir")}
                disabled
              />
              {/* <TextField
                fullWidth
                size="small"
                disabled
                value={customer?.fullName}
              /> */}
            </Grid2>
            <Grid2 size={6}>
              <InputLabel required>
                {" "}
                {t("safe")} ( {t("receiver")} ){" "}
              </InputLabel>
              <CashBoxAutoComplete name={"receiver"} />
            </Grid2>
          </Grid2>
          <Grid2 container spacing={3} mt={3}>
            <Grid2 size={6}>
              <InputLabel required>{t("receipt_amount")}</InputLabel>
              <TextField
                fullWidth
                size="small"
                defaultValue={amount}
                type="number"
                {...register("amount", { required: true })}
                name={"amount"}
              />
            </Grid2>
            <Grid2 size={6}>
              <InputLabel required> {t("Currency")}</InputLabel>
              <CurrenciesAutoComplete
                name="currencyId"
                disabled={false}
                isBaseCurrency
                dir={t("dir")}
              />
            </Grid2>
          </Grid2>
          <Grid2 container spacing={3} mt={3}>
            <Grid2 size={6}>
              <InputLabel required> {t("calculated_currency")}</InputLabel>
              <CurrenciesAutoComplete
                name="calculatedTo"
                disabled={true}
                required={false}
                dir={t("dir")}
              />
            </Grid2>
            <Grid2 size={6}>
              <AmountCalculated />
              {/* <InputLabel required>{t("amount_calculated")}</InputLabel>
              <TextField
                fullWidth
                size="small"
                
                {...register("amountCalculated", { required: false })}
                name={"amountCalculated"}
                disabled
              /> */}
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
              loading={isLoading}
            >
              {t("save")}
            </Button>
            <Button onClick={handleClickOpen} variant="outlined">
              {t("cancel")}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      <Button
        startIcon={<Add style={{ margin: "0 0 0 1rem" }} />}
        variant="outlined"
        onClick={handleClickOpen}
        disabled={paymentStatus === "loan" || paymentOff?._id ? true : false}
      >
        {t("payment")}
      </Button>
    </Box>
  );
};

export default PaymentReceiver;
