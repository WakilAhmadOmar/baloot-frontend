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
import UserCurrenciesComponent from "@/components/Auto/currencyAutoComplete";

import { AppContext } from "@/provider/appContext";
import { useUpdatePartnerMutation } from "@/hooks/api/definitions/partner/mutations/use-update-mutation";
import { useTranslations } from "next-intl";

interface IPropsCreateProduct {
  item: any;
}
const UpdatePartner: React.FC<IPropsCreateProduct> = ({ item }) => {
  const t = useTranslations("pages");
  const methods = useForm({
    defaultValues: {
      firstName: item?.firstName,
      lastName: item?.lastName,
      invest: item?.invest?.amount,
      currencyId: item?.invest?.currencyId?._id,
      contactNumber: item?.contactNumber,
    },
  });
  const { mutate, isLoading } = useUpdatePartnerMutation();
  const { setHandleError } = useContext(AppContext);
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
      partnerId: item?._id,
      partnerObject: {
        firstName: data?.firstName,
        ...(data?.lastName ? { lastName: data?.lastName } : {}),
        ...(data?.contactNumber ? { contactNumber: data?.contactNumber } : {}),
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

    mutate(variables, {
      onSuccess: () => {
        setHandleError({
          open: true,
          status: "success",
          message: t("partner.this_partner_updated_successfully"),
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
    <Box>
      <FormProvider {...methods}>
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
            <Typography variant="button">
              {t("partner.new_partner_details")}
            </Typography>
            <IconButton size="medium" onClick={handleOpenDialogFunction}>
              <CloseSquare size={20} color="gray" />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmitFunction)}>
              <Grid container spacing={2} mt={"1rem"} sx={{ mt: "1rem" }}>
                <Grid item md={6} xs={12}>
                  <InputLabel
                    sx={{ paddingBottom: "5px" }}
                    required
                    error={!!errors?.firstName}
                  >
                    <Typography variant="subtitle2" component={"samp"}>
                      {" "}
                      {t("partner.first_name")}
                    </Typography>
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    {...register("firstName", { required: true })}
                    name="firstName"
                    error={!!errors?.firstName}
                  />
                  {errors?.firstName?.type === "required" && (
                    <Typography color="error" p={1}>
                      {t("partner.partner_name_is_require")}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t("partner.last_name")}
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
                    {t("partner.investment_amount")}
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
                    {t("partner.currency")}
                  </InputLabel>
                  <UserCurrenciesComponent name="currencyId" dir={t("dir")} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <InputLabel
                    sx={{ marginTop: "1.5rem", paddingBottom: "5px" }}
                  >
                    {t("partner.phone_number")}
                  </InputLabel>
                  <TextField
                    type="number"
                    fullWidth
                    size="small"
                    {...register("contactNumber", { required: false })}
                    name="contactNumber"
                  />
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions
            sx={{ display: "flex", justifyContent: "end", columnGap: "1rem" }}
          >
            <Button variant="outlined" onClick={handleOpenDialogFunction}>
              {t("partner.cancel")}
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={handleSubmit(onSubmitFunction)}
              loading={isLoading}
            >
              {t("partner.save")}
            </Button>
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

export default UpdatePartner;
