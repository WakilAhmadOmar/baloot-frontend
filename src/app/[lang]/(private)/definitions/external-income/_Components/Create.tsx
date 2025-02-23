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
  import CircularProgressComponent from "@/components/loader/CircularProgressComponent";
  import SnackbarComponent from "@/components/snackbarComponent";
  import EmptyPage from "@/components/util/emptyPage";
  import { EmptyProductPageIcon } from "@/icons";
  import { UPDATE_EXTERNAL_INCOME_TYPE } from "@/graphql/mutation/UPDATE_EXTERNAL_INCOME_TYPE";
  import { ADD_NEW_EXTERNAL_INCOME_TYPE } from "@/graphql/mutation/ADD_NEW_EXTERNAL_INCOME_TYPE";
  
  interface IPropsCreateConsumetion {
    getProuctCreated: (product: any) => void;
    isUpdate: boolean;
    item?: any;
    getProductUpdated?: (product: any) => void;
    canceleUpdageProduct?: () => void;
    isEmptyPage?: boolean;
    t:any
  }
  
  const CreateExternalIncomeType: React.FC<IPropsCreateConsumetion> = ({
    getProuctCreated,
    isUpdate,
    canceleUpdageProduct,
    getProductUpdated,
    isEmptyPage = true,
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
    const [productCategory, setProductCategory] = useState<{
      category: any[];
      page: number;
    }>({
      category: [],
      page: 1,
    });
  
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
      }
      if (isUpdate) {
        setOpenDialog(isUpdate);
      }
    }, [item?._id, isUpdate]);
    const onSubmitFunction = async (data: any) => {
      const variables = {
        ...(isUpdate ? { externalIncomeTypeId: item?._id } : {}),
        name: data?.name,
      };
  
  
      try {
        setLoadingPage(true);
        if (isUpdate) {
          const {
            data: { updateExternalIncometype },
          } = await cleint.mutate({
            mutation: UPDATE_EXTERNAL_INCOME_TYPE,
            variables,
          });
          if (updateExternalIncometype?._id && getProductUpdated) {
            getProductUpdated(updateExternalIncometype);
            setLoadingPage(false);
            setOpenDialog(false);
          }
        } else {
          const {
            data: { addNewExternalIncomeType },
          } = await cleint.mutate({
            mutation: ADD_NEW_EXTERNAL_INCOME_TYPE,
            variables,
          });
          if (addNewExternalIncomeType?._id) {
            getProuctCreated(addNewExternalIncomeType);
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
          dir="rtl"
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
            <Typography>{t?.pages?.income?.new_income}</Typography>
            <IconButton size="medium" onClick={handleOpenDialogFunction}>
              <CloseSquare />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ pt: 36, pb: 5 }}>
            <form onSubmit={handleSubmit(onSubmitFunction)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                    {t?.pages?.income?.income_name}
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    {...register("name", { required: true })}
                    name="name"
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
              {t?.pages?.income?.save}
            </Button>
            <Button variant="outlined">لغو</Button>
          </DialogActions>
        </Dialog>
        {isEmptyPage ? (
          <Box className={"empty_page_content"}>
            <EmptyPage
              icon={<EmptyProductPageIcon />}
              buttonText={t?.pages?.income?.add_new_external_income}
              discription={t?.pages?.income?.no_income_description}
              onClick={handleOpenDialogFunction}
              title={t?.pages?.income?.no_external_income_recorded}
            />
          </Box>
        ) : (
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenDialogFunction}
            >
              {t?.pages?.income?.new_income}
            </Button>
          </Box>
        )}
      </Box>
    );
  };
  
  export default CreateExternalIncomeType;
  