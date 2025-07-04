"use client";
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
import { ChangeEvent, MouseEvent, useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import UserCurrenciesComponent from "@/components/Auto/currencyAutoComplete";
import { AppContext } from "@/provider/appContext";
import SelectWithInput from "@/components/search/SelectWIthInput";
import BankAutoComplete from "@/components/Auto/bankAutoComplete";

import { useAddFirstPeriodOfCreditMutation } from "@/hooks/api/accounts/mutations/use-add-first-period-of-credit-mutation";
import { useTranslations } from "next-intl";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSchemaCrateForm } from "./Create-form-schema";

const AddBanksAccounts = () => {
  const t = useTranslations("pages");
  const methods = useForm({
      resolver: yupResolver(useSchemaCrateForm(t)),
    });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const { setHandleError } = useContext(AppContext);
  const [bankDetails, setBankDetails] = useState<any>({
    _id: "1",
    firstPeriodCredit: [
      {
        amount: 0,
        creditType: "Debit",
        currencyId: {
          _id: "",
          name: "",
          symbol: "",
        },
      },
    ],
  });
  const { mutate: addFirstPeriodMutation, isLoading } =
    useAddFirstPeriodOfCreditMutation();

  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
  };

  const handleAddNewCredit = () => {
    setBankDetails((prevState: any) => ({
      ...prevState,
      firstPeriodCredit: [
        ...(prevState?.firstPeriodCredit?.length > 0
          ? prevState?.firstPeriodCredit
          : []),
        {
          amount: 0,
          creditType: "Debit",
          currencyId: {
            _id: "",
            name: "",
            symbol: "",
          },
        },
      ],
    }));
  };
  const handleDeleteCredit = (event: MouseEvent) => {
    const deleteIndex = parseInt(event?.currentTarget?.id);
    setBankDetails((prevState: any) => ({
      ...prevState,
      firstPeriodCredit: prevState?.firstPeriodCredit?.filter(
        (item: any, index: number) => index !== deleteIndex
      ),
    }));
  };

  const handleChangeCredit = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => {
    const name = event?.target?.name;
    const value = event?.target?.value;
    setBankDetails((prevState: any) => {
      const firstPeriodCredit = prevState?.firstPeriodCredit?.map(
        (item: any, inItem: number) => {
          if (index == inItem) {
            return {
              ...item,
              ...(name?.includes("amount") ? { amount: value } : {}),
              ...(name?.includes("creditType") ? { creditType: value } : {}),
            };
          } else return item;
        }
      );
      return {
        ...prevState,
        firstPeriodCredit,
      };
    });
  };
  const onSubmitFunction = async (data: any) => {
    if (bankDetails?.firstPeriodCredit?.[0]?.currencyId?._id  === "") {
     return setHandleError({
        open: true,
        message: t("bank.please_add_at_least_one_credit"),
        status: "error",
      });
      
    }
    const variables = {
      creditObject: bankDetails?.firstPeriodCredit?.map(
        (item: any, index: number) => ({
          amount: parseFloat(item?.amount),
          creditType: item?.creditType,
          currencyId: item?.currencyId?._id,
        })
      ),
      description: data?.description,
      accountType: "Bank",
      accountId: data?.bankId,
    };

    addFirstPeriodMutation(variables, {
      onSuccess: ({ message }: any) => {
        setHandleError({
          message: message ?? "",
          type: "success",
          open: true,
        });
        handleOpenDialogFunction();
        reset();
      },
      onError: (error: any) => {
        setHandleError({
          open: true,
          message: error?.message,
          type: "error",
        });
      },
    });
  };

  const handleGetBank = (data: any) => {
    setBankDetails(data);
  };
  const handleSelectCurrency = (currency: any, index: number) => {
    const allCredit = bankDetails?.firstPeriodCredit;
    allCredit[index].currencyId = currency;
    setBankDetails((prevState: any) => ({
      ...prevState,
      firstPeriodCredit: allCredit,
    }));
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
          <Typography>{t("bank.record_previous_bank_accounts")}</Typography>
          <IconButton size="medium" onClick={handleOpenDialogFunction}>
            <CloseSquare size={20} color="gray"/>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ mt: "2rem", mb: "1rem" }}>
                <InputLabel
                  sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                  required
                  error={!!errors?.bankId}
                >
                  {t("bank.bank_name")}
                </InputLabel>
                <BankAutoComplete
                  dir={t("dir")}
                  name="bankId"
                  getBank={handleGetBank}
                />
                {errors?.bankId && (
                  <Typography variant="caption" color="error">
                    {errors?.bankId?.message}
                  </Typography>
                )}
              </Grid>
            </Grid>
            {bankDetails?.firstPeriodCredit?.length > 0 && (
              <Grid container spacing={2} sx={{ mt: "1rem", mb: "1rem" }}>
                <Grid item xs={7}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t("bank.previous_account")}
                  </InputLabel>
                </Grid>
                <Grid item xs={4}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t("bank.currency")}
                  </InputLabel>
                </Grid>
              </Grid>
            )}
            {bankDetails?.firstPeriodCredit?.map((item: any, index: any) => {
              return (
                <Grid
                  container
                  spacing={2}
                  key={"credit" + index}
                  sx={{ mb: "1.5rem" }}
                >
                  <Grid item xs={7}>
                    <SelectWithInput
                      register={register}
                      inputName={"amount" + index}
                      selectName={"creditType" + index}
                      defaultValue={item?.creditType}
                      inputDefaultValue={item?.amount}
                      data={[{ name: "Debit", value: "Debit" }]}
                      onChange={(
                        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
                      ) => handleChangeCredit(event, index)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <UserCurrenciesComponent
                      name="currencyId"
                      dir={t("dir")}
                      required={false}
                      defaultValue={item?.currencyId?._id}
                      onSelected={(currency) =>
                        handleSelectCurrency(currency, index)
                      }
                    />
                    {errors?.currencyId && (
                      <Typography variant="caption" color="error">
                        {t("bank.currency_is_required")}
                      </Typography>
                    )}
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
              >
                {t("bank.new_currency")}
              </Button>
            </Grid>
            <Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                error={!!errors?.description}
                >
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
                  <Typography variant="caption" color="error">
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

export default AddBanksAccounts;
