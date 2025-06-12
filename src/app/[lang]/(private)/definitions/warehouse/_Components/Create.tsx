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
import { FormProvider, useForm } from "react-hook-form";
import EmployeeAutoCompleteComponent from "@/components/Auto/EmployeeAutoComplete";
import { useAddEntrepotMutation } from "@/hooks/api/definitions/warehouse/mutations/use-add-mutation";
import { AppContext } from "@/provider/appContext";
import { useTranslations } from "next-intl";



const CreateWarehouse = () => {
  const t = useTranslations("pages")
  const methods = useForm();
  const {setHandleError} = useContext(AppContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);

  const {mutate , isLoading} = useAddEntrepotMutation()

  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
    
  };

  const onSubmitFunction = async (data: any) => {
    const variables = {
      entrepotObject: {
        name: data?.name,
        address: data?.address,
        responsible: data?.employeeId,
      },
    };
    mutate(variables , {
      onSuccess: () => {
        setHandleError({
          open: true,
          message: t("warehouse.warehouse_saved_successfully"),
          status: "success",
        });
        handleOpenDialogFunction()
      },
      onError: (error: any) => {
        setHandleError({
          open: true,
          message: error.message,
          status: "error",
        });
      },
    })
   
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
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${theme.palette.grey[200]}`,
          }}
        >
          <Typography> {t("warehouse.add_warehouse")}</Typography>
          <IconButton size="medium" onClick={handleOpenDialogFunction}>
            <CloseSquare />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <Grid container spacing={2} sx={{ mt: "1rem" }}>
              <Grid item xs={6}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t("warehouse.warehouses")}
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  {...register("name", { required: true })}
                  name="name"
                />
              </Grid>

              <Grid item xs={6}>
                <InputLabel
                  sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                  required
                >
                  {t("warehouse.warehouse_responsible")}
                </InputLabel>
                <EmployeeAutoCompleteComponent
                  name="employeeId"
                  dir={t("dir")}
                  // getValue={handleGetEmployeeFunction}
                  // defaultValue={{
                  //   ...item?.responsible,
                  //   id: item?.responsible?._id,
                  //   label: item?.responsible?.name,
                  // }}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t("warehouse.address")}
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
            {t("warehouse.save")}
          </Button>
          <Button variant="outlined" onClick={handleOpenDialogFunction}>
            {t("warehouse.cancel")}
          </Button>
        </DialogActions>
      </Dialog>

      
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialogFunction}
          >
            {t("warehouse.add_warehouse")}
          </Button>
        </Box>
      
    </FormProvider>
  );
};

export default CreateWarehouse;
