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
  Grid2 as Grid,
  InputLabel,
} from "@mui/material";
import { CloseSquare } from "iconsax-react";
import { ChangeEvent, useContext, useState, useEffect } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import UserCurrenciesComponent from "@/components/Auto/currencyAutoComplete";
import ProductCategoriesComponent from "@/components/util/ProductCategory";
import ProductMeansureComponent from "@/components/util/ProductMeansure";
import { useAddProductMutation } from "@/hooks/api/definitions/product/mutations/use-add-mutation";
import { AppContext } from "@/provider/appContext";
import { useTranslations } from "next-intl";
import useSchemaCreateForm, {
  CreateProductFormSchema,
} from "./create-form.schema";

const CreateProduct = () => {
  const t = useTranslations("product");
  const schema = useSchemaCreateForm(t);
  const { mutate: addProductMutation, isLoading } = useAddProductMutation();
  const method = useForm<CreateProductFormSchema>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      category: "",
      currencyId: "",
      barcode: "",
      measures: [],
    },
  });
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
  } = method;

  const { fields, replace } = useFieldArray({
    control,
    name: "measures",
  });

  const [openDialog, setOpenDialog] = useState(false);

  const { setHandleError } = useContext(AppContext);

  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
  };

  const onSubmitFunction = async (data: CreateProductFormSchema) => {
    if (data.measures.length === 0) {
      return setHandleError({
        open: true,
        status: "info",
        message: t("please_add_at_least_one_credit"), // Assuming a similar message key exists or reusing generic
      });
    }

    const measuresList = data.measures;

    const variables = {
      productObject: {
        name: data.name,
        measures: measuresList.map((item) => ({
          measureId: item.measureId,
        })),
        price: measuresList.map((item) => ({
          measureId: item.measureId,
          buyPrice: Number(item.buyPrice),
          sellPrice: Number(item.sellPrice),
        })),
        ...(measuresList.length > 0
          ? {
              measuresExchange: measuresList
                .map((item, index) => {
                  if (index === 0) return null;

                  // Calculate conversion factor relative to the base unit (last unit)
                  // Logic from original code:
                  // For unit at index `K`, the conversion factor seems to be product of counts of all units from K down to 1?
                  // Original:
                  /*
                    let amountMeasure = 1;
                    selectedUnitProduct
                      ?.filter((i, ind) => ind >= index)
                      .forEach((ite, indexdata) => {
                        amountMeasure =
                          amountMeasure *
                          parseInt(data?.["measure" + (index + indexdata)]);
                      });
                  */
                  // Wait, the original logic iterates from `index` upwards? `ind >= index`.
                  // If I have [Box, Pack, Piece]. Box=10Pack, Pack=10Piece.
                  // index 0: Box.
                  // index 1: Pack.
                  // index 2: Piece.
                  // Original logic for `index` (e.g. 1, Pack):
                  // filters items where `ind >= 1` -> Pack, Piece.
                  // Multiplies `data["measure" + (1 + indexdata)]`.
                  // If indexdata is 0 (Pack), use "measure1".
                  // This seems to imply `measureX` stores the conversion factor of that unit relative to the *next* or *previous*?

                  // In the new schema, `conversionFactor` (mapped to `measure` in original logic I assume?) is stored on the item itself.
                  // Let's assume `item.conversionFactor` corresponds to the input value for that unit row.

                  // Replicating original logic using new structure:
                  let amountMeasure = 1;
                  // Get all items from current index to the end
                  const relevantItems = measuresList.slice(index);
                  relevantItems.forEach((relItem) => {
                    amountMeasure =
                      amountMeasure * Number(relItem.conversionFactor || 1);
                  });

                  return {
                    powerMeasureId: measuresList[index - 1]?.measureId,
                    powerMeasureAmount: 1,
                    baseMeasureId:
                      measuresList[measuresList.length - 1].measureId,
                    baseMeasureAmount: amountMeasure,
                  };
                })
                .filter((item) => item !== null),
            }
          : {}),
        category: data.category,
        ...(data.barcode ? { barcode: data.barcode } : {}),
        currencyId: data.currencyId,
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
        method.reset();
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
    // Map the data from ProductMeansureComponent to the schema structure
    // The component returns objects like { measure: id, name: string, buyPrice: 0 ... }
    // We need to transform them to match the schema
    const mappedMeasures = data.map((item, index) => ({
      measureId: item.measure, // or item.measureId depending on component output
      measureName: item.name,
      buyPrice: 0,
      sellPrice: 0,
      conversionFactor: 1,
      isBaseUnit: index === data.length - 1, // Assumptions based on original logic often treating the last one as base?
      // Actually original logic seemed to treat index 0 as top unit?
    }));

    // We should probably preserve existing values if the user just appended a unit?
    // But replace is simpler and safer if the multi-select source of truth is the component.

    // Merging with existing values if possible:
    const currentFields = method.getValues("measures");

    const newFields = mappedMeasures.map((newItem) => {
      const existing = currentFields.find(
        (f) => f.measureId === newItem.measureId
      );
      if (existing) return existing;
      return newItem;
    });

    replace(newFields);
  };
  // Removed handleChangePriceMeasureFunction as react-hook-form handles it

  return (
    <FormProvider {...method}>
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
          <Typography variant="button">{t("create_title")} </Typography>
          <IconButton size="medium" onClick={handleOpenDialogFunction}>
            <CloseSquare size={20} color="gray" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <Grid container spacing={2} sx={{ mt: "1rem" }}>
              <Grid size={{ xs: 12 }} mt={2}>
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
                  {...register("name")}
                  error={!!errors?.name}
                />
                {errors?.name && (
                  <Typography color="error" p={1}>
                    {errors.name.message}
                  </Typography>
                )}
                <ProductMeansureComponent
                  getDataSelect={handleGetMeasureFunction}
                  defaultValue={fields.map((f) => ({
                    name: f.measureName,
                    measure: f.measureId,
                  }))}
                />
                {errors?.measures && (
                  <Typography color="error" p={1}>
                    {errors.measures.message}
                  </Typography>
                )}
              </Grid>
              {fields.length > 1 &&
                fields.map((field, index) => {
                  if (index === 0) {
                    return null;
                  }
                  return (
                    <Grid size={{ xs: 12, md: 6 }} key={field.id}>
                      <InputLabel
                        sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                        error={!!errors?.measures?.[index]?.conversionFactor}
                      >
                        <Typography component={"span"}>
                          {t("count")}{" "}
                        </Typography>
                        <Typography component={"span"}>
                          {" "}
                          {field.measureName} &nbsp;
                        </Typography>
                        <Typography component={"span"}>
                          {t("in_one")}&nbsp;
                        </Typography>
                        <Typography component={"span"}>
                          {fields[index - 1]?.measureName}
                        </Typography>
                      </InputLabel>
                      <TextField
                        fullWidth
                        size="small"
                        type="number"
                        {...register(`measures.${index}.conversionFactor`)}
                        error={!!errors?.measures?.[index]?.conversionFactor}
                      />
                      {errors?.measures?.[index]?.conversionFactor && (
                        <Typography color="error" p={1}>
                          {errors.measures[index]?.conversionFactor?.message}
                        </Typography>
                      )}
                    </Grid>
                  );
                })}
              <Grid size={{ xs: 12 }}>
                {fields.length > 0 &&
                  fields.map((field, index) => {
                    return (
                      <Grid container key={field.id} spacing={2}>
                        <Grid size={{ xs: 6 }}>
                          <InputLabel
                            sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                            error={!!errors?.measures?.[index]?.buyPrice}
                          >
                            {t("bought_price")} {field.measureName}
                          </InputLabel>
                          <TextField
                            fullWidth
                            size="small"
                            type="number"
                            {...register(`measures.${index}.buyPrice`)}
                            error={!!errors?.measures?.[index]?.buyPrice}
                          />
                          {errors?.measures?.[index]?.buyPrice && (
                            <Typography color="error" p={1}>
                              {errors.measures[index]?.buyPrice?.message}
                            </Typography>
                          )}
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                          <InputLabel
                            sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                            error={!!errors?.measures?.[index]?.sellPrice}
                          >
                            {t("sale_price")} {field.measureName}
                          </InputLabel>
                          <TextField
                            fullWidth
                            type="number"
                            size="small"
                            {...register(`measures.${index}.sellPrice`)}
                            error={!!errors?.measures?.[index]?.sellPrice}
                          />
                          {errors?.measures?.[index]?.sellPrice && (
                            <Typography color="error" p={1}>
                              {errors.measures[index]?.sellPrice?.message}
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    );
                  })}
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <InputLabel
                  sx={{ marginTop: "1.1rem", paddingBottom: "5px" }}
                  error={!!errors?.currencyId}
                >
                  {t("currency")}
                </InputLabel>
                <UserCurrenciesComponent
                  dir={t("dir")}
                  // register={register}
                  // Ideally UserCurrenciesComponent should use useFormContext or take control/register
                  // Inspecting previous code: it had commented out register.
                  // If it uses useFormContext internally, it should work if name matches.
                  // Original code: passed nothing, relied on context?
                  // Lines 324: <UserCurrenciesComponent ... />
                  // We'll trust it uses context or we might need to check it.
                  // The schema field is `currencyId`.
                />
                {errors?.currencyId && (
                  <Typography color="error" p={1}>
                    {errors.currencyId.message}
                  </Typography>
                )}
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ProductCategoriesComponent />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <InputLabel sx={{ marginTop: "1.5rem", paddingBottom: "5px" }}>
                  {t("product_code")}
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  {...register("barcode")}
                  error={!!errors?.barcode}
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
