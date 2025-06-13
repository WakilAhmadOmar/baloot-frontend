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
import { useForm , FormProvider } from "react-hook-form";
import { useAddCustomerMutation } from "@/hooks/api/definitions/customer/mutations/use-add-mutation";
import { AppContext } from "@/provider/appContext";
import { useTranslations } from "next-intl";


const CreateCustomer = () => {
  const t = useTranslations("pages")
  const method = useForm()
  const {
    register,
    handleSubmit,
    formState: { errors },

  } = method;
  const theme = useTheme();
  const {mutate , isLoading } = useAddCustomerMutation()


  const [openDialog, setOpenDialog] = useState(false);
 const {setHandleError} = useContext(AppContext)

  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
  };

  const onSubmitFunction = async (data: any) => {
    const variables = {
      customerObject: {
        fullName: data?.fullName,
        ...(data?.address ? { address: data?.address } : {}),
        ...(data?.contactNumber ? { contactNumber: data?.contactNumber } : {}),
      },
    };

    mutate(variables , {
      onSuccess:() => {
        setHandleError({
          open: true,
        message: t("Customers.customer_saved_successfully"),
        type: "success",
        })
        setOpenDialog(false)
      },
      onError: (error:any) => {
        setHandleError({
        open: true,
        message: error.message,
        type: "error",
      });
      }
    })
    
  };

  return (
    <FormProvider {...method}>
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
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${theme.palette.grey[200]}`,
          }}
        >
          <Typography>{t("Customers.add_new_customer")}</Typography>
          <IconButton size="medium" onClick={handleOpenDialogFunction}>
            <CloseSquare />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <Grid container spacing={2} sx={{mt:"1rem"}}>
              <Grid item xs={12}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                error={!!errors?.fullName}>
                  {t("Customers.customer_name")}
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  {...register("fullName", { required: true })}
                  name="fullName"
                  error={!!errors?.fullName}
                />
                {errors?.fullName?.type === "required" && <Typography color="error" p={1}>
                  {t("Customers.customer_name_is_required")}
                  </Typography>}
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t("Customers.contact_number")}
                </InputLabel>
                <TextField
                  fullWidth
                  type="number"
                  size="small"
                  {...register("contactNumber", { required: false })}
                  name="contactNumber"
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t("Customers.address")}
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  {...register("address", { required: false })}
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
            loading={isLoading}
          >
            {t("Customers.save")}
          </Button>
          <Button variant="outlined" onClick={handleOpenDialogFunction}>
            {t("Customers.cancel")}
          </Button>
        </DialogActions>
      </Dialog>

        
    
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialogFunction}
          >
            {t("Customers.add_new_customer")}
          </Button>
        </Box>
    
    </FormProvider>
  );
};

export default CreateCustomer;
