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
  import { useApolloClient } from "@apollo/client";
  import { ADD_CUSTOMER } from "@/graphql/mutation/ADD_CUSTOMER";
  import { UPDATE_CUSTOMER } from "@/graphql/mutation/UPDATE_CUSTOMER";
  import UserCurrenciesComponent from "@/components/Auto/currencyAutoComplete";
  import EmptyPage from "@/components/util/emptyPage";
  import { EmptyProductPageIcon } from "@/icons";
import SelectWithInput from "@/components/search/SelectWIthInput";

  
  interface IPropsCreateCustomer {
    getProuctCreated: (product: any) => void;
    isUpdate: boolean;
    item?: any;
    getProductUpdated?: (product: any) => void;
    canceleUpdageProduct?: () => void;
    isEmptyPage: boolean;
    t:any
  }
  const CreateCustomer: React.FC<IPropsCreateCustomer> = ({
    getProductUpdated,
    item,
    getProuctCreated,
    canceleUpdageProduct,
    isUpdate,
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
  
    const handleOpenDialogFunction = () => {
      setOpenDialog(!openDialog);
    };
    useEffect(() => {
      if (item?._id) {
        setValue("fullName", item?.fullName);
        setValue("fathersName", item?.fathersName);
        setValue("dateOfBirth", item?.dateOfBirth);
        setValue("idNumber", item?.idNumber);
        setValue("jobTitle", item?.jobTitle);
        setValue("startDate", item?.startDate);
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
      const variables = {
        ...(isUpdate ? { customerId: item?._id } : {}),
        customerObject: {
          ...data,
          pastBilling: {
            amount: parseInt(data?.amount),
            currency: data?.currencyId,
            type: data.type,
          },
        },
      };
      delete variables.customerObject.amount;
      delete variables.customerObject.currencyId;
      delete variables.customerObject.type;
      delete variables.customerObject.customerCode;

  
      try {
        setLoadingPage(true);
        if (isUpdate) {
          const {
            data: { updateCustomer },
          } = await cleint.mutate({
            mutation: UPDATE_CUSTOMER,
            variables,
          });
          if (updateCustomer?._id && getProductUpdated) {
            getProductUpdated(updateCustomer);
            setLoadingPage(false);
            setOpenDialog(false);
          }
        } else {
          const {
            data: { addCustomer },
          } = await cleint.mutate({
            mutation: ADD_CUSTOMER,
            variables,
          });
          if (addCustomer?._id) {
            getProuctCreated(addCustomer);
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
              <Grid container spacing={2}>
                <Grid item xs={6}>
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
                <Grid item xs={6}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t?.pages?.Customers?.customer_code}
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    {...register("customerCode", { required: true })}
                    name="customerCode"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t?.pages?.Customers?.contact_number}
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    {...register("contactNumber", { required: true })}
                    name="contactNumber"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t.pages?.Customers?.credit_limit}
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    {...register("credibility", { required: true })}
                    name="credibility"
                  />
                </Grid>
                <Grid item xs={8}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t?.pages?.Customers?.previous_account}
                  </InputLabel>
                  <SelectWithInput
                    selectName="type"
                    register={register}
                    inputName="amount"
                    data={[
                      { name: t?.pages?.Customers?.credit, value: "Credit" },
                      { name: t?.pages?.Customers?.debit, value: "Debit" },
                    ]}
                  />
                </Grid>
                <Grid item xs={4}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t?.pages?.Customers?.currency}
                  </InputLabel>
                  <UserCurrenciesComponent register={register} />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t?.pages?.Customers?.address}
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    {...register("address", { required: true })}
                    name="address"
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
              {t?.pages?.Customers?.save}
            </Button>
            <Button variant="outlined"  onClick={handleOpenDialogFunction}>{t?.pages?.Customers?.cancel}</Button>
          </DialogActions>
        </Dialog>
        {isEmptyPage ? (
          <Box className={"empty_page_content"}>
            <EmptyPage
              icon={<EmptyProductPageIcon />}
              title={t.product.no_product_yet_title}
              discription={t.product.no_product_yet_discription}
              buttonText={t.product.add_new_product}
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
              {t?.pages?.Customers?.add_new_customer}
            </Button>
          </Box>
        )}
      </Box>
    );
  };
  
  export default CreateCustomer;
  