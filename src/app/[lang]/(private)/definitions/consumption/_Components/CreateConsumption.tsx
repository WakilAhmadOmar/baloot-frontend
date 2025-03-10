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
import { useForm } from "react-hook-form";
import { useApolloClient } from "@apollo/client";
import CircularProgressComponent from "@/components/loader/CircularProgressComponent";
import SnackbarComponent from "@/components/snackbarComponent";
import { ADD_NEW_CONSUMPTION_TYPE } from "@/graphql/mutation/ADD_NEW_CONSUMPTION_TYPE";
import { UPDATE_CONSUMPTION_TYPE } from "@/graphql/mutation/UPDATE_CONSUMPTION_TYPE";
import EmptyPage from "@/components/util/emptyPage";
import { EmptyProductPageIcon } from "@/icons";

interface IPropsCreateConsumetion {
  getProuctCreated: (product: any) => void;
  isUpdate: boolean;
  item?: any;
  getProductUpdated?: (product: any) => void;
  canceleUpdageProduct?: () => void;
  isEmptyPage?: boolean;
  t:any
}

const CreateConsumption: React.FC<IPropsCreateConsumetion> = ({
  getProuctCreated,
  isUpdate,
  canceleUpdageProduct,
  getProductUpdated,
  isEmptyPage = true,
  item,
  t
}) => {
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
  const cleint = useApolloClient();
  const [openDialog, setOpenDialog] = useState(isUpdate);
  const [loadingPage, setLoadingPage] = useState(false);

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
    }
    if (isUpdate) {
      setOpenDialog(isUpdate);
    }
  }, [item?._id, isUpdate]);
  const onSubmitFunction = async (data: any) => {
    const variables = {
      ...(isUpdate ? { consumptionTypeId: item?._id } : {}),
      name: data?.name,
    };


    try {
      setLoadingPage(true);
      if (isUpdate) {
        const {
          data: { updateConsumptionType },
        } = await cleint.mutate({
          mutation: UPDATE_CONSUMPTION_TYPE,
          variables,
        });
        if (updateConsumptionType?._id && getProductUpdated) {
          getProductUpdated(updateConsumptionType);
          setLoadingPage(false);
          setOpenDialog(false);
        }
      } else {
        const {
          data: { addNewConsumptionType },
        } = await cleint.mutate({
          mutation: ADD_NEW_CONSUMPTION_TYPE,
          variables,
        });
        if (addNewConsumptionType?._id) {
          getProuctCreated(addNewConsumptionType);
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
          <Typography>{t?.pages?.Expenses.New_Expense} </Typography>
          <IconButton size="medium" onClick={handleOpenDialogFunction}>
            <CloseSquare />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t?.pages?.Expenses?.Expense_Name}
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  {...register("name", { required: true })}
                  name="name"
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
          >
            {t?.pages?.Expenses?.Save}
          </Button>
          <Button variant="outlined" onClick={handleOpenDialogFunction}>{t?.pages?.Expenses?.Cancel}</Button>
        </DialogActions>
      </Dialog>
      {isEmptyPage ? (
        <Box className={"empty_page_content"}>
          <EmptyPage
            icon={<EmptyProductPageIcon />}
            buttonText={t?.pages?.Expenses?.Add_New_Expense}
            discription={t?.pages?.Expenses?.You_have_no_expenses}
            onClick={handleOpenDialogFunction}
            title={t?.pages?.Expenses?.No_Expenses_Recorded}
          />
        </Box>
      ) : (
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialogFunction}
          >{t?.pages?.Expenses?.Add_New_Expense}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CreateConsumption;
