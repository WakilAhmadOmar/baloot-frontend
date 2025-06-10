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
import { CloseCircle, CloseSquare, Edit } from "iconsax-react";
import {
  ChangeEvent,
  MouseEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { FormProvider, useForm } from "react-hook-form";
import UserCurrenciesComponent from "@/components/Auto/currencyAutoComplete";
import { AppContext } from "@/provider/appContext";
import SelectWithInput from "@/components/search/SelectWIthInput";
import { useAddFirstPeriodOfCreditMutation } from "@/hooks/api/accounts/mutations/use-add-first-period-of-credit-mutation";

interface IPropsAddCashBox {
  t: any;
  item: any;
}

export const UpdateBanksAccounts: React.FC<IPropsAddCashBox> = ({
  t,
  item,
}) => {
  const methods = useForm();
  const { register, handleSubmit, reset } = methods;
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const { setHandleError } = useContext(AppContext);
  const [bankDetails, setBankDetails] = useState<any>();
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
          creditType: "Credit",
          currencyId: {
            _id: "",
            name: "",
            symbol: "",
          },
        },
      ],
    }));
  };

  useEffect(() => {
    if (item) {
      setBankDetails(item);
    }
  }, [item]);

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
      accountId: item?._id,
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
          <Typography>
            {t?.pages?.bank?.update_record_previous_bank_account} ({item?.name})
          </Typography>
          <IconButton size="medium" onClick={handleOpenDialogFunction}>
            <CloseSquare />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            {bankDetails?.firstPeriodCredit?.length > 0 && (
              <Grid container spacing={2} sx={{ mt: "1rem", mb: "1rem" }}>
                <Grid item xs={7}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t?.pages?.bank?.previous_account}
                  </InputLabel>
                </Grid>
                <Grid item xs={4}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t?.pages?.bank?.currency}
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
                      dir={t?.home?.dir}
                      defaultValue={item?.currencyId?._id}
                      onSelected={(currency) =>
                        handleSelectCurrency(currency, index)
                      }
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
            <Grid
              item
              xs={12}
              display={"grid"}
              justifyContent={"end"}
              sx={{
                mt: bankDetails?.firstPeriodCredit?.length > 0 ? 0 : "1rem",
              }}
            >
              <Button
                color="primary"
                type="button"
                variant="outlined"
                onClick={handleAddNewCredit}
              >
                {t?.pages?.bank?.new_currency}
              </Button>
            </Grid>
            <Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t?.pages?.bank?.description}
                </InputLabel>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  size="small"
                  {...register("description", { required: false })}
                  name="description"
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "end", columnGap: "1rem" }}
        >
          <Button variant="outlined" onClick={handleOpenDialogFunction}>
            {t?.pages?.bank?.Cancel}
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit(onSubmitFunction)}
            loading={isLoading}
          >
            {t?.pages?.bank?.save}
          </Button>
        </DialogActions>
      </Dialog>
      <Box>
        <IconButton onClick={handleOpenDialogFunction}>
          <Edit size={20} color={theme.palette.primary.contrastText} />
        </IconButton>
      </Box>
    </FormProvider>
  );
};
