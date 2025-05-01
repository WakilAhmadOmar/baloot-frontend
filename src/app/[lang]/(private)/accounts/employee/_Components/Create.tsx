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
import { useForm } from "react-hook-form";
import UserCurrenciesComponent from "@/components/Auto/currencyAutoComplete";
import EmptyPage from "@/components/util/emptyPage";
import { EmptyProductPageIcon } from "@/icons";
import { AppContext } from "@/provider/appContext";
import SelectWithInput from "@/components/search/SelectWIthInput";
import { useApolloClient } from "@apollo/client";
import { ADD_FIRST_PERIOD_OF_CREDIT } from "@/graphql/mutation/ADD_FIRST_PERIOD_OF_CREDIT";
import EmployeeAutoCompleteComponent from "@/components/Auto/EmployeeAutoComplete";

interface IPropsAddCashBox {
  isEmptyPage: boolean;
  t: any;
  onUpdateEmployee?: (cashbox: any) => void;
}

const AddBanksAccounts: React.FC<IPropsAddCashBox> = ({
  isEmptyPage,
  t,
  onUpdateEmployee,
}) => {
  const client = useApolloClient();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    setValue,
    getFieldState,
  } = useForm();
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const { setHandleError } = useContext(AppContext);
  const [employeeDetails, setEmployeeDetails] = useState<any>();

  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
  };

  const handleAddNewCredit = () => {
    setEmployeeDetails((prevState: any) => ({
      ...prevState,
      credit: [
        ...(prevState?.credit?.length > 0 ? prevState?.credit : []),
        {
          amount: 0,
          creditType: "",
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
    setEmployeeDetails((prevState: any) => ({
      ...prevState,
      credit: prevState?.credit?.filter(
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
    setEmployeeDetails((prevState: any) => {
      const credit = prevState?.credit?.map((item: any, inItem: number) => {
        if (index == inItem) {
          return {
            ...item,
            ...(name?.includes("amount") ? { amount: value } : {}),
            ...(name?.includes("creditType") ? { creditType: value } : {}),
          };
        } else return item;
      });
      return {
        ...prevState,
        credit,
      };
    });
  };
  const onSubmitFunction = async (data: any) => {
    try {
      setLoadingPage(true);
      const variables = {
        creditObject: employeeDetails?.credit?.map(
          (item: any, index: number) => ({
            amount: parseFloat(item?.amount),
            creditType: item?.creditType,
            currencyId: item?.currencyId?._id,
          })
        ),
        description: data?.description,
        accountType: "Employee",
        accountId: data?.employeeId,
      };
      const {
        data: { addFirstPeriodOfCredit },
      } = await client.mutate({
        mutation: ADD_FIRST_PERIOD_OF_CREDIT,
        variables,
      });
      if (addFirstPeriodOfCredit?.message) {
        setHandleError({
          message: addFirstPeriodOfCredit?.message,
          open: true,
          type: "success",
        });
      }
      setLoadingPage(false);
      handleOpenDialogFunction();
      setEmployeeDetails(null);
    } catch (error: any) {
      setLoadingPage(false);
      setHandleError({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const handleGetBank = (data: any) => {
    setValue("employeeId", data?._id);
    setEmployeeDetails(data);
  };
  const handleSelectCurrency = (currency: any, index: number) => {
    const allCredit = employeeDetails?.credit;
    allCredit[index].currencyId = currency;
    setEmployeeDetails((prevState: any) => ({
      ...prevState,
      credit: allCredit,
    }));
  };
  return (
    <>
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
            {t?.pages?.employee?.record_previous_employee_accounts}
          </Typography>
          <IconButton size="medium" onClick={handleOpenDialogFunction}>
            <CloseSquare />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ my: "2rem" }}>
                <InputLabel
                  sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                  required
                >
                  {t?.pages?.employee?.name}
                </InputLabel>
                <EmployeeAutoCompleteComponent
                  placeholder="Banks"
                  register={register}
                  getValue={handleGetBank}
                />
              </Grid>
            </Grid>
            {employeeDetails?.credit?.length > 0 && (
              <Grid container spacing={2} sx={{ mt: "1rem", mb: "1rem" }}>
                <Grid item xs={7}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t?.pages?.Customers?.previous_account}
                  </InputLabel>
                </Grid>
                <Grid item xs={4}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t?.pages?.bank?.currency}
                  </InputLabel>
                </Grid>
              </Grid>
            )}
            {employeeDetails?.credit?.map((item: any, index: any) => {
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
                      data={[
                        { name: "Credit", value: "Credit" },
                        { name: "Debit", value: "Debit" },
                      ]}
                      onChange={(
                        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
                      ) => handleChangeCredit(event, index)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <UserCurrenciesComponent
                      register={register}
                      defaultValue={item?.currencyId?._id}
                      onSelected={(currency) =>
                        handleSelectCurrency(currency, index)
                      }
                    />
                  </Grid>
                  {index > 0 && (
                    <Grid item xs={1}>
                      <IconButton
                        color="primary"
                        type="button"
                        onClick={handleDeleteCredit}
                        id={`${index}`}
                      >
                        <CloseCircle
                          size={18}
                          color={theme.palette.grey["A700"]}
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
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit(onSubmitFunction)}
            loading={loadingPage}
          >
            {t?.pages?.bank?.save}
          </Button>
          <Button variant="outlined" onClick={handleOpenDialogFunction}>
            {t?.pages?.bank?.cancel}
          </Button>
        </DialogActions>
      </Dialog>
      {isEmptyPage ? (
        <Box
          className={"empty_page_content"}
          width={"100%"}
          height={"70vh"}
          alignItems={"center"}
          display={"grid"}
        >
          <EmptyPage
            icon={<EmptyProductPageIcon />}
            title={t.pages?.Customers?.no_product_yet_title}
            discription={t.pages?.Customers?.no_product_yet_discription}
            buttonText={t.pages?.Customers.add_new_customer}
            onClick={handleOpenDialogFunction}
          />
        </Box>
      ) : (
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialogFunction}
          >
            {t?.pages?.bank?.record_previous_balance}
          </Button>
        </Box>
      )}
    </>
  );
};

export default AddBanksAccounts;
