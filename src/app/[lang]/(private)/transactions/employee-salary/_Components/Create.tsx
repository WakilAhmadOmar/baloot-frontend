import CashBoxAutoComplete from "@/components/Auto/cashBoxAutoComplete";
import CurrenciesAutoComplete from "@/components/Auto/currencyAutoComplete";
import EmployeeAutoCompleteComponent from "@/components/Auto/EmployeeAutoComplete";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputLabel,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { CloseSquare } from "iconsax-react";
import { useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSchemaCrateForm } from "./Create-form-schema";
import { useSubmitEmployeeSalaryMutation } from "@/hooks/api/transactions/mutations/use-submit-employee-salary-mutation";
import { AppContext } from "@/provider/appContext";

export const CreateCreate = ({ t }: { t: any }) => {
  const theme = useTheme();
  const methods = useForm({
    resolver: yupResolver(useSchemaCrateForm(t)),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const [openDialog, setOpenDialog] = useState(false);
  const {setHandleError } = useContext(AppContext)
  const {mutate:submitEmployeeSalaryMutation , isLoading } = useSubmitEmployeeSalaryMutation()

  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
  };
  const onSubmitFunction = (data: any) => {
    console.log("data", data);
    submitEmployeeSalaryMutation({
      employeeId: data?.employeeId,
      creditObject: {
        amount: parseFloat(data?.amount),
        currencyId: data?.currencyId,
        description: data?.description,
        safeId: data?.safeId,
      },
    },{
      onSuccess: () => {
        handleOpenDialogFunction();
        methods.reset();
        setHandleError({
          open: true,
          message: t?.transactions?.employee_salary_added_successfully,
          type: "success",
        })
      },
      onError: (error:any) => {
        setHandleError({
          open: true, 
          message: error?.message,
          type: "error",
        })
      },
    })

  };
  return (
    <FormProvider {...methods}>
      <Button variant="contained" onClick={handleOpenDialogFunction}>
        {t?.transactions?.add_new_salary}
      </Button>
      <Dialog
        open={openDialog}
        onClose={handleOpenDialogFunction}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        dir="rtl"
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
            {" "}
            {t?.transactions?.monthly_employee_salary_entry}
          </Typography>
          <IconButton size="medium" onClick={handleOpenDialogFunction}>
            <CloseSquare />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={6}>
                <InputLabel
                  sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                  required
                >
                  {t?.transactions?.full_name_of_employee}
                </InputLabel>
                <EmployeeAutoCompleteComponent dir={t?.home?.dir} name={"employeeId"}/>
              </Grid>
              <Grid item xs={6}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t?.transactions?.payer}
                </InputLabel>
                <CashBoxAutoComplete name="safeId" dir={t?.home?.dir} />
              </Grid>
              <Grid item xs={6}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t?.transactions?.salary_amount}
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  {...register("amount", { required: true })}
                  name="amount"
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t?.transactions?.currency}
                </InputLabel>
                <CurrenciesAutoComplete dir={t?.home?.dir}/>
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
                  {...register("description")}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "start", columnGap: "1rem" }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit(onSubmitFunction)}
            loading={isLoading}
          >
            ذخیره
          </Button>
          <Button variant="outlined" onClick={handleOpenDialogFunction}>
            لغو
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};
