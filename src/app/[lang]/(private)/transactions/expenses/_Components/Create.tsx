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
import { useTranslations } from "next-intl";


export const CreateCreate = () => {
  const t = useTranslations("transactions")
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
            status: "success",
            message: t("this_expense_successfully_saved"),
          });
        },
        onError: (error: any) => {
          setHandleError({
            open: true,
            status: "error",
            message: error?.message,
          });
        },
      }
    );
  };
  
  return (
    <FormProvider {...methods}>
      <Button variant="contained" onClick={handleOpenDialogFunction}>
        {t("add_new_expense")}
      </Button>
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
          <Typography>{t("add_new_expense")}</Typography>
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
                  {t("consumption_type")}
                </InputLabel>
                <ConsumptionTypeSelectBox dir={t("dir")} name={"consumptionTypeId"} />
              </Grid>
              <Grid item xs={12}>
                <InputLabel
                  sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                  required
                >
                  {t("payer")}
                </InputLabel>
                <CashBoxAutoComplete name="payer" dir={t("dir")} />
              </Grid>
              <Grid item xs={6}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t("payed_amount")}
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  {...register("amount", { required: true })}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t("currency")}
                </InputLabel>
                <CurrenciesAutoComplete dir={t("dir")} />
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
                  {...register("description", { required: true })}
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
            {t("save")}
          </Button>
          <Button variant="outlined" onClick={handleOpenDialogFunction}>
            {t("cancel")}
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};
