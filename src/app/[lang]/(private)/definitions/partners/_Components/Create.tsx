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
import { CloseSquare } from "iconsax-react";
import { useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import UserCurrenciesComponent from "@/components/Auto/currencyAutoComplete";

import { useAddPartnerMutation } from "@/hooks/api/definitions/partner/mutations/use-add-mutation";
import { AppContext } from "@/provider/appContext";

interface IPropsCreateProduct {
  t: any;
}
const CreatePartner: React.FC<IPropsCreateProduct> = ({
  t,
}) => {
  const methods = useForm();
  const {mutate , isLoading } = useAddPartnerMutation()
  const {setHandleError} = useContext(AppContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);



  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
  };


  const onSubmitFunction = async (data: any) => {
    const variables = {
      partnerObject: {
        firstName: data?.firstName,
        ...(data?.lastName ? { lastName: data?.lastName } : {}),
        ...(data?.phoneNumber ? { phoneNumber: data?.phoneNumber } : {}),
        phoneNumber: data?.phoneNumber,

        ...(data?.invest
          ? {
              invest: {
                amount: parseFloat(data?.invest),
                currencyId: data?.currencyId,
              },
            }
          : {}),
      },
    };

    mutate(variables , {
      onSuccess:() =>{
        setHandleError({
          open:true,
          type:"success",
          message:t?.pages?.partner?.this_partner_saved_successfully
        })
        handleOpenDialogFunction()
      },
      onError: (error:any)=> {
        setHandleError({
        open: true,
        message: error.message,
        status: "error",
      });
      }
    })
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
            <Typography variant="button">
              {t?.pages?.partner?.new_partner_details}
            </Typography>
            <IconButton size="medium" onClick={handleOpenDialogFunction}>
              <CloseSquare />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmitFunction)}>
              <Grid container spacing={2} mt={"1rem"} sx={{ mt: "1rem" }}>
                <Grid item md={6} xs={12}>
                  <InputLabel sx={{ paddingBottom: "5px" }} required>
                    <Typography variant="subtitle2" component={"samp"}>
                      {" "}
                      {t?.pages?.partner?.first_name}
                    </Typography>
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    {...register("firstName", { required: true })}
                    name="firstName"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t?.pages?.partner?.last_name}
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    {...register("lastName", { required: false })}
                    name="lastName"
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <InputLabel
                    sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                    required
                  >
                    {t?.pages?.partner?.investment_amount}
                  </InputLabel>
                  <TextField
                    fullWidth
                    type="number"
                    size="small"
                    {...register("invest", { required: false })}
                    name="invest"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <InputLabel
                    sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                    required
                  >
                    {t?.pages?.partner?.currency}
                  </InputLabel>
                  <UserCurrenciesComponent
                    name="currencyId"
                    dir={t?.home?.dir}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <InputLabel
                    sx={{ marginTop: "1.5rem", paddingBottom: "5px" }}
                  >
                    {t?.pages?.partner?.phone_number}
                  </InputLabel>
                  <TextField
                    type="number"
                    fullWidth
                    size="small"
                    {...register("phoneNumber", { required: false })}
                    name="phoneNumber"
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
              {t?.pages?.partner?.save}
            </Button>
            <Button variant="outlined" onClick={handleOpenDialogFunction}>
              {t?.pages?.partner?.cancel}
            </Button>
          </DialogActions>
        </Dialog>
      </FormProvider>
        <Box>

            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenDialogFunction}
            >
              {t.pages?.partner?.add_new_partner}
            </Button>

        </Box>

    </Box>
  );
};

export default CreatePartner;
