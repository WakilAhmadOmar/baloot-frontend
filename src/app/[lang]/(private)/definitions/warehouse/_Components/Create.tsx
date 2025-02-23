import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    TextField,
    Typography,
    useTheme,
    Grid,
    InputLabel,
    Select,
    Chip,
    MenuItem,
  } from "@mui/material";
  import { CloseSquare } from "iconsax-react";
  import { useEffect, useState } from "react";
  import { useForm } from "react-hook-form";

  import { useApolloClient } from "@apollo/client";
  import SnackbarComponent from "@/components/snackbarComponent";
  import CircularProgressComponent from "@/components/loader/CircularProgressComponent";
  import { ADD_ENTREPOT } from "@/graphql/mutation/ADD_ENTREPOT";
  import { UPDATE_ENTREPOT } from "@/graphql/mutation/UPDATE_ENTREPOT";
  import EmployeeAutoCompleteComponent from "@/components/Auto/EmployeeAutoComplete";
  import EmptyPage from "@/components/util/emptyPage";
  import { EmptyProductPageIcon } from "@/icons";
  
  interface IPropsCreateWarehouse {
    getProuctCreated: (product: any) => void;
    isUpdate: boolean;
    item?: any;
    getProductUpdated?: (product: any) => void;
    canceleUpdageProduct?: () => void;
    isEmpty?: boolean;
    t:any
  }
  
  const CreateWarehouse: React.FC<IPropsCreateWarehouse> = ({
    getProuctCreated,
    isUpdate,
    canceleUpdageProduct,
    getProductUpdated,
    isEmpty,
    item,
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
    const [selectedUnitProduct, setSelectedUnitProduct] = useState<any[]>([]);
    const [employeeState, setEmployeeState] = useState<any>(null);
  
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

        setValue("name", item?.name);
        setSelectedUnitProduct(
          item?.measures?.map((item: any) => {
            setValue("boughtPrice " + item?.measure?.name, item?.boughtPrice);
            setValue("salePrice " + item?.measure?.name, item?.salePrice);
            return {
              measure: item?.measure?._id,
              name: item?.measure?.name,
              boughtPrice: item?.boughtPrice,
              salePrice: item?.salePrice,
            };
          })
        );
        setValue("category", item?.category?._id);
        setValue("expirationDate", item?.expirationDate);
        setValue("barcode", item?.barcode);
        setValue("amount", item?.amount);
        setValue(
          "isNewProduct",
          item?.isNewProduct ? "newProduct" : "oldProduct"
        );
        setValue("currencyId", item?.currencyId?._id);
      }
      if (isUpdate) {
        setOpenDialog(isUpdate);
      }
    }, [item?._id, isUpdate]);
    const onSubmitFunction = async (data: any) => {
      const variables = {
        ...(isUpdate ? { entrepotId: item?._id } : {}),
        entrepotObject: {
          name: data?.name,
          address: data?.address,
          responsible: employeeState?._id,
        },
      };

  
      try {
        setLoadingPage(true);
        if (isUpdate) {
          const {
            data: { updateEntrepot },
          } = await cleint.mutate({
            mutation: UPDATE_ENTREPOT,
            variables,
          });
          if (updateEntrepot?.message && getProductUpdated) {
            getProductUpdated(updateEntrepot);
            setLoadingPage(false);
            setOpenDialog(false);
          }
        } else {
          const {
            data: { addEntrepot },
          } = await cleint.mutate({
            mutation: ADD_ENTREPOT,
            variables,
          });

          if (addEntrepot?._id) {
            getProuctCreated(addEntrepot);
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
  
    const handleGetEmployeeFunction = (data: any) => {
      setEmployeeState(data);
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
            <Typography>  {t?.pages?.warehouse?.add_warehouse}</Typography>
            <IconButton size="medium" onClick={handleOpenDialogFunction}>
              <CloseSquare />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmitFunction)}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t?.pages?.warehouse?.warehouse}
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    {...register("name", { required: true })}
                    name="name"
                  />
                </Grid>

                <Grid item xs={6}>
                  <InputLabel
                    sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                    required
                  >
                    {t?.pages?.warehouse?.warehouse_responsible}
                  </InputLabel>
                  <EmployeeAutoCompleteComponent
                    register={register}
                    name="employeeId"
                    getValue={handleGetEmployeeFunction}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                     {t?.pages?.warehouse?.address}
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
              {t?.pages?.warehouse?.save}
            </Button>
            <Button variant="outlined" onClick={handleOpenDialogFunction}>
              {t?.pages?.warehouse?.cancel}
            </Button>
          </DialogActions>
        </Dialog>
  
        {isEmpty ? (
          <Box className={"empty_page_content"}>
            <EmptyPage
              icon={<EmptyProductPageIcon />}
              buttonText={t?.pages?.warehouse?.add_warehouse}
              discription={t?.pages?.warehouse?.no_warehouse}
              onClick={handleOpenDialogFunction}
              title={t?.pages?.warehouse?.no_warehouse_registered}
            />
          </Box>
        ) : (
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenDialogFunction}
            >
              {t?.pages?.warehouse?.add_warehouse}
            </Button>
          </Box>
        )}
      </Box>
    );
  };
  
  export default CreateWarehouse;
  