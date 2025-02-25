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
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
//   import UploadComponent from "../muiComponent/uploadComponent";
import SnackbarComponent from "@/components/snackbarComponent";
import { useApolloClient } from "@apollo/client";
import UserCurrenciesComponent from "@/components/Auto/currencyAutoComplete";
import { ADD_PRODUCT } from "@/graphql/mutation/ADD_PRODUCT";
import CircularProgressComponent from "@/components/loader/CircularProgressComponent";
import { UPDATE_PRODUCT } from "@/graphql/mutation/UPDATE_PRODUCT";
import EmptyPage from "@/components/util/emptyPage";
import { EmptyProductPageIcon } from "@/icons";
import ProductCategoriesComponent from "@/components/util/ProductCategory";
import ProductMeansureComponent from "@/components/util/ProductMeansure";

interface IPropsCreateProduct {
  getProuctCreated: (product: any) => void;
  isUpdate: boolean;
  item?: any;
  getProductUpdated?: (product: any) => void;
  canceleUpdageProduct?: () => void;
  isEmptyPage?: boolean;
  t: any;
}
const CreateProduct: React.FC<IPropsCreateProduct> = ({
  getProuctCreated,
  isUpdate,
  item,
  getProductUpdated,
  canceleUpdageProduct,
  isEmptyPage,
  t,
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
      setSelectedUnitProduct(
        item?.measures?.map((it: any) => {
          setValue("buyPrice " + it?.measureId?.name, it?.buyPrice);
          setValue("sellPrice " + it?.measureId?.name, it?.sellPrice);
          return {
            measure: it?.measureId?._id,
            name: it?.measureId?.name,
            boughtPrice: it?.boughtPrice,
            sellPrice: it?.sellPrice,
          };
        })
      );
      setValue("category", item?.category?._id);
      setValue("expirationDate", item?.expirationDate?.slice(0, 10));
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
      ...(isUpdate ? { productId: item?._id } : {}),
      productObject: {
        name: data?.name,
        measures: selectedUnitProduct?.map((item, index: number) => {
          return {
            measureId: item?.measure,
            buyPrice: parseInt(item?.buyPrice),
            sellPrice: parseInt(item?.sellPrice),
            // measureSize:
            //   index === 0 ? "Large" : index === 1 ? "Medium" : "Small",
          };
        }),
        ...(selectedUnitProduct?.length > 1
          ? {
              measuresExchange: selectedUnitProduct
                ?.map((item, index: number) => {
                  if (index === 0) return null;
                  let amountMeasure = 1;
                  selectedUnitProduct
                    ?.filter((i, ind) => ind >= index)
                    .forEach((ite, indexdata) => {
                      amountMeasure =
                        amountMeasure *
                        parseInt(data?.["measure" + (index + indexdata)]);
                    });
                  return {
                    powerMeasureId: selectedUnitProduct[index - 1]?.measure,
                    powerMeasureAmount: 1,
                    baseMeasureId:
                      selectedUnitProduct[selectedUnitProduct?.length - 1]
                        .measure,
                    baseMeasureAmount: amountMeasure,
                  };
                })
                .filter((item) => item !== null),
            }
          : {}),
        category: data?.category,
        ...(data?.expirationDate
          ? { expirationDate: data?.expirationDate }
          : {}),
        ...(data?.barcode ? { barcode: data?.barcode } : {}),
        // isNewProduct: data?.isNewProduct === "newProduct",
        currencyId: data?.currencyId,
        baseMeasureAmount: 10,
      },
    };
    try {
      setLoadingPage(true);
      if (isUpdate) {
        const {
          data: { updateProduct },
        } = await cleint.mutate({
          mutation: UPDATE_PRODUCT,
          variables,
        });
        if (updateProduct?._id && getProductUpdated) {
          getProductUpdated(updateProduct);
          setLoadingPage(false);
          setOpenDialog(false);
        }
      } else {
        const {
          data: { addProduct },
        } = await cleint.mutate({
          mutation: ADD_PRODUCT,
          variables,
        });
        if (addProduct?._id) {
          setValue("name", "");
          setValue("category", "");
          setValue("expirationDate", "");
          setValue("barcode", "");
          setValue("isNewProduct", "newProduct");
          setSelectedUnitProduct([]);
          getProuctCreated(addProduct);
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
  const handleGetMeasureFunction = (data: any[]) => {
    setSelectedUnitProduct(data);
  };

  const handleCloseError = () => {
    setHandleError((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  const handleChangePriceMeasureFunction = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event?.currentTarget?.value;
    const id = parseInt(event?.currentTarget?.id);
    const name = event?.currentTarget?.name;
    const newState = selectedUnitProduct?.map((item: any, index) => {
      if (index === id) {
        if (name?.split(" ")?.[0] === "buyPrice") {
          return {
            ...item,
            buyPrice: value,
          };
        } else {
          return {
            ...item,
            sellPrice: value,
          };
        }
      } else return item;
    });
    setSelectedUnitProduct(newState);
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
          <Typography variant="button">{t?.product?.create_title} </Typography>
          <IconButton size="medium" onClick={handleOpenDialogFunction}>
            <CloseSquare />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item mt={2} xs={4}>
                    {/* <UploadComponent /> */}
                  </Grid>
                  <Grid item mt={2} xs={8}>
                    <InputLabel sx={{ paddingBottom: "5px" }} required>
                      <Typography variant="subtitle2" component={"samp"}>
                        {t?.product?.product_name}
                      </Typography>
                    </InputLabel>
                    <TextField
                      fullWidth
                      size="small"
                      {...register("name", { required: true })}
                      name="name"
                    />
                    <ProductMeansureComponent
                      register={register}
                      getDataSelect={handleGetMeasureFunction}
                      defaultValue={selectedUnitProduct}
                      t={t}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {selectedUnitProduct?.length > 1 &&
                selectedUnitProduct?.map((item, index: number) => {
                  if (index === 0) {
                    return null;
                  }
                  return (
                    <Grid item xs={12} md={6} key={item?.name}>
                      <InputLabel
                        sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                      >
                        <Typography component={"span"}>
                          {t?.product?.count}{" "}
                        </Typography>
                        <Typography component={"span"}>
                          {" "}
                          {item?.name}{" "}
                        </Typography>
                        <Typography component={"span"}>
                          {t?.product?.in_one}
                        </Typography>
                        <Typography component={"span"}>
                          {selectedUnitProduct?.[index - 1]?.name}
                        </Typography>
                      </InputLabel>
                      <TextField
                        fullWidth
                        size="small"
                        {...register("measure" + index, {
                          required: true,
                        })}
                        name={"measure" + index}
                        onChange={handleChangePriceMeasureFunction}
                        id={`${index}`}
                      />
                    </Grid>
                  );
                })}
              <Grid item xs={12}>
                {selectedUnitProduct?.length > 0 &&
                  selectedUnitProduct?.map((item: any, index: number) => {
                    return (
                      <Grid container key={item?.measuer} spacing={2}>
                        <Grid item xs={6} key={item}>
                          <InputLabel
                            sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                          >
                            {t?.product?.bought_price} {item?.name}
                          </InputLabel>
                          <TextField
                            fullWidth
                            size="small"
                            {...register("buyPrice " + item?.name, {
                              required: true,
                            })}
                            name={"buyPrice " + item?.name}
                            onChange={handleChangePriceMeasureFunction}
                            id={`${index}`}
                          />
                        </Grid>
                        <Grid item xs={6} key={item?.measuer}>
                          <InputLabel
                            sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                          >
                            {t?.product?.sale_price} {item?.name}
                          </InputLabel>
                          <TextField
                            fullWidth
                            size="small"
                            {...register("sellPrice " + item?.name, {
                              required: true,
                            })}
                            onChange={handleChangePriceMeasureFunction}
                            name={"sellPrice " + item?.name}
                            id={`${index}`}
                          />
                        </Grid>
                      </Grid>
                    );
                  })}
              </Grid>
              <Grid item xs={12} md={6}>
              <InputLabel sx={{ marginTop: "1.1rem", paddingBottom: "5px" }}>
                  {t?.product?.currency}
                </InputLabel>
                <UserCurrenciesComponent
                  register={register}
                  defaultValue={item?.currencyId?._id}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <ProductCategoriesComponent
                  register={register}
                  defaultValue={item?.category?._id}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t?.product?.expirationDate}
                </InputLabel>
                <TextField
                  fullWidth
                  type="date"
                  size="small"
                  defaultValue={item?.expirationDate?.slice(0, 10)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("expirationDate", { required: false })}
                  name="expirationDate"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel sx={{ marginTop: "1.5rem", paddingBottom: "5px" }}>
                  {t?.product?.product_code}
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  {...register("barcode", { required: false })}
                  name="barcode"
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
            {t?.product?.save}
          </Button>
          <Button variant="outlined" onClick={handleOpenDialogFunction}>
            {t?.product?.cancel}
          </Button>
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
          {isUpdate === false && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenDialogFunction}
            >
              {t?.product?.add_new_product}
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default CreateProduct;
