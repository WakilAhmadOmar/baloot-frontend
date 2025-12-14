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
import { useAddConsumptionTypeMutation } from "@/hooks/api/definitions/consumption/mutations/use-add-mutation";
import { AppContext } from "@/provider/appContext";
import { useTranslations } from "next-intl";

const CreateConsumption = () => {
  const t = useTranslations("pages");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const { setHandleError } = useContext(AppContext);
  const { mutate, isLoading } = useAddConsumptionTypeMutation();

  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
  };

  const onSubmitFunction = async (data: any) => {
    const variables = {
      name: data?.name,
    };

    mutate(variables, {
      onSuccess: () => {
        setHandleError({
          open: true,
          message: t("Expenses.expense_type_saved_successfully"),
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
    <Box>
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
          <Typography>{t("Expenses.New_Expense")} </Typography>
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
                  error={!!errors?.name}
                >
                  {t("Expenses.Expense_Name")}
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
                    {t("Expenses.expense_name_is_require")}
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
            {t("Expenses.Save")}
          </Button>
          <Button variant="outlined" onClick={handleOpenDialogFunction}>
            {t("Expenses.Cancel")}
          </Button>
        </DialogActions>
      </Dialog>

      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenDialogFunction}
        >
          {t("Expenses.Add_New_Expense")}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateConsumption;
