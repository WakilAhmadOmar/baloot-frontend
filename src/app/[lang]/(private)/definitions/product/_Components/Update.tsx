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
import { ChangeEvent, useContext, useMemo, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useApolloClient } from "@apollo/client";
import UserCurrenciesComponent from "@/components/Auto/currencyAutoComplete";

import ProductCategoriesComponent from "@/components/util/ProductCategory";
import ProductMeansureComponent from "@/components/util/ProductMeansure";
import { useAddProductMutation } from "@/hooks/api/definitions/product/mutations/use-add-mutation";
import { AppContext } from "@/provider/appContext";
import { useUpdateProductMutation } from "@/hooks/api/definitions/product/mutations/use-update-mutation";
import { useTranslations } from "next-intl";

interface IPropsUpdateProduct {
  product?: any;
}
const UpdateProduct: React.FC<IPropsUpdateProduct> = ({ product }) => {
  const t = useTranslations("product")
  const { mutate: updateProductMutation, isLoading } =
    useUpdateProductMutation();
  const theme = useTheme();

  const defaultValues = useMemo(() => {
    return {
      name: product?.name,
      buyPrice: product?.buyPrice,
      expirationDate: product?.expirationDate?.slice(0, 10),
      barcode: product?.barcode,
      currencyId: product?.currencyId?._id,
    };
  }, [product]);
  const method = useForm<any>({
    defaultValues,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = method;

  const [openDialog, setOpenDialog] = useState(false);

  const defaultMeasure = useMemo(() => {
    return product?.measures?.map((me: any) => ({
      buyPrice: me?.buyPrice,
      measure: me?.measureId?._id,
      name: me?.measureId?.name,
      sellPrice: me?.sellPrice,
    }));
  }, [product]);

  const [selectedUnitProduct, setSelectedUnitProduct] =
    useState<any[]>(defaultMeasure);

  const { setHandleError } = useContext(AppContext);

  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
  };

  const onSubmitFunction = async (data: any) => {
    if (selectedUnitProduct?.length === 0) {
      return setHandleError({
        open: true,
        status: "info",
        message: "please select one Unit",
      });
    }
    const productObject = {
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
      ...(data?.expirationDate ? { expirationDate: data?.expirationDate } : {}),
      ...(data?.barcode ? { barcode: data?.barcode } : {}),
      // isNewProduct: data?.isNewProduct === "newProduct",
      currencyId: data?.currencyId,
      baseMeasureAmount: 10,
    };

    updateProductMutation(
      {
        productId: product?._id,
        productObject,
      },
      {
        onSuccess: () => {
          setHandleError({
            open: true,
            message: t("product_updated_successfully"),
            status: "success",
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
      }
    );
  };
  const handleGetMeasureFunction = (data: any[]) => {
    setSelectedUnitProduct(data);
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
    <FormProvider {...method}>
      <Dialog
        open={openDialog}
        onClose={handleOpenDialogFunction}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        dir={t("dir")}
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
          <Typography variant="button">{t("update_product")} </Typography>
          <IconButton size="medium" onClick={handleOpenDialogFunction}>
            <CloseSquare />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <Grid container spacing={2} sx={{ mt: "1rem" }}>
              <Grid item xs={12} mt={2}>
                {/* <Grid container spacing={2}> */}
                {/* <Grid item mt={2} xs={4}>
                    <UploadComponent />
                  </Grid> */}
                {/* <Grid item mt={12} xs={18}> */}
                <InputLabel sx={{ paddingBottom: "5px" }} required>
                  <Typography variant="subtitle2" component={"samp"}>
                    {t("product_name")}
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
                {/* </Grid> */}
                {/* </Grid> */}
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
                          {t("count")}{" "}
                        </Typography>
                        <Typography component={"span"}>
                          {" "}
                          {item?.name}{" "}
                        </Typography>
                        <Typography component={"span"}>
                          {t("in_one")}
                        </Typography>
                        <Typography component={"span"}>
                          {selectedUnitProduct?.[index - 1]?.name}
                        </Typography>
                      </InputLabel>
                      <TextField
                        fullWidth
                        size="small"
                        type="number"
                        {...register("measure" + index, {
                          required: true,
                        })}
                        defaultValue={
                          product?.measuresExchange?.[index - 1]
                            ?.baseMeasureAmount
                        }
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
                            {t("bought_price")} {item?.name}
                          </InputLabel>
                          <TextField
                            fullWidth
                            size="small"
                            type="number"
                            {...register("buyPrice " + item?.name, {
                              required: true,
                            })}
                            name={"buyPrice " + item?.name}
                            onChange={handleChangePriceMeasureFunction}
                            id={`${index}`}
                            defaultValue={item?.buyPrice}
                          />
                        </Grid>
                        <Grid item xs={6} key={item?.measuer}>
                          <InputLabel
                            sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                          >
                            {t("sale_price")} {item?.name}
                          </InputLabel>
                          <TextField
                            fullWidth
                            type="number"
                            size="small"
                            {...register("sellPrice " + item?.name, {
                              required: true,
                            })}
                            onChange={handleChangePriceMeasureFunction}
                            name={"sellPrice " + item?.name}
                            id={`${index}`}
                            defaultValue={item?.sellPrice}
                          />
                        </Grid>
                      </Grid>
                    );
                  })}
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel sx={{ marginTop: "1.1rem", paddingBottom: "5px" }}>
                  {t("currency")}
                </InputLabel>
                <UserCurrenciesComponent
                  name={"currencyId"}
                  // register={register}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <ProductCategoriesComponent register={register} />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t("expirationDate")}
                </InputLabel>
                <TextField
                  fullWidth
                  type="date"
                  size="small"
                  defaultValue={product?.expirationDate?.slice(0, 10)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("expirationDate", { required: false })}
                  name="expirationDate"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel sx={{ marginTop: "1.5rem", paddingBottom: "5px" }}>
                  {t("product_code")}
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
          sx={{ display: "flex", justifyContent: "end", columnGap: "1rem" }}
        >
          <Button variant="outlined" onClick={handleOpenDialogFunction}>
            {t("cancel")}
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit(onSubmitFunction)}
            loading={isLoading}
          >
            {t("save")}
          </Button>
        </DialogActions>
      </Dialog>

      <Box>
        <IconButton onClick={handleOpenDialogFunction}>
          <Edit size={20} color={theme.palette.primary.contrastText} />
        </IconButton>
      </Box>
    </FormProvider>
  );
};

export default UpdateProduct;
