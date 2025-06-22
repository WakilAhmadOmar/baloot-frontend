import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { CloseSquare } from "iconsax-react";
import { ChangeEvent, useContext, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import UserCurrenciesComponent from "@/components/Auto/currencyAutoComplete";
import { useSchemaCrateForm } from "./create-form.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomerAutoComplete from "@/components/Auto/customerAutoComplete";
import BankAutoComplete from "@/components/Auto/bankAutoComplete";
import CashBoxAutoComplete from "@/components/Auto/cashBoxAutoComplete";
import { AppContext } from "@/provider/appContext";
import { useAddPayToCustomerMutation } from "@/hooks/api/transactions/mutations/use-add-pay_to_customer-mutation";
import { useTranslations } from "next-intl";

const CreateComponent = () => {
  const t = useTranslations("transactions");
  const theme = useTheme();
  const { setHandleError } = useContext(AppContext);
  const methods = useForm({
    resolver: yupResolver(useSchemaCrateForm(t)),
    // defaultValues,
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = methods;
  const [openDialog, setOpenDialog] = useState(false);
  const [accountType, setAccountType] = useState("Bank");

  const { mutate, error, isLoading } = useAddPayToCustomerMutation();

  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
  };

  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setAccountType(value);
  };
  const onSubmitFunction = (data: any) => {
    mutate(
      {
        payOffObject: {
          ...data,
          amount: parseFloat(data?.amount),
          amountCalculated: parseFloat(data?.amountCalculated),
          invoiceType: "Cash",
          payerType: accountType,
          receiverType: "Customer",
        },
      },
      {
        onSuccess: () => {
          setOpenDialog(false);
          setHandleError({
            open: true,
            message: "This record added successfully",
            type: "success",
          });

          // router.back()
        },
        onError: (error: any) => {
          setHandleError({
            open: true,
            message: error?.message,
            type: "error",
          });
        },
      }
    );
  };
  return (
    <Box>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitFunction)}>
          <Dialog
            open={openDialog}
            onClose={handleOpenDialogFunction}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            dir={t("dir")}
            fullWidth
          >
            <DialogTitle
              id="alert-dialog-title"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: `1px solid ${theme.palette.grey[200]}`,
              }}
            >
              <Typography>{t("cash_payment_to_customer")}</Typography>
              <IconButton size="medium" onClick={handleOpenDialogFunction}>
                <CloseSquare />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                  <InputLabel
                    sx={{ paddingBottom: "5px" }}
                    required
                    error={!!errors?.receiver}
                  >
                    {t("recipient")}({t("customer")})
                  </InputLabel>
                  <CustomerAutoComplete name="receiver" dir={t("dir")} />
                  {!!errors?.receiver && (
                    <Typography color="error" p={1}>
                      {t("receiver_is_required")}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={6}>
                  <InputLabel
                    sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                    required
                    error={!!errors?.amount}
                  >
                    {t("payed_amount")}
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    {...register("amount", { required: true })}
                    error={!!errors?.amount}
                  />
                  {!!errors?.amount && (
                    <Typography color="error" p={1}>
                      {errors?.amount?.message}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel
                    sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                    required
                    error={!!errors?.currencyId}
                  >
                    {t("currency")}
                  </InputLabel>
                  <UserCurrenciesComponent name="currencyId" dir={t("dir")} />
                  {!!errors?.currencyId && (
                    <Typography color="error" p={1}>
                      {t("currency_is_required")}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t("calculated_currency")}
                  </InputLabel>
                  <UserCurrenciesComponent
                    name="calculatedTo"
                    dir={t("dir")}
                    required={false}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t("calculated_amount")}
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    {...register("amountCalculated", { required: false })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel sx={{ marginTop: "1rem" }}>
                    {t("payer")}
                  </InputLabel>
                </Grid>
                <Grid item xs={4}>
                  <RadioGroup
                    onChange={onChangeHandler}
                    row
                    value={accountType}
                  >
                    <FormControlLabel
                      value="Bank"
                      control={<Radio />}
                      label={t("bank")}
                    />
                    <FormControlLabel
                      value="Safe"
                      control={<Radio />}
                      label={t("cashbox")}
                    />
                  </RadioGroup>
                </Grid>
                <Grid item xs={8}>
                  {accountType === "Bank" && (
                    <BankAutoComplete name="payerId" dir={t("dir")} />
                  )}
                  {accountType === "Safe" && (
                    <CashBoxAutoComplete name="payerId" dir={t("dir")} />
                  )}
                  {errors?.payerId?.type === "optionality" && (
                    <Typography color="error" p={1}>
                      {errors?.payerId?.message}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t("description")}
                  </InputLabel>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    size="small"
                    {...register("description", { required: false })}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions
              sx={{
                display: "flex",
                justifyContent: "start",
                columnGap: "1rem",
              }}
            >
              <Button
                color="primary"
                variant="contained"
                // type="submit"
                onClick={handleSubmit(onSubmitFunction)}
                loading={isLoading}
              >
                {t("save")}
              </Button>
              <Button variant="outlined" onClick={handleOpenDialogFunction}>
                {t("cancel")}
              </Button>
            </DialogActions>
          </Dialog>
        </form>
      </FormProvider>
      <Button variant="contained" onClick={handleOpenDialogFunction}>
        {t("cash_payment_to_customer")}
      </Button>
    </Box>
  );
};
export default CreateComponent;
