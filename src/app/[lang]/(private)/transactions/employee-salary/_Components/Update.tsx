import CashBoxAutoComplete from "@/components/Auto/cashBoxAutoComplete";
import CurrenciesAutoComplete from "@/components/Auto/currencyAutoComplete";
import EmployeeAutoCompleteComponent from "@/components/Auto/EmployeeAutoComplete";
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
import { useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSchemaCrateForm } from "./Create-form-schema";
import { AppContext } from "@/provider/appContext";
import { useTranslations } from "next-intl";
import { useUpdateEmployeeSalaryMutation } from "@/hooks/api/transactions/mutations/use-update-employee-salary";

interface IUpdateEmployeeSalaryProps {
  salary: any;
}

export const UpdateEmployeeSalary = ({
  salary,
}: IUpdateEmployeeSalaryProps) => {
  const t = useTranslations("transactions");
  const theme = useTheme();
  const methods = useForm({
    resolver: yupResolver(useSchemaCrateForm(t)),
    defaultValues: {
      payerId: salary?.payerId?._id,
      receiver: salary?.receiver?._id,
      amount: salary?.amount.toString(),
      currencyId: salary?.currencyId?._id,
      description: salary?.description,
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const [openDialog, setOpenDialog] = useState(false);
  const { setHandleError } = useContext(AppContext);
  const { mutate: updateEmployeeSalaryMutation, isLoading } =
    useUpdateEmployeeSalaryMutation();

  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
  };
  const onSubmitFunction = (data: any) => {
    updateEmployeeSalaryMutation(
      {
        transactionId: salary?._id,
        salaryObject: {
          ...data,
          amount: parseFloat(data?.amount),
          invoiceType: "Cash",
        },
      },
      {
        onSuccess: () => {
          handleOpenDialogFunction();
          methods.reset();
          setHandleError({
            open: true,
            message: t("employee_salary_added_successfully"),
            status: "success",
          });
        },
        onError: (error: any) => {
          setHandleError({
            open: true,
            message: error?.message,
            status: "error",
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
        dir={t("dir")}
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
          <Typography> {t("update_employee_salary")}</Typography>
          <IconButton size="medium" onClick={handleOpenDialogFunction}>
            <CloseSquare size={20} color="gray" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={6}>
                <InputLabel
                  sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                  required
                  error={!!errors?.payerId}
                >
                  {t("full_name_of_employee")} ({t("payer")})
                </InputLabel>
                <EmployeeAutoCompleteComponent
                  dir={t("dir")}
                  name={"payerId"}
                />
                {errors?.payerId && (
                  <Typography variant="caption" color="error">
                    {errors?.payerId?.message}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                <InputLabel
                  sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                  error={!!errors?.receiver}
                >
                  {t("cashbox")} ({t("recipient")})
                </InputLabel>
                <CashBoxAutoComplete name="receiver" dir={t("dir")} />
                {errors?.receiver && (
                  <Typography variant="caption" color="error">
                    {errors?.receiver?.message}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                <InputLabel
                  sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                  error={!!errors?.amount}
                >
                  {t("salary_amount")}
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  {...register("amount", { required: true })}
                  name="amount"
                  error={!!errors?.amount}
                />
                {errors?.amount && (
                  <Typography variant="caption" color="error">
                    {errors?.amount?.message}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                <InputLabel
                  sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                  error={!!errors?.currencyId}
                >
                  {t("currency")}
                </InputLabel>
                <CurrenciesAutoComplete dir={t("dir")} />
                {errors?.currencyId && (
                  <Typography variant="caption" color="error">
                    {errors?.currencyId?.message}
                  </Typography>
                )}
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
                  {...register("description")}
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
