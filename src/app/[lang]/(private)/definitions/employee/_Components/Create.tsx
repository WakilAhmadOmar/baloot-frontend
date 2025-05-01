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
//   import UploadComponent from "../muiComponent/uploadComponent";
import UserCurrenciesComponent from "@/components/Auto/currencyAutoComplete";
import SnackbarComponent from "@/components/snackbarComponent";
import CircularProgressComponent from "@/components/loader/CircularProgressComponent";
import { useApolloClient } from "@apollo/client";
import { ADD_EMPLOYEE } from "@/graphql/mutation/ADD_EMPLOYEE";
import { UPDATE_EMPLOYEE } from "@/graphql/mutation/UPDATE_EMPLOYEE";
import EmptyPage from "@/components/util/emptyPage";
import { EmptyProductPageIcon } from "@/icons";

interface IPropsCreateEmployee {
  getProuctCreated: (product: any) => void;
  isUpdate: boolean;
  item?: any;
  getProductUpdated?: (product: any) => void;
  canceleUpdageProduct?: () => void;
  isEmptyPage: boolean;
  t: any;
}
const CreateEmployee: React.FC<IPropsCreateEmployee> = ({
  getProuctCreated,
  isUpdate,
  canceleUpdageProduct,
  getProductUpdated,
  item,
  isEmptyPage,
  t,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const theme = useTheme();

  const cleint = useApolloClient();
  const [loadingPage, setLoadingPage] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [handleError, setHandleError] = useState<{
    status: "success" | "info" | "warning" | "error";
    open: boolean;
    message: string;
  }>({
    status: "success",
    open: false,
    message: "",
  });
  const resetForm = () => {
    setValue("name", "");
    setValue("fathersName", "");
    setValue("dateOfBirth", "");
    setValue("idNumber", "");
    setValue("jobTitle", "");
    setValue("startDate", "");
    setValue("amount", "");
    setValue("currencyId", "");
    setValue("phoneNumber", "");
    setValue("email", "");
    setValue("address", "");
  };
  const handleOpenDialogFunction = () => {
    resetForm();
    setOpenDialog(!openDialog);
  };
  useEffect(() => {
    if (item?._id) {
      setValue("name", item?.name);
      setValue("fathersName", item?.fathersName);
      setValue("dateOfBirth", item?.dateOfBirth.slice(0, 10));
      setValue("idNumber", item?.idNumber);
      setValue("jobTitle", item?.jobTitle);
      setValue("startDate", item?.startDate.slice(0, 10));
      setValue("amount", item?.salary?.amount);
      setValue("currencyId", item?.salary?.currencyId?._id);
      setValue("phoneNumber", item?.phoneNumber);
      setValue("email", item?.email);
      setValue("address", item?.address);
    }
    if (isUpdate) {
      setOpenDialog(isUpdate);
    }
  }, [item?._id, isUpdate]);
  const onSubmitFunction = async (data: any) => {
    // "employeeObject": {
    // "address": null,
    // "credit": [
    //   {
    //     "amount": null,
    //     "creditType": null,
    //     "currencyId": null
    //   }
    // ],
    // "dateOfBirth": null,
    // "email": null,
    // "fathersName": null,
    // "idNumber": null,
    // "image": null,
    // "jobTitle": null,
    // "name": null,
    // "phoneNumber": null,
    // "salary": {
    //   "amount": null,
    //   "currencyId": null
    // },
    // "startDate": null
    // }
    const variables = {
      ...(isUpdate ? { employeeId: item?._id } : {}),
      employeeObject: {
        idNumber: data?.idNumber,
        ...(data?.address ? { address: data?.address } : {}),
        ...(data?.dateOfBirth ? { dateOfBirth: data?.dateOfBirth } : {}),
        ...(data?.email ? { email: data?.email } : {}),
        ...(data?.fathersName ? { fathersName: data?.fathersName } : {}),
        ...(data?.jobTitle ? { jobTitle: data?.jobTitle } : {}),
        ...(data?.phoneNumber ? { addrphoneNumberess: data?.phoneNumber } : {}),
        ...(data?.startDate ? { startDate: data?.startDate } : {}),
        ...(data?.name ? { name: data?.name } : {}),

        salary: {
          amount: parseInt(data?.amount) || 0,
          currencyId: data?.currency,
        },
      },
    };
    // delete variables.employeeObject.amount;
    // delete variables.employeeObject.currencyId;

    try {
      setLoadingPage(true);
      if (isUpdate) {
        const {
          data: { updateEmployee },
        } = await cleint.mutate({
          mutation: UPDATE_EMPLOYEE,
          variables,
        });
        if (updateEmployee?._id && getProductUpdated) {
          getProductUpdated(updateEmployee);
          resetForm();
          setLoadingPage(false);
          setOpenDialog(false);
        }
      } else {
        const {
          data: { addEmployee },
        } = await cleint.mutate({
          mutation: ADD_EMPLOYEE,
          variables,
        });
        if (addEmployee?._id) {
          getProuctCreated(addEmployee);
          resetForm();
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
          <Typography>{t?.pages?.employee?.add_new_employee}</Typography>
          <IconButton size="medium" onClick={handleOpenDialogFunction}>
            <CloseSquare />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <Grid container spacing={2} sx={{mt:"1rem"}}>
              {/* <Grid item xs={12}>
                  <Grid container spacing={2}> */}
              {/* <Grid item mt={2} xs={4}>
                      <UploadComponent />
                    </Grid> */}
              {/* </Grid>
                  </Grid> */}
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
                <UserCurrenciesComponent
                  register={register}
                  defaultValue={item?.salary?.currencyId?._id}
                  isRequired={false}
                />
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
            loading={loadingPage}
          >
            {t?.pages?.employee?.save}
          </Button>
          <Button variant="outlined" onClick={handleOpenDialogFunction}>
            {t?.pages?.employee?.cancel}
          </Button>
        </DialogActions>
      </Dialog>
      {isEmptyPage ? (
        <Box className={"empty_page_content"}>
          <EmptyPage
            icon={<EmptyProductPageIcon />}
            title={t.pages?.employee.no_product_yet_title}
            discription={t.pages?.employee.no_product_yet_discription}
            buttonText={t.pages?.employee.add_new_employee}
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
            {t?.pages?.employee?.add_new_employee}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CreateEmployee;
