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
import { ChangeEvent, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import UserCurrenciesComponent from "@/components/Auto/currencyAutoComplete";
import { useSchemaCrateForm } from "./create-form.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomerAutoComplete from "@/components/Auto/customerAutoComplete";
import BankAutoComplete from "@/components/Auto/bankAutoComplete";
import CashBoxAutoComplete from "@/components/Auto/cashBoxAutoComplete";
import { useAddNewReceiveMutation } from "@/hooks/api/transactions/mutations/use-add-new-receive-mutation";

interface IPropsCreate {
  t: any;
}
const CreateComponent: React.FC<IPropsCreate> = ({ t }) => {
  const theme = useTheme();

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
  const [accountType, setAccountType] = useState("banks");

  const {mutate, error , isLoading} = useAddNewReceiveMutation()

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

    mutate({
      receiveObject:{
        ...data,
        amount:parseFloat(data?.amount),
        amountCalculated:parseFloat(data?.amountCalculated),
        invoiceType:"Cash"
      }
    }, {
      onSuccess: () => {
        setOpenDialog(false)
        // enqueueSnackbar("Event created successfully!", {
        //   variant: "success",
        // })

        // router.back()
      },
    })
  };
  console.log("errors" , errors)
  return (
    <Box>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitFunction)}>
          <Dialog
            open={openDialog}
            onClose={handleOpenDialogFunction}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            dir={t?.home?.dir}
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
              <Typography>
                {t?.transactions?.cash_receipt_from_customer}
              </Typography>
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
                  >
                    {t?.transactions?.full_name_of_customer}
                  </InputLabel>
                  {/* <Select
                  fullWidth
                  size="small"
                  {...register("customerId", { required: true })}
                  name="name"
                /> */}
                  <CustomerAutoComplete />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel
                    sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                    required
                  >
                    {t?.transactions?.received_amount}
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    {...register("amount", { required: true })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel
                    sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                    required
                  >
                    {t?.transactions?.currency}
                  </InputLabel>
                  <UserCurrenciesComponent />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t?.transactions?.calculated_currency}
                  </InputLabel>
                  <UserCurrenciesComponent name="calculatedTo" />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t?.transactions?.calculated_amount}
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    {...register("amountCalculated", { required: true })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t?.transactions?.recipient}
                  </InputLabel>
                </Grid>
                <Grid item xs={4}>
                  <RadioGroup
                    onChange={onChangeHandler}
                    row
                    value={accountType}
                  >
                    <FormControlLabel
                      value="banks"
                      control={<Radio />}
                      label={t?.transactions?.banks}
                    />
                    <FormControlLabel
                      value="cashboxes"
                      control={<Radio />}
                      label={t?.transactions?.cashboxes}
                    />
                  </RadioGroup>
                </Grid>
                <Grid item xs={8}>
                  {accountType === "banks" && <BankAutoComplete name="receiver"/>}
                  {/* <Select
                  fullWidth
                  size="small"
                  {...register("bankPhoneNumber", { required: true })}
                  name="bankPhoneNumber"
                /> */}
                  {accountType === "cashboxes" && <CashBoxAutoComplete name="receiver" />}
                </Grid>
                {/* <Grid item xs={12}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t?.transactions?.description}
                </InputLabel>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  size="small"
                  {...register("description", { required: true })}
                />
              </Grid> */}
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
                {t?.transactions?.save}
              </Button>
              <Button variant="outlined" onClick={handleOpenDialogFunction}>
                {t?.transactions?.cancel}
              </Button>
            </DialogActions>
          </Dialog>
        </form>
      </FormProvider>
      <Button variant="contained" onClick={handleOpenDialogFunction}>
        {t.transactions?.customer_cash_receipt}
      </Button>
    </Box>
  );
};
export default CreateComponent;
