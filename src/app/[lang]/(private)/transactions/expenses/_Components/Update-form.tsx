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
import { CloseSquare, Edit } from "iconsax-react";
import { useContext, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSchemaCrateForm } from "./Create-form.schema";
import CashBoxAutoComplete from "@/components/Auto/cashBoxAutoComplete";

import ConsumptionTypeSelectBox from "@/components/Select/consumption-type";
import { AppContext } from "@/provider/appContext";
import { useUpdateConsumptionMutation } from "@/hooks/api/transactions/mutations/use-update-consumption-mutation";
import { useTranslations } from "next-intl";

type CreateFormProps = {
  item: any;
};

interface FormValues {
  amount: number;
  currencyId: string;
  payer: string;
  description?: string;
  consumptionTypeId: string;
}
export const UpdateForm = ({ item }: CreateFormProps) => {
  const t = useTranslations("transactions");
  const theme = useTheme();
  const { setHandleError } = useContext(AppContext);
  const defaultValues = useMemo(() => {
    return {
      amount: item?.amount || 0,
      currencyId: item?.currencyId?._id || "",
      payer: item?.payer?._id || "", // Add this line
      description: item?.description,
      consumptionTypeId: item?.consumptionTypeId?._id,
    };
  }, [item]);
  const methods = useForm<FormValues>({
    resolver: yupResolver(useSchemaCrateForm(t)),
    defaultValues,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const [openDialog, setOpenDialog] = useState(false);
  const { mutate: addUpdateConsumptionMutation, isLoading } =
    useUpdateConsumptionMutation();

  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
  };
  const onSubmitFunction = (data: any) => {
    addUpdateConsumptionMutation(
      {
        consumptionId: item?._id,
        consumptionObject: {
          currencyId: data?.currencyId,
          consumptionTypeId: data?.consumptionTypeId,
          payer: data?.payer,
          amount: Number(data?.amount),
          description: data?.description,
        },
      },
      {
        onSuccess: () => {
          handleOpenDialogFunction();
          setHandleError({
            open: true,
            status: "success",
            message: t("this_expense_successfully_updated"),
          });
        },
        onError: (error: any) => {
          setHandleError({
            open: true,
            status: "error",
            message: error.message,
          });
        },
      }
    );
  };

  return (
    <FormProvider {...methods}>
      <IconButton onClick={handleOpenDialogFunction}>
        <Edit size={20} color={theme.palette.primary.contrastText} />
      </IconButton>
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
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${theme.palette.grey[200]}`,
          }}
        >
          <Typography>{t("update_expense")}</Typography>
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
                <ConsumptionTypeSelectBox name={"consumptionTypeId"} />
              </Grid>
              <Grid item xs={12}>
                <InputLabel
                  sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                  required
                >
                  {t("payer")}
                </InputLabel>
                <CashBoxAutoComplete name="payer" />
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
                <CurrenciesAutoComplete />
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
