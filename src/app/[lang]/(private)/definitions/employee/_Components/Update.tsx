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
import UserCurrenciesComponent from "@/components/Auto/currencyAutoComplete";
import { AppContext } from "@/provider/appContext";
import { useAddEmployeeMutation } from "@/hooks/api/definitions/employee/mutations/use-add-mutation";
import { useUpdateEmployeeMutation } from "@/hooks/api/definitions/employee/mutations/use-update-mutation";
import { useTranslations } from "next-intl";

interface IPropsCreateEmployee {
  item: any;
}
const UpdateEmployee: React.FC<IPropsCreateEmployee> = ({ item }) => {
  const t = useTranslations("pages");
  const method = useForm({
    defaultValues: {
      name: item?.name,
      fathersName: item?.fathersName,
      dateOfBirth: item?.dateOfBirth,
      idNumber: item?.idNumber,
      jobTitle: item?.jobTitle,
      startDate: item?.startDate,
      amount: item?.salary?.amount,
      contactNumber: item?.contactNumber,
      currencyId: item?.salary?.currencyId?._id,
      email: item?.email,
      address: item?.address,
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = method;
  const theme = useTheme();
  const { setHandleError } = useContext(AppContext);

  const [openDialog, setOpenDialog] = useState(false);
  const { mutate, isLoading } = useUpdateEmployeeMutation();

  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
  };

  const onSubmitFunction = async (data: any) => {
    const variables = {
      employeeId: item?._id,
      employeeObject: {
        idNumber: data?.idNumber,
        ...(data?.address ? { address: data?.address } : {}),
        ...(data?.dateOfBirth ? { dateOfBirth: data?.dateOfBirth } : {}),
        ...(data?.email ? { email: data?.email } : {}),
        ...(data?.fathersName ? { fathersName: data?.fathersName } : {}),
        ...(data?.jobTitle ? { jobTitle: data?.jobTitle } : {}),
        ...(data?.contactNumber ? { contactNumber: data?.contactNumber } : {}),
        ...(data?.startDate ? { startDate: data?.startDate } : {}),
        ...(data?.name ? { name: data?.name } : {}),

        salary: {
          amount: parseInt(data?.amount) || 0,
          currencyId: data?.currencyId,
        },
      },
    };

    mutate(variables, {
      onSuccess: () => {
        setHandleError({
          open: true,
          message: t("employee.employee_updated_successfully"),
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
      <FormProvider {...method}>
        <Dialog
          open={openDialog}
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
            <Typography>{t("employee.add_new_employee")}</Typography>
            <IconButton size="medium" onClick={handleOpenDialogFunction}>
              <CloseSquare size={20} color="gray" />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmitFunction)}>
              <Grid container spacing={2} sx={{ mt: "1rem" }}>
                <Grid item mt={2} xs={6}>
                  <InputLabel
                    sx={{ paddingBottom: "5px" }}
                    required
                    error={!!errors?.name}
                  >
                    {t("employee.name")}
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
                      {t("employee.employee_name_is_require")}
                    </Typography>
                  )}
                </Grid>
                <Grid item mt={2} xs={6}>
                  <InputLabel sx={{ paddingBottom: "5px" }}>
                    {t("employee.fathers_name")}
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    {...register("fathersName", { required: true })}
                    name="fathersName"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t("employee.date_of_birth")}
                  </InputLabel>
                  <TextField
                    fullWidth
                    type="date"
                    size="small"
                    {...register("dateOfBirth", { required: false })}
                    name="dateOfBirth"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel
                    sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                    error={!!errors?.idNumber}
                  >
                    {t("employee.id_number")}
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    {...register("idNumber", { required: true })}
                    name="idNumber"
                    error={!!errors?.idNumber}
                  />
                  {errors?.idNumber?.type === "required" && (
                    <Typography color="error" p={1}>
                      {t("employee.id_number_is_require")}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t("employee.job_title")}
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    {...register("jobTitle", { required: false })}
                    name="jobTitle"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t("employee.start_date")}
                  </InputLabel>
                  <TextField
                    fullWidth
                    type="date"
                    size="small"
                    {...register("startDate", { required: false })}
                    name="startDate"
                  />
                </Grid>
                <Grid item xs={8}>
                  <InputLabel
                    sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                    required
                  >
                    {t("employee.salary_amount")}
                  </InputLabel>

                  <TextField
                    fullWidth
                    type="number"
                    size="small"
                    {...register("amount", { required: false })}
                    name="amount"
                  />
                </Grid>
                <Grid item xs={4}>
                  <InputLabel
                    sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                    required
                  >
                    {t("employee.currency")}
                  </InputLabel>
                  <UserCurrenciesComponent required={false} />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t("employee.phone_number")}
                  </InputLabel>
                  <TextField
                    fullWidth
                    type="number"
                    size="small"
                    {...register("contactNumber", { required: false })}
                    name="contactNumber"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t("employee.email")}
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    {...register("email", { required: false })}
                    name="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel
                    sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                    error={!!errors?.address}
                  >
                    {t("employee.address")}
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    {...register("address", { required: false })}
                    name="address"
                    error={!!errors?.address}
                  />
                  {errors?.address && (
                    <Typography color="error" p={1}>
                      {t("employee.address_is_require")}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions
            sx={{ display: "flex", justifyContent: "end", columnGap: "1rem" }}
          >
            <Button variant="outlined" onClick={handleOpenDialogFunction}>
              {t("employee.cancel")}
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={handleSubmit(onSubmitFunction)}
              loading={isLoading}
            >
              {t("employee.save")}
            </Button>
          </DialogActions>
        </Dialog>

        <Box>
          <IconButton onClick={handleOpenDialogFunction}>
            <Edit size={20} color={theme.palette.primary.contrastText} />
          </IconButton>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default UpdateEmployee;
