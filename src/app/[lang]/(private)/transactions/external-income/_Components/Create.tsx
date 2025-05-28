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
import { ExternalIncomeTypeSelectBox } from "@/components/Select/external-income-type";
import { useAddNewExternalIncomeMutation } from "@/hooks/api/transactions/mutations/use-add-new-external-income-mutation";

type CreateFormProps = {
  t: any;
};

type FormInputType = {
  receiver: string;
  externalIncomeTypeId: string;
  currencyId: string;
  amount: number;
  description?: string;
};
export const CreateCreate = ({ t }: CreateFormProps) => {
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
        {t?.transactions?.add_external_income}
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
          <Typography>{t?.transactions?.add_external_income}</Typography>
          <IconButton size="medium" onClick={handleOpenDialogFunction}>
            <CloseSquare />
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
                  {t?.transactions?.external_income_type}
                </InputLabel>
                <ExternalIncomeTypeSelectBox name={"externalIncomeTypeId"} dir={t.home?.dir}/>
              </Grid>
              <Grid item xs={12}>
                <InputLabel
                  sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                  required
                >
                  {t?.transactions?.recipient}
                </InputLabel>
                <CashBoxAutoComplete name="receiver" />
              </Grid>
              <Grid item xs={6}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t?.transactions?.received_amount}
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
