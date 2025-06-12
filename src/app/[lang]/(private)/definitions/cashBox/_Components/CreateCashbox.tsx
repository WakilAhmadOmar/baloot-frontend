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
import { useForm, FormProvider } from "react-hook-form";

import EmployeeAutoCompleteComponent from "@/components/Auto/EmployeeAutoComplete";
import { useAddSafeMutation } from "@/hooks/api/definitions/safe/mutations/use-add-mutation";
import { AppContext } from "@/provider/appContext";
import { useTranslations } from "next-intl";



const CreateCashBox = () => {
  const t = useTranslations("pages")
  const method = useForm();
  const { register, handleSubmit } = method;
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);

  const {setHandleError} = useContext(AppContext)

  const { mutate, isLoading } = useAddSafeMutation();



  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
  };

  const onSubmitFunction = async (data: any) => {
    const variables = {
      safeObject: {
        name: data?.name,
        cashier: data?.employeeId,
        ...(data?.address ? { address: data?.address } : {}),
        ...(data?.cashierPhoneNumber
          ? { cashierPhoneNumber: data?.cashierPhoneNumber }
          : {}),
      },
    };
    mutate(variables, {
      onSuccess: () => {
        setHandleError({
          open: true,
          message: t("cashbox.safe_saved_successfully"),
          status: "success",
        });
        setOpenDialog(false);
      },
      onError: (error: any) => {
        setHandleError({
          open: true,
          message: error.message,
          status: "error",
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
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${theme.palette.grey[200]}`,
          }}
        >
          <Typography>{t("cashbox.New_Cashbox_Information")}</Typography>
          <IconButton size="medium" onClick={handleOpenDialogFunction}>
            <CloseSquare />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <Grid container spacing={2} sx={{ mt: "1rem" }}>
              <Grid item xs={12}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t("cashbox.Cashbox_Name")}
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
                  {t("cashbox.Cashier")}
                </InputLabel>
                <EmployeeAutoCompleteComponent />
              </Grid>
              <Grid item xs={6}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t("cashbox.Cashier_Contact_Number")}
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  {...register("cashierPhoneNumber", { required: true })}
                  name="cashierPhoneNumber"
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
            {t("cashbox.Save")}
          </Button>
          <Button variant="outlined" onClick={handleOpenDialogFunction}>
            {t("cashbox.Cancel")}
          </Button>
        </DialogActions>
      </Dialog>
  
       
 
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialogFunction}
          >
            {t("cashbox.Create_new_Cashbox")}
          </Button>
        </Box>
   
    </FormProvider>
  );
};

export default CreateCashBox;
