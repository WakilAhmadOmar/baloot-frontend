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
import { CloseSquare } from "iconsax-react";
import { useEffect, useState } from "react";
import { useForm ,FormProvider} from "react-hook-form";
import { useApolloClient } from "@apollo/client";
import SnackbarComponent from "@/components/snackbarComponent";
import CircularProgressComponent from "@/components/loader/CircularProgressComponent";
import { ADD_SAFE } from "@/graphql/mutation/ADD_SAFE";
import { UPDATE_SAFE } from "@/graphql/mutation/UPDATE_SAFE";
import UserCurrenciesComponent from "@/components/Auto/currencyAutoComplete";
import EmptyPage from "@/components/util/emptyPage";
import { EmptyProductPageIcon } from "@/icons";

import EmployeeAutoCompleteComponent from "@/components/Auto/EmployeeAutoComplete";

interface IPropsCreateCashBox {
  getProuctCreated: (product: any) => void;
  isUpdate: boolean;
  item?: any;
  getProductUpdated?: (product: any) => void;
  canceleUpdageProduct?: () => void;
  isEmptyPage: boolean;
  t: any;
}

const CreateCashBox: React.FC<IPropsCreateCashBox> = ({
  getProuctCreated,
  isUpdate,
  canceleUpdageProduct,
  getProductUpdated,
  item,
  isEmptyPage,
  t,
}) => {
  const method = useForm()
  const { register, handleSubmit, setValue } = method;
  const theme = useTheme();

  const cleint = useApolloClient();
  const [openDialog, setOpenDialog] = useState(isUpdate);
  const [loadingPage, setLoadingPage] = useState(false);
  const [employee, setEmployee] = useState<any>(null);
  const [selectedUnitProduct, setSelectedUnitProduct] = useState<any[]>([]);

  const [handleError, setHandleError] = useState<{
    status: "success" | "info" | "warning" | "error";
    open: boolean;
    message: string;
  }>({
    status: "success",
    open: false,
    message: "",
  });

  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
    if (canceleUpdageProduct) {
      canceleUpdageProduct();
    }
  };

  useEffect(() => {
    if (item?._id) {
      setValue("name", item?.name);
      setSelectedUnitProduct(
        item?.measures?.map((item: any) => {
          setValue("boughtPrice " + item?.measure?.name, item?.boughtPrice);
          setValue("salePrice " + item?.measure?.name, item?.salePrice);
          return {
            measure: item?.measure?._id,
            name: item?.measure?.name,
            boughtPrice: item?.boughtPrice,
            salePrice: item?.salePrice,
          };
        })
      );
      setValue("category", item?.category?._id);
      setValue("expirationDate", item?.expirationDate);
      setValue("barcode", item?.barcode);
      setValue("amount", item?.amount);
      setValue(
        "isNewProduct",
        item?.isNewProduct ? "newProduct" : "oldProduct"
      );
      setValue("currencyId", item?.currencyId?._id);
    }
    if (isUpdate) {
      setOpenDialog(isUpdate);
    }
  }, [item?._id, isUpdate]);
  const onSubmitFunction = async (data: any) => {
    if (!employee?._id) {
      return setHandleError({
        message: "select one Emploey",
        status: "error",
        open: true,
      });
    }
    const variables = {
      ...(isUpdate ? { safeId: item?._id } : {}),
      safeObject: {
        name: data?.name,
        ...(data?.credit
          ? {
              credit: {
                amount: parseInt(data?.amount),
                currencyId: data?.currency,
              },
            }
          : {}),
        cashier: employee?._id,
        ...(data?.address ? {address: data?.address} : {}),
        ...(data?.cashierPhoneNumber ? {cashierPhoneNumber: data?.cashierPhoneNumber} : {}),
      },
    };

    try {
      setLoadingPage(true);
      if (isUpdate) {
        const {
          data: { updateSafe },
        } = await cleint.mutate({
          mutation: UPDATE_SAFE,
          variables,
        });
        if (updateSafe?.message && getProductUpdated) {
          getProductUpdated(variables.safeObject);
          setLoadingPage(false);
          setOpenDialog(false);
        }
      } else {
        const {
          data: { addSafe },
        } = await cleint.mutate({
          mutation: ADD_SAFE,
          variables,
        });
        if (addSafe?._id) {
          getProuctCreated(addSafe);
          setLoadingPage(false);
          setOpenDialog(false);
        }
      }
    } catch (error: any) {
      setHandleError({
        open: true,
        message: error.message,
        status: "error",
      });
      setLoadingPage(false);
    }
  };

  const handleCloseError = () => {
    setHandleError((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  const handleGetEmployeeFunction = (employee: any) => {
    setEmployee(employee);
  };
  return (
    <FormProvider {...method}>
      <SnackbarComponent
        status={handleError?.status}
        open={handleError?.open}
        message={handleError?.message}
        handleClose={handleCloseError}
      />
      <Dialog
        open={openDialog}
        onClose={handleOpenDialogFunction}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        dir={t?.home.dir}
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
          <Typography>{t?.pages?.cashbox?.New_Cashbox_Information}</Typography>
          <IconButton size="medium" onClick={handleOpenDialogFunction}>
            <CloseSquare />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <Grid container spacing={2} sx={{mt:"1rem"}}>
              <Grid item xs={12}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t?.pages?.cashbox?.Cashbox_Name}
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  {...register("name", { required: true })}
                  name="name"
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t?.pages?.cashbox?.Cashier}
                </InputLabel>
                <EmployeeAutoCompleteComponent
                placeholder=""
                  register={register}
                  name="cashier"
                  getValue={handleGetEmployeeFunction}
                />
                {/* <Select
                    {...register("cashier", { required: true })}
                    name="cashier"
                    fullWidth
                    size="small"
                  >
                    <MenuItem>default</MenuItem>
                  </Select> */}
              </Grid>
              <Grid item xs={6}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t?.pages?.cashbox?.Cashier_Contact_Number}
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  {...register("cashierPhoneNumber", { required: true })}
                  name="cashierPhoneNumber"
                />
              </Grid>

              <Grid item xs={8}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t?.pages?.cashbox?.Current_Balance}
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  {...register("amount", { required: false })}
                  name="amount"
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t?.pages?.cashbox?.Currency}
                </InputLabel>
                <UserCurrenciesComponent
                  register={register}
                  isRequired={false}
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
            {t?.pages?.cashbox?.Save}
          </Button>
          <Button variant="outlined" onClick={handleOpenDialogFunction}>
            {t?.pages?.cashbox?.Cancel}
          </Button>
        </DialogActions>
      </Dialog>
      {isEmptyPage ? (
        <Box className={"empty_page_content"}>
          <EmptyPage
            icon={<EmptyProductPageIcon />}
            title={t.pages?.cashbox.no_product_yet_title}
            discription={t.pages?.cashbox.no_product_yet_discription}
            buttonText={t.pages?.cashbox?.Create_new_Cashbox}
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
            {t?.pages?.cashbox?.Create_new_Cashbox}
          </Button>
        </Box>
      )}
    </FormProvider>
  );
};

export default CreateCashBox;
