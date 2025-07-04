import BankAutoComplete from "@/components/Auto/bankAutoComplete";
import CashBoxAutoComplete from "@/components/Auto/cashBoxAutoComplete";
import CustomerAutoComplete from "@/components/Auto/customerAutoComplete";
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
import { CloseSquare, Edit } from "iconsax-react";
import { ChangeEvent, useContext, useMemo, useState } from "react";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import UserCurrenciesComponent from "@/components/Auto/currencyAutoComplete";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSchemaCrateForm } from "./create-form.schema";
import { useUpdateReceiveFromCustomerMutation } from "@/hooks/api/transactions/mutations/use-update-receive-from-customer-mutation";
import { AppContext } from "@/provider/appContext";
import { useTranslations } from "next-intl";

type UpdateFormProps = {
  item: any;
};

interface FormValues {
  amount: number;
  currencyId: string;
  calculatedTo?: string;
  amountCalculated?: number;
  receiver: string;
  invoiceType: string;
  payerId: string;
  receiverType?: string;
  description?: string;
}
const UpdateForm = ({ item }: UpdateFormProps) => {
  const t = useTranslations("transactions");
  const defaultValues = useMemo(() => {
    return {
      amount: item?.amount || 0,
      currencyId: item?.currencyId?._id || "",
      calculatedTo: item?.calculatedTo?._id ,
      amountCalculated: item?.amountCalculated ,
      receiver: item?.receiver?._id || "",
      invoiceType: item?.invoiceType || "",
      payerId: item?.payerId?._id || "", // Add this line
      receiverType: item?.receiverType || "",
      description: item?.description,
    };
  }, [item]);

  const methods = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(useSchemaCrateForm(t)) as Resolver<FormValues, any>,
  });
  const theme = useTheme();
  const { setHandleError } = useContext(AppContext);
  const [openDialog, setOpenDialog] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;
  const [receiverType, setReceiverType] = useState(item?.receiverType);

  const { mutate, isLoading } = useUpdateReceiveFromCustomerMutation();

  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setReceiverType(value);
  };
  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
  };

  const onSubmitFunction = (data: FormValues) => {
    mutate(
      {
        receiveId: item?._id,
        receiveObject: {
          ...data,
          receiverType,
        },
      },
      {
        onSuccess: () => {
          handleOpenDialogFunction();
          setHandleError({
            open: true,
            message: t("this_receive_successfully_updated"),
            status: "success",
          });
        },
        onError: (error: any) => {
          setHandleError({
            open: true,
            message: error?.message,
            status: "error",
          });
        },
      }
    );
  };

  return (
    <Box>
      <IconButton onClick={handleOpenDialogFunction}>
        <Edit size={20} color={theme.palette.primary.contrastText} />
      </IconButton>
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
                px: 2,
                py: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: `1px solid ${theme.palette.grey[200]}`,
              }}
            >
              <Typography>{t("update_cash_receipt_from_customer")}</Typography>
              <IconButton size="medium" onClick={handleOpenDialogFunction}>
                <CloseSquare size={20} color="gray"/>
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
                    {t("full_name_of_customer")}({t("payer")})
                  </InputLabel>
                  <CustomerAutoComplete name="payerId" dir={t("dir")} />
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
                    value={receiverType}
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
                  {receiverType === "Bank" && (
                    <BankAutoComplete name="receiver" dir={t("dir")} />
                  )}
                  {receiverType === "Safe" && (
                    <CashBoxAutoComplete name="receiver" dir={t("dir")} />
                  )}
                  {!!errors?.receiver && (
                    <Typography color="error" p={1}>
                      {t("receiver_is_required")}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }} error={!!errors?.description}>
                    {t("description")}
                  </InputLabel>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    size="small"
                    {...register("description", { required: false })}
                    name="description"
                    error={!!errors?.description}
                  />
                  {errors?.description && (
                    <Typography variant="caption" color="error">
                      {errors?.description?.message}
                    </Typography>
                  )}
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
                type="submit"
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
    </Box>
  );
};

export default UpdateForm;
