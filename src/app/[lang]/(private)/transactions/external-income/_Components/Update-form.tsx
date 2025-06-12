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
import { AppContext } from "@/provider/appContext";
import { ExternalIncomeTypeSelectBox } from "@/components/Select/external-income-type";
import { useUpdateExternalIncomeMutation } from "@/hooks/api/transactions/mutations/use-update-external-income-mutation";
import { useTranslations } from "next-intl";

type CreateFormProps = {
  item:any
};

interface FormValues {
  amount: number;
  currencyId: string;
  receiver: string;
  description?:string
  externalIncomeTypeId:string
}
export const UpdateForm = ({ item}: CreateFormProps) => {
  const t = useTranslations("transactions")
  const theme = useTheme();
  const { setHandleError } = useContext(AppContext);
  const defaultValues = useMemo(() => {
      return {
        amount: item?.amount || 0,
        currencyId: item?.currencyId?._id || "",
        receiver: item?.receiver?._id || "", // Add this line
        description:item?.description,
        externalIncomeTypeId:item?.externalIncomeTypeId?._id || ""
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
  const { mutate: addUpdateExternalIncomeMutation, isLoading } =
    useUpdateExternalIncomeMutation();

  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
  };
  const onSubmitFunction = (data: any) => {
    addUpdateExternalIncomeMutation(
      {
        externalIncomeId:item?._id,
        externalIncomeObject: {
          currencyId: data?.currencyId,
          externalIncomeTypeId: data?.externalIncomeTypeId,
          receiver: data?.receiver,
          amount: Number(data?.amount),
          description: data?.description,
        },
      },
      {
        onSuccess: () => {
          handleOpenDialogFunction();
          setHandleError({
            open: true,
            type: "success",
            message: "External income successfully updated.",
          });
        },
        onError:(error:any)=> {
            setHandleError({
                open:true,
                type:"error",
                message:error.message
            })
        }
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
          <Typography>{t("update_external_income")}</Typography>
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
                  {t("external_income_type")}
                </InputLabel>
                <ExternalIncomeTypeSelectBox name={"externalIncomeTypeId"}  dir={t("dir")}/>
              </Grid>
              <Grid item xs={12}>
                <InputLabel
                  sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                  required
                >
                  {t("recipient")}
                </InputLabel>
                <CashBoxAutoComplete name="receiver" dir={t("dir")}/>
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
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t("description")}
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
