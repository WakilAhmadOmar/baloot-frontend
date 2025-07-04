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
import { FormProvider, useForm } from "react-hook-form";
import EmployeeAutoCompleteComponent from "@/components/Auto/EmployeeAutoComplete";
import { AppContext } from "@/provider/appContext";
import { useUpdateWarehouseMutation } from "@/hooks/api/definitions/warehouse/mutations/use-update-mutation";
import { useTranslations } from "next-intl";

interface IPropsCreateWarehouse {
  item: any;
}

const UpdateWarehouse: React.FC<IPropsCreateWarehouse> = ({ item }) => {
  const t = useTranslations("pages");
  const methods = useForm({
    defaultValues: {
      employeeId: item?.responsible?._id,
      name: item?.name,
      address: item?.address,
    },
  });
  const { setHandleError } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const theme = useTheme();

  const [openDialog, setOpenDialog] = useState(false);

  const { mutate, isLoading } = useUpdateWarehouseMutation();

  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
  };

  const onSubmitFunction = async (data: any) => {
    const variables = {
      entrepotId: item?._id,
      entrepotObject: {
        name: data?.name,
        address: data?.address,
        responsible: data?.employeeId,
      },
    };
    mutate(variables, {
      onSuccess: () => {
        setHandleError({
          open: true,
          message: t("warehouse.warehouse_updated_successfully"),
          status: "success",
        });
        handleOpenDialogFunction();
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
            px:2,
            py:1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${theme.palette.grey[200]}`,
          }}
        >
          <Typography> {t("warehouse.update_warehouse")}</Typography>
          <IconButton size="medium" onClick={handleOpenDialogFunction}>
            <CloseSquare size={20} color="gray" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <Grid container spacing={2} sx={{ mt: "1rem" }}>
              <Grid item xs={6}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                error={!!errors?.name}>
                  {t("warehouse.warehouses")}
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  {...register("name", { required: true })}
                  name="name"
                  error={!!errors?.name}
                />
                {errors?.name?.type === "required" && (
                  <Typography color="error" p={1}>
                    {t("warehouse.warehouse_name_is_required")}
                  </Typography>
                )}
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
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }} error={!!errors?.address}>
                  {t("warehouse.address")}
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  {...register("address", { required: false })}
                  name="address"
                  error={!!errors?.address}
                />
                 {errors?.address && (
                  <Typography>{t("warehouse.address_is_too_long")}</Typography>
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
            {t("warehouse.save")}
          </Button>
          <Button variant="outlined" onClick={handleOpenDialogFunction}>
            {t("warehouse.cancel")}
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

export default UpdateWarehouse;
