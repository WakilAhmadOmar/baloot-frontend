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

interface IPropsCreateEmployee {
  t: any;
  item: any;
}
const UpdateEmployee: React.FC<IPropsCreateEmployee> = ({ t, item }) => {
  const method = useForm({
    defaultValues: {
      name: item?.name,
      fathersName: item?.fathersName,
      dateOfBirth: item?.dateOfBirth,
      idNumber: item?.idNumber,
      jobTitle: item?.jobTitle,
      startDate: item?.startDate,
      amount: item?.salary?.amount,
      phoneNumber: item?.phoneNumber,
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
        ...(data?.phoneNumber ? { phoneNumber: data?.phoneNumber } : {}),
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
          message: t?.pages?.employee?.employee_updated_successfully,
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
            <Typography>{t?.pages?.employee?.add_new_employee}</Typography>
            <IconButton size="medium" onClick={handleOpenDialogFunction}>
              <CloseSquare />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmitFunction)}>
              <Grid container spacing={2} sx={{ mt: "1rem" }}>
                <Grid item mt={2} xs={6}>
                  <InputLabel sx={{ paddingBottom: "5px" }} required>
                    {t?.pages?.employee?.name}
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    {...register("name", { required: true })}
                    name="name"
                  />
                </Grid>
                <Grid item mt={2} xs={6}>
                  <InputLabel sx={{ paddingBottom: "5px" }}>
                    {t?.pages?.employee?.fathers_name}
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
                    {t?.pages?.employee?.date_of_birth}
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
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    نمبر تذکره{t?.pages?.employee?.id_number}
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    {...register("idNumber", { required: true })}
                    name="idNumber"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t?.pages?.employee?.job_title}
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
                    {t?.pages?.employee?.start_date}
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
                    {t?.pages?.employee?.salary_amount}
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
                    {t?.pages?.employee?.currency}
                  </InputLabel>
                  <UserCurrenciesComponent />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t?.pages?.employee?.phone_number}
                  </InputLabel>
                  <TextField
                    fullWidth
                    type="number"
                    size="small"
                    {...register("phoneNumber", { required: false })}
                    name="phoneNumber"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t?.pages?.employee?.email}
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    {...register("email", { required: false })}
                    name="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t?.pages?.employee?.address}
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
              {t?.pages?.employee?.save}
            </Button>
            <Button variant="outlined" onClick={handleOpenDialogFunction}>
              {t?.pages?.employee?.cancel}
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
