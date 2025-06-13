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
  Select,
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
import { useAddNewReceiveMutation } from "@/hooks/api/transactions/mutations/use-add-new-receive-mutation";
import { AppContext } from "@/provider/appContext";
import EmployeeAutoCompleteComponent from "@/components/Auto/EmployeeAutoComplete";
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

  const { mutate, error, isLoading } = useAddNewReceiveMutation();

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
        receiveObject: {
          ...data,
          amount: parseFloat(data?.amount),
          amountCalculated: parseFloat(data?.amountCalculated),
          invoiceType: "Cash",
          receiverType: accountType,
          payerType: "Employee",
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
              <Typography>{t("cash_receipt_from_employees")}</Typography>
              <IconButton size="medium" onClick={handleOpenDialogFunction}>
                <CloseSquare />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                  <InputLabel
                    sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                    required
                    error={!!errors?.payerId}
                  >
                    {t("full_name_of_employee")}
                  </InputLabel>
                  <EmployeeAutoCompleteComponent
                    dir={t("dir")}
                    name="payerId"
                  />
                  {errors?.payerId?.type === "optionality" && (
                    <Typography color="error" p={1}>
                      {errors?.payerId?.message}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel
                    sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                    required
                    error={!!errors?.amount}
                  >
                    {t("received_amount")}
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
                  <UserCurrenciesComponent dir={t("dir")} />
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
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t("recipient")}
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
                    <BankAutoComplete name="receiver" dir={t("dir")} />
                  )}
                  {accountType === "Safe" && (
                    <CashBoxAutoComplete name="receiver" dir={t("dir")} />
                  )}
                  {!!errors?.receiver && (
                    <Typography color="error" p={1}>
                      {t("receiver_is_required")}
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
        {t("cash_payment_to_employees")}
      </Button>
    </Box>
  );
};
export default CreateComponent;
