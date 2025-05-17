import CashBoxAutoComplete from "@/components/Auto/cashBoxAutoComplete";
import CurrenciesAutoComplete from "@/components/Auto/currencyAutoComplete";
import EmployeeAutoCompleteComponent from "@/components/Auto/EmployeeAutoComplete";
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
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const CreateCreate = ({t}:{t:any}) => {
  const theme = useTheme();
  const methods = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
  };
  const onSubmitFunction = (data: any) => {};
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
                <Typography>  {t?.transactions?.add_new_salary}</Typography>
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
                      <EmployeeAutoCompleteComponent placeholder="" />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel
                        sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                        required
                      >
                        {t?.transactions?.monthly_for}
                      </InputLabel>
                      <Select
                        fullWidth
                        size="small"
                        {...register("accountNumber", { required: true })}
                        name="accountNumber"
                      />
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
                      <CurrenciesAutoComplete />
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                        {t?.transactions?.payer}
                      </InputLabel>
                     <CashBoxAutoComplete name="payer"/>
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
                        {...register("bankPhoneNumber", { required: true })}
                        name="bankPhoneNumber"
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
