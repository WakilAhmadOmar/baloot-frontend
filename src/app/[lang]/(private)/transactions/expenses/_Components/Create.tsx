import CurrenciesAutoComplete from "@/components/Auto/currencyAutoComplete";
import { useAddNewConsumptionMutation } from "@/hooks/api/transactions/mutations/use-add-new-consumption";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputLabel,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { CloseSquare } from "iconsax-react";
import { useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSchemaCrateForm } from "./Create-form.schema";
import CashBoxAutoComplete from "@/components/Auto/cashBoxAutoComplete";

import ConsumptionTypeSelectBox from "@/components/Select/consumption-type";
import { AppContext } from "@/provider/appContext";

type CreateFormProps = {
  t: any;
};

export const CreateCreate = ({ t }: CreateFormProps) => {
  const theme = useTheme();
  const { setHandleError } = useContext(AppContext);
  const methods = useForm({
    resolver: yupResolver(useSchemaCrateForm(t)),
    // defaultValues,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const [openDialog, setOpenDialog] = useState(false);
  const { mutate: addNewConsumptionMutation, isLoading } =
    useAddNewConsumptionMutation();

  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
  };
  const onSubmitFunction = (data: any) => {
    addNewConsumptionMutation(
      {
        consumptionObject: {
          ...data,
          amount: Number(data?.amount),
        },
      },
      {
        onSuccess: () => {
          handleOpenDialogFunction();
          setHandleError({
            open: true,
            type: "success",
            message: "Consumption successfully created.",
          });
        },
        onError: (error: any) => {
          setHandleError({
            open: true,
            type: "error",
            message: error?.message,
          });
        },
      }
    );
  };
  console.log("error", errors);
  return (
    <FormProvider {...methods}>
      <Button variant="contained" onClick={handleOpenDialogFunction}>
        {t?.transactions?.add_new_expense}
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
          <Typography>{t?.transactions?.add_new_expense}</Typography>
          <IconButton size="medium" onClick={handleOpenDialogFunction}>
            <CloseSquare />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel
                  sx={{ marginTop: "3rem", paddingBottom: "5px" }}
                  required
                >
                  {t?.transactions?.payer}
                </InputLabel>
                <CashBoxAutoComplete name="payer" />
              </Grid>
              <Grid item xs={12}>
                <InputLabel
                  sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                  required
                >
                  {t?.transactions?.consumption_type}
                </InputLabel>
                <ConsumptionTypeSelectBox name={"consumptionTypeId"} />
              </Grid>
              <Grid item xs={6}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t?.transactions?.payed_amount}
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  {...register("amount", { required: true })}
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
            {t?.transactions?.save}
          </Button>
          <Button variant="outlined" onClick={handleOpenDialogFunction}>
            {t?.transactions?.cancel}
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};
