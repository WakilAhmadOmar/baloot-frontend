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
import { useForm } from "react-hook-form";
import UserCurrenciesComponent from "@/components/Auto/currencyAutoComplete";

interface IPropsCreate {
  t: any;
}
const CreateComponent: React.FC<IPropsCreate> = ({ t }) => {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    setValue,
    getFieldState,
  } = useForm();
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
  };
  const onSubmitFunction = (data: any) => {};
  return (
    <Box>
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
          <Typography>{t?.transactions?.cash_receipt_from_customer}</Typography>
          <IconButton size="medium" onClick={handleOpenDialogFunction}>
            <CloseSquare />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel
                  sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                  required
                >
                  {t?.transactions?.full_name_of_customer}
                </InputLabel>
                <Select
                  fullWidth
                  size="small"
                  {...register("name", { required: true })}
                  name="name"
                />
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
                  {...register("accountNumber", { required: true })}
                  name="accountNumber"
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel
                  sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                  required
                >
                  {t?.transactions?.currency}
                </InputLabel>
                <UserCurrenciesComponent register={register} />
              </Grid>
              <Grid item xs={6}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t?.transactions?.calculated_currency}
                </InputLabel>
                <UserCurrenciesComponent register={register} />
              </Grid>
              <Grid item xs={6}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t?.transactions?.calculated_amount}
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  {...register("bankPhoneNumber", { required: true })}
                  name="bankPhoneNumber"
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t?.transactions?.recipient}
                </InputLabel>
                <Select
                  fullWidth
                  size="small"
                  {...register("bankPhoneNumber", { required: true })}
                  name="bankPhoneNumber"
                />
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
            {t?.transactions?.save}
          </Button>
          <Button variant="outlined" onClick={handleOpenDialogFunction}>
            {t?.transactions?.cancel}
          </Button>
        </DialogActions>
      </Dialog>
      <Button variant="contained" onClick={handleOpenDialogFunction}>
        {t.transactions?.customer_cash_receipt}
      </Button>
    </Box>
  );
};
export default CreateComponent;
