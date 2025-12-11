import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  useTheme,
  Grid,
  InputLabel,
} from "@mui/material";
import { CloseCircle, CloseSquare } from "iconsax-react";
import {  MouseEvent, useContext, useState } from "react";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import UserCurrenciesComponent from "@/components/Auto/currencyAutoComplete";
import { AppContext } from "@/provider/appContext";
import SelectWithInput from "@/components/search/SelectWIthInput";
import EmployeeAutoCompleteComponent from "@/components/Auto/EmployeeAutoComplete";
import { useAddFirstPeriodOfCreditMutation } from "@/hooks/api/accounts/mutations/use-add-first-period-of-credit-mutation";
import { useTranslations } from "next-intl";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateFormType, useSchemaCrateForm } from "./Create-form-schema";
import { CreditType } from "@/types/accounts/account.type";


const AddEmployeesAccounts = () => {
  const t = useTranslations("pages")
  const methods: UseFormReturn<CreateFormType> = useForm({
    resolver:yupResolver(useSchemaCrateForm(t)),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = methods;
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const { setHandleError } = useContext(AppContext);
  const watchFirstPeriodCredit = watch("firstPeriodCredit") || [];


  const { mutate: addFirstPeriodMutation, isLoading } =
      useAddFirstPeriodOfCreditMutation();

  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
  };

  const handleAddNewCredit = () => {
    const currentCredits = watchFirstPeriodCredit || [];
    const newCredit = {
      amount: 0,
      creditType: CreditType?.Debit,
      currencyId: "",
    };
    const newCredits = [...currentCredits, newCredit];
    setValue("firstPeriodCredit", newCredits);
  };


  const handleDeleteCredit = (event: MouseEvent) => {
    const deleteIndex = parseInt(event?.currentTarget?.id);
    const newCredits = watchFirstPeriodCredit?.filter(
      (item: any, index: number) => index !== deleteIndex
    );
    setValue("firstPeriodCredit", newCredits);
  };

  const onSubmitFunction = async (data: CreateFormType) => {
 
      const variables = {
        creditObject: watchFirstPeriodCredit?.map(
          (item: any, index: number) => ({
            amount: parseFloat(item?.amount),
            creditType: item?.creditType,
            currencyId: item?.currencyId,
          })
        )?.filter((item: any) => item?.amount > 0),
        description: data?.description,
        accountType: "Employee",
        accountId: data?.accountId,
      };
        addFirstPeriodMutation(variables, {
      onSuccess: ({ message }: any) => {
        setHandleError({
          message: message,
          type: "success",
          open: true,
        });
        handleOpenDialogFunction();
        reset({
          accountId: data?.accountId,
          description: data?.description,
          firstPeriodCredit: watchFirstPeriodCredit,
        });
      },
      onError: (error: any) => {
        setHandleError({
          open: true,
          message: error.message,
          type: "error",
        });
      },
    });

  };

  const handleGetBank = (data: any) => {
    setValue("accountId", data?._id);
    setValue("firstPeriodCredit", data?.firstPeriodCredit?.map((item: any) => ({
      amount: item?.amount,
      creditType: item?.creditType,
      currencyId: item?.currencyId?._id,
    })));
  };

  return (
    <FormProvider {...methods}>
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
            px: 2,
            py: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${theme.palette.grey[200]}`,
          }}
        >
          <Typography>
            {t("employee.record_previous_employee_accounts")}
          </Typography>
          <IconButton size="medium" onClick={handleOpenDialogFunction}>
            <CloseSquare size={20} color="gray" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ my: "2rem" }}>
                <InputLabel
                  sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                  required
                  error={!!errors?.accountId}
                >
                  {t("employee.name")}
                </InputLabel>
                <EmployeeAutoCompleteComponent
                  getEmployee={handleGetBank}
                  name={"accountId"}
                />
                {errors?.accountId && (
                  <Typography
                    variant="caption"
                    color="error"
                  >
                    {errors?.accountId?.message}
                  </Typography>
                )}
              </Grid>
            </Grid>
            {watchFirstPeriodCredit?.length > 0 && (
              <Grid container spacing={2} sx={{ mt: "1rem", mb: "1rem" }}>
                <Grid item xs={7}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t("Customers.previous_account")}
                  </InputLabel>
                </Grid>
                <Grid item xs={4}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t("bank.currency")}
                  </InputLabel>
                </Grid>
              </Grid>
            )}
            {watchFirstPeriodCredit?.map((item: any, index: any) => {
              return (
                <Grid
                  container
                  spacing={2}
                  key={"credit" + index}
                  sx={{ mb: "1.5rem" }}
                >
                  <Grid item xs={7}>
                    <SelectWithInput
                      inputName={`firstPeriodCredit.${index}.amount`}
                      selectName={`firstPeriodCredit.${index}.creditType`}
                      data={Object.values(CreditType).map((type) => ({ name: type, value: type }))}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <UserCurrenciesComponent
                     name={`firstPeriodCredit.${index}.currencyId`}
                      required={false}
                      dir={t("dir")}
                    />
                  </Grid>
                  {index > 0 && (
                    <Grid item xs={1}>
                      <IconButton
                        color="error"
                        type="button"
                        onClick={handleDeleteCredit}
                        id={`${index}`}
                      >
                        <CloseCircle
                          size={18}
                          color={theme.palette.error.main}
                        />
                      </IconButton>
                    </Grid>
                  )}
                </Grid>
              );
            })}
            <Grid item xs={12} display={"grid"} justifyContent={"end"}>
              <Button
                color="primary"
                type="button"
                variant="outlined"
                onClick={handleAddNewCredit}
                // startIcon={<Add size={25} color={theme.palette.grey["A700"]} />}
              >
                {t("bank.new_currency")}
              </Button>
            </Grid>
            <Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }} error={!!errors?.description}>
                  {t("bank.description")}
                </InputLabel>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  size="small"
                  {...register("description", { required: false })}
                  name="description"
                  error={!!errors?.description}
                />
                {errors?.description && (
                  <Typography
                    variant="caption"
                    color="error"
                  >
                    {errors?.description?.message}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "end", columnGap: "1rem" }}
        >
          <Button variant="outlined" onClick={handleOpenDialogFunction}>
            {t("bank.Cancel")}
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit(onSubmitFunction)}
            loading={isLoading}
          >
            {t("bank.save")}
          </Button>
        </DialogActions>
      </Dialog>
    
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialogFunction}
          >
            {t("bank.record_previous_balance")}
          </Button>
        </Box>
    </FormProvider>
  );
};

export default AddEmployeesAccounts;
