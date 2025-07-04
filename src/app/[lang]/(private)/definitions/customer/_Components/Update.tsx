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
import { CloseSquare, Edit } from "iconsax-react";
import { useContext, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { AppContext } from "@/provider/appContext";
import { useUpdateCustomerMutation } from "@/hooks/api/definitions/customer/mutations/use-update-mutation";
import { useTranslations } from "next-intl";

interface IPropsCreateCustomer {
  item: any;
}
const UpdateCustomer: React.FC<IPropsCreateCustomer> = ({ item }) => {
  const t = useTranslations("pages");
  const method = useForm({
    defaultValues: {
      fullName: item?.fullName,
      contactNumber: item?.contactNumber,
      address: item?.address,
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = method;
  const theme = useTheme();
  const { mutate, isLoading } = useUpdateCustomerMutation();

  const [openDialog, setOpenDialog] = useState(false);
  const { setHandleError } = useContext(AppContext);

  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
  };

  const onSubmitFunction = async (data: any) => {
    const variables = {
      customerId: item?._id,
      customerObject: {
        fullName: data?.fullName,
        ...(data?.address ? { address: data?.address } : {}),
        ...(data?.contactNumber ? { contactNumber: data?.contactNumber } : {}),
      },
    };

    mutate(variables, {
      onSuccess: () => {
        setHandleError({
          open: true,
          message: t("Customers.customer_saved_successfully"),
          status: "success",
        });
        setOpenDialog(false);
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
            px: 2,
            py: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${theme.palette.grey[200]}`,
          }}
        >
          <Typography>{t("Customers.update_customer")}</Typography>
          <IconButton size="medium" onClick={handleOpenDialogFunction}>
            <CloseSquare size={20} color="gray" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <Grid container spacing={2} sx={{ mt: "1rem" }}>
              <Grid item xs={12}>
                <InputLabel
                  sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                  error={!!errors?.fullName}
                >
                  {t("Customers.customer_name")}
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  {...register("fullName", { required: true })}
                  name="fullName"
                  error={!!errors?.fullName}
                />
                {errors?.fullName?.type === "required" && (
                  <Typography color="error" p={1}>
                    {t("Customers.customer_name_is_required")}
                  </Typography>
                )}
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
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}  error={!!errors?.address}>
                  {t("Customers.address")}
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  {...register("address", { required: false  , maxLength: 255})}
                  name="address"
                  error={!!errors?.address}
                />
                {errors?.address?.type === "maxLength" && (
                  <Typography color="error">
                    {t("Customers.address_is_too_long")}
                  </Typography>
                )}
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
        <IconButton onClick={handleOpenDialogFunction}>
          <Edit size={20} color={theme.palette.primary.contrastText} />
        </IconButton>
      </Box>
    </FormProvider>
  );
};

export default UpdateCustomer;
