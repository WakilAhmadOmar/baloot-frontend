"use client"
import { ADD_CATEGORY } from "@/graphql/mutation/ADD_CATEGORY";
import { UPDATE_CATEGORY } from "@/graphql/mutation/UPDATE_CATEGORY";
import { EmptyProductPageIcon } from "@/icons";
import CircularProgressComponent from "@/components/loader/CircularProgressComponent";
import EmptyPage from "@/components/util/emptyPage";
import SnackbarComponent from "@/components/snackbarComponent";
import ListOfUnitsProduct from "@/components/util/ListOfUnitsProduct";
import { getProductCategoriesFunction } from "@/components/util/getProductCategoriesFunction";
import { useApolloClient } from "@apollo/client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputLabel,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { CloseSquare, InfoCircle } from "iconsax-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface IProps {
  t:any
}
const CategoryProductPage:React.FC<IProps> = ({t}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const theme = useTheme();
  const client = useApolloClient();

  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [handleError, setHandleError] = useState<{
    status: "success" | "info" | "warning" | "error";
    open: boolean;
    message: string;
  }>({
    status: "success",
    open: false,
    message: "",
  });

  const [productUnits, setProductUnits] = useState<any[]>([]);
  const [idItemShouldDelete, setIdItemShouldDelete] = useState("");
  const getProudctUnits = async () => {
    setLoadingPage(true);
    const units: any = await getProductCategoriesFunction(client);
    setProductUnits(units?.getCategories);
    setLoadingPage(false);
  };
  useEffect(() => {
    getProudctUnits();
  }, []);
  const handleOpenDialogFunction = () => {
    setValue("categoryId", null);
    setOpenDialog(!openDialog);
  };
  const handleOpenDialogDeleteFunction = () => {
    setOpenDialogDelete(!openDialogDelete);
  };

  const onSubmitFunction = async (data: any) => {
    setLoadingPage(true);
    try {
      const variables = {
        ...data,
      };
      if (data?.categoryId) {
        const {
          data: { updateCategory },
        } = await client.mutate({
          mutation: UPDATE_CATEGORY,
          variables,
        });
        const newState = productUnits?.map((item) => {
          if (item?._id === updateCategory?._id) {
            return {
              ...item,
              name: data?.name,
              description: data?.description,
            };
          } else return item;
        });
        setProductUnits(newState);
        setLoadingPage(false);
        setOpenDialog(false), setValue("categoryId", null);
        setValue("name", null);
        setValue("description", null);
        setHandleError({
          open: true,
          message: "Update successfully",
          status: "success",
        });
      } else {
        const {
          data: { addCategory },
        } = await client.mutate({
          mutation: ADD_CATEGORY,
          variables,
        });
        setProductUnits([variables, ...productUnits]);
        setLoadingPage(false);
        setOpenDialog(false);
      }
    } catch (error: any) {
      setLoadingPage(false);
      setHandleError({
        open: true,
        message: error?.message,
        status: "error",
      });
    }
  };

  const handleEditFunciton = (data: any) => {
    setOpenDialog(true);
    setValue("name", data?.name);
    setValue("categoryId", data?._id);
  };

  const handleDeleteFunction = (id: string) => {
    setOpenDialogDelete(true);
    setIdItemShouldDelete(id);
  };
  const deleteFunction = async () => {
    try {
      // setLoadingPage(true);
      const variables = {};
    } catch (error: any) {
      setLoadingPage(false);
      setHandleError({
        open: true,
        message: error?.message,
        status: "error",
      });
    }
  };

  const handleCloseError = () => {
    setHandleError({
      open: false,
      message: "",
      status: "success",
    });
  };
  return (
    <Box>
      {loadingPage && <CircularProgressComponent />}
      {(productUnits?.length > 0 || loadingPage) && (
        <Typography variant="h3" mb={2}>
          {t?.product?.categories}
        </Typography>
      )}
      <SnackbarComponent
        status={handleError?.status}
        open={handleError?.open}
        message={handleError?.message}
        handleClose={handleCloseError}
      />
      <Dialog
        open={openDialogDelete}
        onClose={handleOpenDialogDeleteFunction}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        dir={t?.home?.dir}
        // fullWidth
      >
        {/* <DialogTitle
          id="alert-dialog-title"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            borderBottom: `1px solid ${theme.palette.grey[200]}`,
          }}
        >
          
        </DialogTitle> */}
        <DialogContent>
          <Box
            display="flex"
            justifyContent={"start"}
            alignItems={"center"}
            columnGap={1}
            mt={1.5}
          >
            <InfoCircle color={theme.palette.warning.main} />
            <Typography variant="h5">
              {t?.product?.Are_you_sure_you_want_to_delete_this_category}
            </Typography>
          </Box>
          <Box pt={1} sx={{ paddingInlineStart: "3rem" }}>
            <Typography variant="body1">
              {t?.product?.Once_this_category_is_deleted_you_will_no_longer_have_access_to_it}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "end", columnGap: "1rem" }}
        >
          <Button variant="outlined" onClick={handleOpenDialogDeleteFunction}>
            {t?.product?.cancel}
          </Button>
          <Button color="primary" variant="contained" onClick={deleteFunction}>
            {t?.product?.yes}
          </Button>
        </DialogActions>
      </Dialog>
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
          <Typography variant="button">{t?.product?.new_category}</Typography>
          <IconButton size="medium" onClick={handleOpenDialogFunction}>
            <CloseSquare />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel
                  sx={{ paddingBottom: "5px", marginTop: "10px" }}
                  required
                >
                  {t?.product?.category_name}
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  {...register("name", { required: true })}
                  name="name"
                />
                {errors?.name?.type === "required" && (
                  <Typography color="error" p={1}>
                    نام دسته بندی حتمی است
                  </Typography>
                )}
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
            {t?.product?.save}
          </Button>
          <Button variant="outlined" onClick={handleOpenDialogFunction}>
            {t?.product?.cancel}
          </Button>
        </DialogActions>
      </Dialog>
      {!loadingPage && productUnits?.length === 0 ? (
        <Box className={"empty_page_content"}>
          <EmptyPage
            icon={<EmptyProductPageIcon />}
            title={t.product.no_product_yet_title_category}
            discription={t.product.no_product_yet_discription_category}
            buttonText={t.product.add_new_category}
            onClick={handleOpenDialogFunction}
          />
        </Box>
      ) : (
        <Box
          display={"grid"}
          gridTemplateColumns={"auto 30%"}
          justifyContent={"space-between"}
          mb={2}
        >
          <Button variant="contained" onClick={handleOpenDialogFunction}>
            {" "}
            {t?.product?.add_new_category}
          </Button>

          {/* <CustomSearch /> */}
        </Box>
      )}
      <Box display={"flex"} flexWrap={"wrap"} columnGap={2} rowGap={2}>
        {productUnits?.map((item) => {
          return (
            <Box key={item?._id} display={"grid"} >
              <ListOfUnitsProduct
                item={item}
                canDelete={false}
                onEdit={handleEditFunciton}
                onDelete={handleDeleteFunction}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default CategoryProductPage;
