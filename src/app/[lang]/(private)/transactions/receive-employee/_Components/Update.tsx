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
import { useUpdateReceiveMutation } from "@/hooks/api/transactions/mutations/use-update-receive-mutation";
import { AppContext } from "@/provider/appContext";
import EmployeeAutoCompleteComponent from "@/components/Auto/EmployeeAutoComplete";

type UpdateFormProps = {
  t: any;
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
  receiverType?:string
  description?:string
}
const UpdateForm = ({ t, item }: UpdateFormProps) => {
 const defaultValues = useMemo(()=> {
    return{
      amount: item?.amount || 0,
      currencyId: item?.currencyId?._id || "",
      calculatedTo: item?.calculatedTo?._id || "",
      amountCalculated: item?.amountCalculated || 0,
      receiver: item?.receiver?._id || "",
      invoiceType: item?.invoiceType || "",
      payerId: item?.customerId?._id || "", // Add this line
      receiverType:item?.receiverType || "",
      description:item?.description

    }
 },[item])

  const methods = useForm<FormValues>({
    defaultValues,
     resolver: yupResolver(useSchemaCrateForm(t)) as Resolver<FormValues, any> ,
  });
  const theme = useTheme();
  const {setHandleError} = useContext(AppContext)
  const [openDialog, setOpenDialog] = useState(false);
  const { handleSubmit, register  , formState:{errors}} = methods;
  const [receiverType, setReceiverType] = useState(item?.receiverType);

  const {mutate , isLoading } = useUpdateReceiveMutation()

  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setReceiverType(value);
  };
  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
  };

  const onSubmitFunction = (data:FormValues) => {
    mutate({
      receiveId:item?._id,
      receiveObject:{
        ...data,
        receiverType
      }
    },{
      onSuccess:()=>{
        handleOpenDialogFunction()
        setHandleError({
          open:true,
          message:"Update successfully",
          type:"success"
        })
      }
    })
  };

  console.log("errors" , errors)
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
                {t?.transactions?.update_cash_receipt_from_employees}
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
                    {t?.transactions?.full_name_of_employee}
                  </InputLabel>
                  <EmployeeAutoCompleteComponent  name="payerId"dir={t?.home?.dir} />
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
                  <UserCurrenciesComponent dir={t?.home?.dir}/>
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
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t?.transactions?.recipient}
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
                  {receiverType === "Bank" && (
                    <BankAutoComplete name="receiver"  dir={t?.home?.dir}/>
                  )}
                  {receiverType === "Safe" && (
                    <CashBoxAutoComplete name="receiver" dir={t?.home?.dir}/>
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
                type="submit"
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
    </Box>
  );
};

export default UpdateForm;
