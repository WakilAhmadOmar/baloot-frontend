import { useUpdateUserCurrencyMutation } from "@/hooks/api/currencies/mutations/use-update-user-currency";
import { useAddUserCurrencyMutation } from "@/hooks/api/currencies/mutations/user-add-user-currency";
import { AppContext } from "@/provider/appContext";
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
import { ArrowSwapVertical, CloseSquare, Edit } from "iconsax-react";
import { useTranslations } from "next-intl";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

type IPropsUpdateCurrency = {
  item: any;
};
export function UpdateCurrency({ item }: IPropsUpdateCurrency) {
  const t = useTranslations("pages");
  const { setHandleError } = useContext(AppContext);
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: item?.name,
      symbol: item?.symbol,
      rate: item?.rate,
      baseRate: item?.baseRate,
    },
  });
  const [openDialog, setOpenDialog] = useState(false);

  const { mutate, isLoading } = useUpdateUserCurrencyMutation();

  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
  };

  const onSubmitFunction = async (data: any) => {
    const variables = {
      currencyId: item?._id,
      currencyObject: {
        name: data.name,
        symbol: data?.symbol,
        rate: parseFloat(data?.rate),
        baseRate: parseFloat(data?.baseRate),
        isActive: item?.isActive,
        isBase: item?.isBase,
      },
    };
    mutate(variables, {
      onSuccess: () => {
        setHandleError({
          open: true,
          message: t("currency.currency_updated_successfully"),
          status: "success",
        });
      },
      onError: (error: any) => {
        setHandleError({
          open: true,
          message: error?.message,
          status: "error",
        });
      },
    });
  };

  return (
    <Box>
      <IconButton onClick={handleOpenDialogFunction} size="large">
        <Edit size={20} color={theme.palette.primary.main} />
      </IconButton>
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
          <Typography variant="button">
            {t("currency.add_new_currency")}
          </Typography>
          <IconButton size="medium" onClick={handleOpenDialogFunction}>
            <CloseSquare />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ paddingBottom: "4rem" }}>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <InputLabel
                  sx={{ paddingBottom: "5px", marginTop: "10px" }}
                  required
                >
                  {t("currency.currency_name")}
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  {...register("name", { required: true })}
                  name="name"
                />
                {errors?.name?.type === "required" && (
                  <Typography color="error" p={1}>
                    {t("currency.currency_name_is_required")}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                <InputLabel
                  sx={{ paddingBottom: "5px", marginTop: "10px" }}
                  required
                >
                  {t("currency.symbol")}
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  {...register("symbol", { required: true })}
                  name="symbol"
                />
                {errors?.symbol?.type === "required" && (
                  <Typography color="error" p={1}>
                    {t("currency.symbol_is_required")}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} mt={5}>
                <Typography variant="button">
                  {t("currency.set_daily_price")}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "auto 8rem auto",
                    alignItems: "end",
                  }}
                >
                  <Box>
                    <InputLabel
                      sx={{ paddingBottom: "5px", marginTop: "5px" }}
                      required
                    >
                      {t("currency.daily_rate")}
                    </InputLabel>
                    <TextField
                      fullWidth
                      size="small"
                      {...register("rate", { required: true })}
                      name="rate"
                      type="number"
                    />
                    {errors?.rate?.type === "required" && (
                      <Typography color="error" p={1}>
                        {t("currency.rate_is_required")}
                      </Typography>
                    )}
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    pb={0.5}
                  >
                    <ArrowSwapVertical
                      color={theme.palette.primary.main}
                      size={32}
                    />
                  </Box>
                  <Box>
                    <InputLabel
                      sx={{ paddingBottom: "5px", marginTop: "5px" }}
                      required
                    >
                      {t("currency.to")}
                      {/* {baseCurrency?.name}  */}(
                      {t("currency.base_currency")})
                    </InputLabel>
                    <TextField
                      fullWidth
                      size="small"
                      {...register("baseRate", { required: true })}
                      name="baseRate"
                      type="number"
                    />
                    {errors?.baseRate?.type === "required" && (
                      <Typography color="error" p={1}>
                        {t("currency.base_currency_is_required")}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "start",
            columnGap: "1rem",
            borderTop: `1px solid ${theme.palette.grey[200]}`,
            padding: "1.5rem",
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit(onSubmitFunction)}
            loading={isLoading}
          >
            {t("currency.save")}
          </Button>
          <Button variant="outlined" onClick={handleOpenDialogFunction}>
            {t("currency.cancel")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
