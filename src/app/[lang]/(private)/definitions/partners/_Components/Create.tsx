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
  import SnackbarComponent from "@/components/snackbarComponent";
  import { useApolloClient } from "@apollo/client";
  import UserCurrenciesComponent from "@/components/Auto/currencyAutoComplete";
  import CircularProgressComponent from "@/components/loader/CircularProgressComponent";
  import EmptyPage from "@/components/util/emptyPage";
  import { EmptyProductPageIcon } from "@/icons";
  import { ADD_PARTNER } from "@/graphql/mutation/ADD_PARTNER";
  import { UPDATE_PARTNER } from "@/graphql/mutation/UPDATE_PARTNER";
  
  interface IPropsCreateProduct {
    getProuctCreated: (product: any) => void;
    isUpdate: boolean;
    item?: any;
    getProductUpdated?: (product: any) => void;
    canceleUpdageProduct?: () => void;
    isEmptyPage?: boolean;
    t:any
  }
  const CreatePartner: React.FC<IPropsCreateProduct> = ({
    getProuctCreated,
    isUpdate,
    item,
    getProductUpdated,
    canceleUpdageProduct,
    isEmptyPage,
    t
  }) => {
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
      getValues,
      setValue,
      getFieldState,
    } = useForm();
    const theme = useTheme();
    const cleint = useApolloClient();
    const [openDialog, setOpenDialog] = useState(isUpdate);
    const [loadingPage, setLoadingPage] = useState(false);
  
    const [handleError, setHandleError] = useState<{
      status: "success" | "info" | "warning" | "error";
      open: boolean;
      message: string;
    }>({
      status: "success",
      open: false,
      message: "",
    });
  
    const handleOpenDialogFunction = () => {
      setOpenDialog(!openDialog);
      if (canceleUpdageProduct) {
        canceleUpdageProduct();
      }
    };
  
    useEffect(() => {
      if (item?._id) {

        setValue("firstName", item?.firstName);
        setValue("lastName", item?.lastName);
        setValue("amount", item?.invest?.amount);
        setValue("currencyId", item?.invest?.currencyId?._id);
        setValue("investPercentage", item?.investPercentage);
        setValue("phoneNumber", item?.phoneNumber);
      }
      if (isUpdate) {
        setOpenDialog(isUpdate);
      }
    }, [item?._id, isUpdate]);
    const onSubmitFunction = async (data: any) => {
      const variables = {
        ...(isUpdate ? { partnerId: item?._id } : {}),
        partnerObject: {
          firstName: data?.firstName,
          lastName: data?.lastName,
          phoneNumber: data?.phoneNumber,
          investPercentage: data?.investPercentage,
          invest: {
            amount: parseFloat(data?.amount),
            currencyId: data?.currencyId,
          },
        },
      };
  
      try {
        setLoadingPage(true);
        if (isUpdate) {
          const {
            data: { updatePartner },
          } = await cleint.mutate({
            mutation: UPDATE_PARTNER,
            variables,
          });
          if (updatePartner?._id && getProductUpdated) {
            getProductUpdated(updatePartner);
            setLoadingPage(false);
            setOpenDialog(false);
          }
        } else {
          const {
            data: { addPartner },
          } = await cleint.mutate({
            mutation: ADD_PARTNER,
            variables,
          });
          if (addPartner?._id) {
            getProuctCreated(addPartner);
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
        {loadingPage && <CircularProgressComponent />}
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
            <Typography variant="button">{t?.pages?.partner?.new_partner_details}</Typography>
            <IconButton size="medium" onClick={handleOpenDialogFunction}>
              <CloseSquare />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmitFunction)}>
              <Grid container spacing={2}>
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
                    {...register("amount", { required: true })}
                    name="amount"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <UserCurrenciesComponent
                    register={register}
                    defaultValue={item?.invest?.currencyId?._id}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t?.pages?.partner?.investment_percentage}
                  </InputLabel>
                  <TextField
                    fullWidth
                    type="number"
                    size="small"
                    {...register("investPercentage", { required: false })}
                    name="investPercentage"
                  />
                </Grid>
  
                <Grid item xs={12} md={6}>
                  <InputLabel sx={{ marginTop: "1.5rem", paddingBottom: "5px" }}>
                  {t?.pages?.partner?.phone_number}
                  </InputLabel>
                  <TextField
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
            sx={{ display: "flex", justifyContent: "start", columnGap: "1rem" }}
          >
            <Button
              color="primary"
              variant="contained"
              onClick={handleSubmit(onSubmitFunction)}
            >
              {t?.pages?.partner?.save}
            </Button>
            <Button variant="outlined" onClick={handleOpenDialogFunction}>
              {t?.pages?.partner}
            </Button>
          </DialogActions>
        </Dialog>
        {isEmptyPage ? (
          <Box className={"empty_page_content"}>
            <EmptyPage
              icon={<EmptyProductPageIcon />}
              title={t.pages?.partner.no_partner_yet_title}
              discription={t.pages?.partner.no_partner_yet_description}
              buttonText={t.pages?.partner.add_new_partner_button}
              onClick={handleOpenDialogFunction}
            />
          </Box>
        ) : (
          <Box>
            {isUpdate === false && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenDialogFunction}
              >
               {t.pages?.partner?.add_new_partner}
              </Button>
            )}
          </Box>
        )}
      </Box>
    );
  };
  
  export default CreatePartner;
  