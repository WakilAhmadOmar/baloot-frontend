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

interface IPropsCreateCustomer {
  t: any;
}
const CreateCustomer: React.FC<IPropsCreateCustomer> = ({
 
  t,
}) => {
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
        message: t?.pages?.Customers?.customer_saved_successfully,
        status: "success",
        })
        setOpenDialog(false)
      },
      onError: (error:any) => {
        setHandleError({
        open: true,
        message: error.message,
        status: "error",
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
          <Typography>{t?.pages?.Customers?.add_new_customer}</Typography>
          <IconButton size="medium" onClick={handleOpenDialogFunction}>
            <CloseSquare />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <Grid container spacing={2} sx={{mt:"1rem"}}>
              <Grid item xs={12}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t?.pages?.Customers?.customer_name}
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  {...register("fullName", { required: true })}
                  name="fullName"
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t?.pages?.Customers?.contact_number}
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
                  {t?.pages?.Customers?.address}
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
            {t?.pages?.Customers?.save}
          </Button>
          <Button variant="outlined" onClick={handleOpenDialogFunction}>
            {t?.pages?.Customers?.cancel}
          </Button>
        </DialogActions>
      </Dialog>

        
    
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialogFunction}
          >
            {t?.pages?.Customers?.add_new_customer}
          </Button>
        </Box>
    
    </FormProvider>
  );
};

export default CreateCustomer;
