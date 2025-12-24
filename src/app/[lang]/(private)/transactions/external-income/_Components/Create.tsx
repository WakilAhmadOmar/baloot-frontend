import CurrenciesAutoComplete from "@/components/Auto/currencyAutoComplete";
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
import { AppContext } from "@/provider/appContext";
import { ExternalIncomeTypeSelectBox } from "@/components/Select/external-income-type";
import { useAddNewExternalIncomeMutation } from "@/hooks/api/transactions/mutations/use-add-new-external-income-mutation";
import { useTranslations } from "next-intl";

type FormInputType = {
  receiver: string;
  externalIncomeTypeId: string;
  currencyId: string;
  amount: number;
  description?: string;
};
export const CreateCreate = () => {
  const t = useTranslations("transactions");
  const theme = useTheme();
  const { setHandleError } = useContext(AppContext);
  const methods = useForm<FormInputType>({
    resolver: yupResolver(useSchemaCrateForm(t)),
    // defaultValues,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const [openDialog, setOpenDialog] = useState(false);
  const { mutate: addNewExternalIncomeMutation, isLoading } =
    useAddNewExternalIncomeMutation();

  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
  };
  const onSubmitFunction = (data: any) => {
    addNewExternalIncomeMutation(
      {
        externalIncomeObject: {
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
            message: t("this_external_income_successfully_saved"),
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
        {t("add_external_income")}
      </Button>
      <Dialog
        open={openDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        dir="rtl"
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
          <Typography>{t("add_external_income")}</Typography>
          <IconButton size="medium" onClick={handleOpenDialogFunction}>
            <CloseSquare size={20} color="gray" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12}>
                <InputLabel
                  sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                  required
                >
                  {t("external_income_type")}
                </InputLabel>
                <ExternalIncomeTypeSelectBox
                  name={"externalIncomeTypeId"}
                  dir={t("dir")}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel
                  sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                  required
                >
                  {t("recipient")}
                </InputLabel>
                <CashBoxAutoComplete name="receiver" dir={t("dir")} />
              </Grid>
              <Grid item xs={6}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t("received_amount")}
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
                <InputLabel
                  sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                  error={!!errors?.description}
                >
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
