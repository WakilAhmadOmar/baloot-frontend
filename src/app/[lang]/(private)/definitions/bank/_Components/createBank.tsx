"use client"
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
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useApolloClient } from "@apollo/client";
import { ADD_BANK } from "@/graphql/mutation/ADD_BANK";
import { UPDATE_BANK } from "@/graphql/mutation/UPDATE_BANK";
import UserCurrenciesComponent from "@/components/Auto/currencyAutoComplete";
import CircularProgressComponent from "@/components/util/CircularProgress";
import SnackbarComponent from "@/components/snackbarComponent";
import EmptyPage from "@/components/util/emptyPage";
import { EmptyProductPageIcon } from "@/icons";


interface IPropsCreateBank {
  getProuctCreated: (product: any) => void;
  isUpdate: boolean;
  item?: any;
  getProductUpdated?: (product: any) => void;
  canceleUpdageProduct?: () => void;
  isEmptyPage: boolean;
  t:any
}

const CreateBank: React.FC<IPropsCreateBank> = ({
  getProuctCreated,
  isUpdate,
  item,
  getProductUpdated,
  canceleUpdageProduct,
  isEmptyPage,
  t
}) => {
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm();
  const theme = useTheme();
  const cleint = useApolloClient();
  const [openDialog, setOpenDialog] = useState(isUpdate);
  const [loadingPage, setLoadingPage] = useState(false);
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
    
    const variables = {
      ...(isUpdate ? { bankId: item?._id } : {}),
      bankObject: {
        name: data?.name,
        cridet: {
          amount: parseInt(data?.amount),
          currencyId: data?.currencyId,
        },
        accountNumber: data?.accountNumber,
        bankPhoneNumber: data?.bankPhoneNumber,
      },
    };
   

    try {
      setLoadingPage(true);
      if (isUpdate) {
        const {
          data: { updateBank },
        } = await cleint.mutate({
          mutation: UPDATE_BANK,
          variables,
        });
        if (updateBank?.message && getProductUpdated) {
          getProductUpdated(variables.bankObject);
          setLoadingPage(false);
          setOpenDialog(false);
        }
      } else {
        const {
          data: { addBank },
        } = await cleint.mutate({
          mutation: ADD_BANK,
          variables,
        });
        if (addBank?._id) {
          getProuctCreated(addBank);
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

  const handleChangePriceMeasureFunction = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event?.currentTarget?.value;
    const id = parseInt(event?.currentTarget?.id);
    const name = event?.currentTarget?.name;
    const newState = selectedUnitProduct?.map((item: any, index) => {
      if (index === id) {
        if (name?.split(" ")?.[0] === "boughtPrice") {
          return {
            ...item,
            boughtPrice: value,
          };
        } else {
          return {
            ...item,
            salePrice: value,
          };
        }
      } else return item;
    });
    setSelectedUnitProduct(newState);
  };

  return (
    <Box>
      {loadingPage && <CircularProgressComponent />}
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
          <Typography>{t?.pages?.bank?.New_Bank_Information}</Typography>
          <IconButton size="medium" onClick={handleOpenDialogFunction}>
            <CloseSquare />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t?.pages?.bank?.Bank_Name}
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
                {t?.pages?.bank?.Account_Number}
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  {...register("accountNumber", { required: true })}
                  name="accountNumber"
                />
              </Grid>
              <Grid item xs={8}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t?.pages?.bank?.Current_Balance}
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  {...register("amount", { required: true })}
                  name="amount"
                />
              </Grid>
              <Grid item xs={4}>
              <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t?.pages?.bank?.Currency}
                </InputLabel>
                <UserCurrenciesComponent register={register} />
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t?.pages?.bank?.Bank_Contact_Number}
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  {...register("bankPhoneNumber", { required: true })}
                  name="bankPhoneNumber"
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
          >
            {t?.pages?.bank?.Save}
          </Button>
          <Button variant="outlined">{t.pages.bank?.Cancel}</Button>
        </DialogActions>
      </Dialog>
      {isEmptyPage ? (
        <Box className={"empty_page_content"}>
          <EmptyPage
            icon={<EmptyProductPageIcon />}
            title={t.pages?.bank?.no_product_yet_title}
            discription={t.pages?.bank?.no_product_yet_discription}
            buttonText={t.pages?.bank?.Create_new_Bank}
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
            {t?.pages?.bank?.Create_new_Bank}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CreateBank;
