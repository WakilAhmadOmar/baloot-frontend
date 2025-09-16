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
import { ChangeEvent, useContext, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import UserCurrenciesComponent from "@/components/Auto/currencyAutoComplete";
import ProductCategoriesComponent from "@/components/util/ProductCategory";
import ProductMeansureComponent from "@/components/util/ProductMeansure";
import { useAddProductMutation } from "@/hooks/api/definitions/product/mutations/use-add-mutation";
import { AppContext } from "@/provider/appContext";
import { useTranslations } from "next-intl";

const CreateProduct = () => {
  const t = useTranslations("product");
  const { mutate: addProductMutation, isLoading } = useAddProductMutation();
  const method = useForm();
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = method;

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUnitProduct, setSelectedUnitProduct] = useState<any[]>([]);

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
    const variables = {
      productObject: {
        name: data?.name,
        price: selectedUnitProduct?.map((item, index: number) => {
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
        // ...(data?.expirationDate
        //   ? { expirationDate: data?.expirationDate }
        //   : {}),
        ...(data?.barcode ? { barcode: data?.barcode } : {}),
        // isNewProduct: data?.isNewProduct === "newProduct",
        currencyId: data?.currencyId,

      },
    };
    addProductMutation(variables, {
      onSuccess: () => {
        setHandleError({
          open: true,
          message: t("product_added_successfully"),
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
    });
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
            px:2,
            py:1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${theme.palette.grey[200]}`,
          }}
        >
          <Typography variant="button">{t("create_title")} </Typography>
          <IconButton size="medium" onClick={handleOpenDialogFunction}>
            <CloseSquare size={20} color="gray" />
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
                <InputLabel
                  sx={{ paddingBottom: "5px" }}
                  required
                  error={!!errors?.name}
                >
                  <Typography variant="subtitle2" component={"samp"}>
                    {t("product_name")}
                  </Typography>
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  {...register("name", { required: true })}
                  name="name"
                  error={!!errors?.name}
                />
                {errors?.name?.type === "required" && (
                  <Typography color="error" p={1}>
                    {t("product_name_is_required")}
                  </Typography>
                )}
                <ProductMeansureComponent
                  getDataSelect={handleGetMeasureFunction}
                  defaultValue={selectedUnitProduct}
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
                        error={!!errors?.["measure" + index]}
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
                        error={!!errors?.["measure" + index]}
                        name={"measure" + index}
                        onChange={handleChangePriceMeasureFunction}
                        id={`${index}`}
                      />
                      {errors?.["measure" + index]?.type === "required" && (
                        <Typography color="error" p={1}>
                          {t("amount_is_required")}
                        </Typography>
                      )}
                    </Grid>
                  );
                })}
              <Grid item xs={12}>
                {selectedUnitProduct?.length > 0 &&
                  selectedUnitProduct?.map((item: any, index: number) => {
                    return (
                      <Grid container key={item?.measure} spacing={2}>
                        <Grid item xs={6} key={item}>
                          <InputLabel
                            sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                            error={!!errors?.["sellPrice " + item?.name]}
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
                            error={!!errors?.["sellPrice " + item?.name]}
                            onChange={handleChangePriceMeasureFunction}
                            id={`${index}`}
                          />
                          {errors?.["buyPrice " + item?.name]?.type ===
                            "required" && (
                            <Typography color="error" p={1}>
                              {t("amount_is_required")}
                            </Typography>
                          )}
                        </Grid>
                        <Grid item xs={6} key={item?.measure}>
                          <InputLabel
                            sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                            error={!!errors?.["sellPrice " + item?.name]}
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
                            error={!!errors?.["sellPrice " + item?.name]}
                            onChange={handleChangePriceMeasureFunction}
                            name={"sellPrice " + item?.name}
                            id={`${index}`}
                          />
                          {errors?.["sellPrice " + item?.name]?.type ===
                            "required" && (
                            <Typography color="error" p={1}>
                              {t("amount_is_required")}
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    );
                  })}
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel
                  sx={{ marginTop: "1.1rem", paddingBottom: "5px" }}
                  error={!!errors?.currencyId}
                >
                  {t("currency")}
                </InputLabel>
                <UserCurrenciesComponent
                  dir={t("dir")}
                  // register={register}
                />
                {errors?.currencyId?.type === "required" && (
                  <Typography color="error" p={1}>
                    {t("currency_is_required")}
                  </Typography>
                )}
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
                  // defaultValue={item?.expirationDate?.slice(0, 10)}
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenDialogFunction}
        >
          {t("add_new_product")}
        </Button>
      </Box>
    </FormProvider>
  );
};

export default CreateProduct;
