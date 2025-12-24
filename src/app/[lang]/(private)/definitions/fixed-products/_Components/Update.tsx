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
import { useContext, useMemo, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import UserCurrenciesComponent from "@/components/Auto/currencyAutoComplete";

import { AppContext } from "@/provider/appContext";
import { useTranslations } from "next-intl";
import { ProductUnit } from "./unit";
import { useUpdateFixedProductMutation } from "@/hooks/api/definitions/product/mutations/use-update-fixed-mutation";

interface IPropsUpdateProduct {
  product?: any;
}
const UpdateProduct: React.FC<IPropsUpdateProduct> = ({ product }) => {
  const t = useTranslations("product");
  const { mutate: updateProductMutation, isLoading } =
    useUpdateFixedProductMutation();
  const theme = useTheme();

  const defaultValues = useMemo(() => {
    return {
      name: product?.name,
      price: product?.price,
      currencyId: product?.currencyId?._id,
      amountPerMeasure: product?.amountPerMeasure,
      measureId: product?.measureId?._id,
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

  const { setHandleError } = useContext(AppContext);

  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
  };

  const onSubmitFunction = async (data: any) => {
    const productObject = {
      ...data,
      amountPerMeasure: parseInt(data?.amountPerMeasure),
      price: parseFloat(data.price),
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
          <Typography variant="button">{t("update_product")} </Typography>
          <IconButton size="medium" onClick={handleOpenDialogFunction}>
            <CloseSquare size={20} color="gray" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <Grid container spacing={2} sx={{ mt: "1rem" }}>
              <Grid item xs={12} mt={2}>
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
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel
                  sx={{ marginTop: "1.1rem", paddingBottom: "5px" }}
                  error={!!errors?.currencyId}
                >
                  {t("price")}
                </InputLabel>
                <TextField
                  fullWidth
                  type="number"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("price", { required: false })}
                  name="price"
                />
                {errors?.currencyId?.type === "required" && (
                  <Typography color="error" p={1}>
                    {t("currency_is_required")}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel
                  sx={{ marginTop: "1.1rem", paddingBottom: "5px" }}
                  error={!!errors?.currencyId}
                >
                  {t("currency")}
                </InputLabel>
                <UserCurrenciesComponent dir={t("dir")} />
                {errors?.currencyId?.type === "required" && (
                  <Typography color="error" p={1}>
                    {t("currency_is_required")}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel
                  sx={{ marginTop: "1.1rem", paddingBottom: "5px" }}
                  error={!!errors?.currencyId}
                >
                  {t("count")}
                </InputLabel>
                <TextField
                  fullWidth
                  type="number"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("amountPerMeasure", { required: false })}
                  name="amountPerMeasure"
                />
                {errors?.currencyId?.type === "required" && (
                  <Typography color="error" p={1}>
                    {t("currency_is_required")}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <ProductUnit />
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
