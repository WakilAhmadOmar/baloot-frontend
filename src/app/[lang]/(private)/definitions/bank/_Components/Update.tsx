"use client";
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
import { useAddBankMutation } from "@/hooks/api/definitions/bank/mutations/use-add-mutation";
import { AppContext } from "@/provider/appContext";
import { useUpdateBankMutation } from "@/hooks/api/definitions/bank/mutations/use-update-mutation";

interface IPropsCreateBank {
  t: any;
  item: any;
}

const UpdateBank: React.FC<IPropsCreateBank> = ({ item, t }) => {
  const methods = useForm({
    defaultValues: {
      name: item?.name,
      accountNumber: item?.accountNumber,
      bankPhoneNumber: item?.bankPhoneNumber,
      description: item?.description,
    },
  });
  const { register, handleSubmit } = methods;
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);

  const { setHandleError } = useContext(AppContext);

  const { mutate, isLoading } = useUpdateBankMutation();

  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
  };

  const onSubmitFunction = async (data: any) => {
    const variables = {
        bankId:item?._id,
      bankObject: {
        ...data,
      },
    };

    mutate(variables, {
      onSuccess: () => {
        setHandleError({
          open: true,
          message: t?.pages?.bank?.bank_updated_successfully,
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
      <FormProvider {...methods}>
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
            <Typography>{t?.pages?.bank?.update_Bank_Information}</Typography>
            <IconButton size="medium" onClick={handleOpenDialogFunction}>
              <CloseSquare />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmitFunction)}>
              <Grid container spacing={2} sx={{ mt: "1rem" }}>
                <Grid item xs={6}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t?.pages?.bank?.Bank_Name}
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
                    {t?.pages?.bank?.Account_Number}
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    {...register("accountNumber", { required: false })}
                    name="accountNumber"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t?.pages?.bank?.Bank_Contact_Number}
                  </InputLabel>
                  <TextField
                    fullWidth
                    type="number"
                    size="small"
                    {...register("bankPhoneNumber", { required: false })}
                    name="bankPhoneNumber"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t?.pages?.bank?.description}
                  </InputLabel>
                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    type="text"
                    size="small"
                    {...register("description", { required: false })}
                    name="description"
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
              {t?.pages?.bank?.Save}
            </Button>
            <Button variant="outlined">{t.pages.bank?.Cancel}</Button>
          </DialogActions>
        </Dialog>
      </FormProvider>
      <Box>
        <IconButton onClick={handleOpenDialogFunction}>
          <Edit size={20} color={theme.palette.primary.contrastText} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default UpdateBank;
