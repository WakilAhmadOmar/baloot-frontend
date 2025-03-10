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
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import CircularProgressComponent from "@/components/loader/CircularProgressComponent";
import UserCurrenciesComponent from "@/components/Auto/currencyAutoComplete";
import EmptyPage from "@/components/util/emptyPage";
import { EmptyProductPageIcon } from "@/icons";
import { AppContext } from "@/provider/appContext";

interface IPropsAddCashBox {
  isEmptyPage: boolean;
  t:any
}

const AddBanksAccounts: React.FC<IPropsAddCashBox> = ({ isEmptyPage , t }) => {
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
  const {setHandleError} = useContext(AppContext)


  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
  };

  const onSubmitFunction = async (data: any) => {
    console.log("data", data);
  };


  return (
    <Box>
      {loadingPage && <CircularProgressComponent />}
  
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
          <Typography>افزودن حساب بانک </Typography>
          <IconButton size="medium" onClick={handleOpenDialogFunction}>
            <CloseSquare />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel
                  sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                  required
                >
                  نام کامل بانک
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
                  دیبت
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  {...register("cashierPhoneNumber", { required: true })}
                  name="cashierPhoneNumber"
                />
              </Grid>

              <Grid item xs={6}>
                <UserCurrenciesComponent register={register} />
              </Grid>
              <Grid item xs={6}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  کردیت
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  {...register("cashierPhoneNumber", { required: true })}
                  name="cashierPhoneNumber"
                />
              </Grid>
              <Grid item xs={6}>
                <UserCurrenciesComponent register={register} />
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  توضیحات
                </InputLabel>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  size="small"
                  {...register("address", { required: true })}
                  name="address"
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
            ذخیره
          </Button>
          <Button variant="outlined">لغو</Button>
        </DialogActions>
      </Dialog>
      {isEmptyPage ? (
        <Box className={"empty_page_content"}>
          <EmptyPage
            icon={<EmptyProductPageIcon />}
            title={t.product.no_product_yet_title}
            discription={t.product.no_product_yet_discription}
            buttonText={t.product.add_new_product}
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
            ثبت موجودی گذشته
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AddBanksAccounts;
