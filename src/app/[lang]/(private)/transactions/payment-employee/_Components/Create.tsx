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
import { useAddPayOffMutation } from "@/hooks/api/transactions/mutations/use-add-pay-of-mutation";
import EmployeeAutoCompleteComponent from "@/components/Auto/EmployeeAutoComplete";

interface IPropsCreate {
  t: any;
}
const CreateComponent: React.FC<IPropsCreate> = ({ t }) => {
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

  const { mutate, error, isLoading } = useAddPayOffMutation();

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
          receiverType: "Employee",
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
        onError:(error:any)=>{
          setHandleError({
            open: true,
            message: error?.message,
            type: "error",
          });
        }
      }
    );
  };
  console.log("errors", errors);
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
                {t?.transactions?.cash_payment_to_employees}
              </Typography>
              <IconButton size="medium" onClick={handleOpenDialogFunction}>
                <CloseSquare />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                  <InputLabel
                    sx={{  paddingBottom: "5px" }}
                    required
                  >
                    {t?.transactions?.full_name_of_employee}
                  </InputLabel>
                  <EmployeeAutoCompleteComponent name="receiver" dir={t?.home?.dir}/>
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
                  <UserCurrenciesComponent name="currencyId" dir={t?.home?.dir}/>
                </Grid>
                <Grid item xs={6}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t?.transactions?.calculated_currency}
                  </InputLabel>
                  <UserCurrenciesComponent name="calculatedTo" dir={t?.home?.dir}/>
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
                  <InputLabel sx={{ marginTop: "1rem" }}>
                    {t?.transactions?.payer}
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
                      label={t?.transactions?.bank}
                    />
                    <FormControlLabel
                      value="Safe"
                      control={<Radio />}
                      label={t?.transactions?.cashbox}
                    />
                  </RadioGroup>
                </Grid>
                <Grid item xs={8}>
                  {accountType === "Bank" && (
                    <BankAutoComplete name="payerId"  dir={t?.home?.dir}/>
                  )}
                  {accountType === "Safe" && (
                    <CashBoxAutoComplete name="payerId" dir={t?.home?.dir} />
                  )}
                </Grid>
                <Grid item xs={12}>
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
        {t.transactions?.cash_payment_to_employees}
      </Button>
    </Box>
  );
};
export default CreateComponent;
