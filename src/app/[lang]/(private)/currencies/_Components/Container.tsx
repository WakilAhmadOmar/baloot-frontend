"use client"
import CurrencyComponent from "./List";
import { ADD_USER_CURRENCY } from "@/graphql/mutation/ADD_USER_CURRENCY";
import { DELETE_USER_CURRENCY } from "@/graphql/mutation/DELETE_USER_CURRENCY";
import { UPDATE_USER_CURRENCY } from "@/graphql/mutation/UPDATE_USER_CURRENCY";
import CircularProgressComponent from "@/components/loader/CircularProgressComponent";
import EmptyPage from "@/components/util/emptyPage";
import { getUserCurrenciesFunction } from "@/components/util/getUserCurrency";
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
import { ArrowSwapVertical, CloseSquare, InfoCircle } from "iconsax-react";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "@/provider/appContext";
import { useTranslations } from "next-intl";


const DefinitionsCurrency = () => {
  const t = useTranslations("pages")
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
  const [baseCurrency, setBaseCurrency] = useState<any>(null);
  const {setHandleError} = useContext(AppContext)


  const [productUnits, setProductUnits] = useState<any[]>([]);
  const [idToDeleteCurrency, setIdToDeleteCurrency] = useState("");
  const getProudctUnits = async () => {
    setLoadingPage(true);
    const currency = await getUserCurrenciesFunction(client);
    // const curencies = currency?.getUserCurrencies?.filter(
    //   (item: any) => !item.isBase
    // );
    const base = currency?.getUserCurrencies?.filter(
      (item: any) => item.isBase
    );
    setProductUnits(currency?.getUserCurrencies);
    setBaseCurrency(base?.[0]);
    setLoadingPage(false);
  };
  useEffect(() => {
    getProudctUnits();
  }, []);
  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
  };
  const handleOpenDialogDeleteFunction = () => {
    setOpenDialogDelete(!openDialogDelete);
  };

  const onSubmitFunction = async (data: any) => {
    setLoadingPage(true);
    try {
      const variables = {
        ...(data?.currencyId ? { currencyId: data?.currencyId } : {}),
        currencyObject: {
          name: data.name,
          symbol: data?.symbol,
          rate: parseFloat(data?.rate),
          baseRate: parseFloat(data?.baseRate),
          isActive: true,
          isBase: false,
        },
      };
      if (data?.currencyId) {
        const {
          data: { updateUserCurrency },
        } = await client.mutate({
          mutation: UPDATE_USER_CURRENCY,
          variables,
        });
        const newState = productUnits?.map((item) => {
          if (item?._id === updateUserCurrency?._id) {
            return {
              ...updateUserCurrency,
            };
          } else return item;
        });
        setProductUnits(newState);
        setLoadingPage(false);
        setOpenDialog(false), setValue("currencyId", null);
        setValue("name", null);
        setValue("symbol", null);
        setValue("rate", null);
        setValue("baseRate", null);
        setHandleError({
          open: true,
          message: "Update successfully",
          status: "success",
        });
      } else {
        const {
          data: { addUserCurrency },
        } = await client.mutate({
          mutation: ADD_USER_CURRENCY,
          variables,
        });
        setProductUnits([addUserCurrency, ...productUnits]);
        setLoadingPage(false);
        setOpenDialog(false);
      }
    } catch (error: any) {
      console.log("error", error.message);
      setLoadingPage(false);
      setHandleError({
        open: true,
        message: error?.message,
        status: "error",
      });
    }
  };

  const deleteFunction = async () => {
    try {
      setLoadingPage(true);
      const variables = {
        currencyId: idToDeleteCurrency,
      };
      const {
        data: { deleteUserCurrency },
      } = await client.mutate({
        mutation: DELETE_USER_CURRENCY,
        variables,
      });

      if (deleteUserCurrency?.message) {
        const filterState = productUnits?.filter(
          (item) => item?._id !== idToDeleteCurrency
        );
        setProductUnits(filterState);
        setHandleError({
          open: true,
          status: "success",
          message: deleteUserCurrency?.message,
        });
        setOpenDialogDelete(false);
        setLoadingPage(false);
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

  const handleUpdateCurrency = (item: any) => {
    setValue("currencyId", item?._id);
    setValue("name", item?.name);
    setValue("symbol", item?.symbol);
    setValue("rate", item?.rate);
    setValue("currencyRate", item?.baseRate);
    setValue("isActive", item?.isActive);
    setValue("isBase", item?.isBase);
    setOpenDialog(true);
  };

  const handleUpdateRate = (data: any) => {
    const filterState = productUnits.map((item) => {
      if (item?._id === data?._id) {
        return {
          ...item,
          rate: data?.rate,
          baseRate: data?.baseRate,
        };
      } else return item;
    });
    setProductUnits(filterState);
  };

  const openDialogDeleteFunction = (id: string) => {
    setIdToDeleteCurrency(id);
    setOpenDialogDelete(true);
  };
  return (
    <Box>
      {loadingPage && <CircularProgressComponent />}
      
      <Dialog
        open={openDialogDelete}
        onClose={handleOpenDialogDeleteFunction}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        dir={t("dir")}
      >
        <DialogTitle id="alert-dialog-title" className={"dialogTitleDelete"}>
          <Box
            display="flex"
            justifyContent={"space-between"}
            alignItems={"center"}
            columnGap={1}
          >
            <Typography variant="h5">
              {t("currency.message_title_delete")}
            </Typography>
            <InfoCircle color={theme.palette.warning.main} size={30} />
          </Box>
        </DialogTitle>
        <DialogContent className="dialogContentDelete">
          <Box pt={1}>
            <Typography variant="body1">
             {t("currency.message_description_delete")}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions
          className="dialogActionDelete"
          sx={{ display: "flex", justifyContent: "end", columnGap: "1rem" }}
        >
          <Button variant="outlined" onClick={handleOpenDialogDeleteFunction}>
            {t("currency.cancel")}
          </Button>
          <Button color="primary" variant="contained" onClick={deleteFunction}>
            {t("currency.yes")}
          </Button>
        </DialogActions>
      </Dialog>
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
          <Typography variant="button">{t("currency.add_new_currency")}</Typography>
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
                    {t('currency.currency_name_is_required')}
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
                <Typography variant="button">{t("currency.set_daily_price")}</Typography>
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
                      {t("currency.to")} {baseCurrency?.name} ({t("currency.base_currency")})
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
          >
            {t("currency.save")}
          </Button>
          <Button variant="outlined" onClick={handleOpenDialogFunction}>
            {t("currency.cancel")}
          </Button>
        </DialogActions>
      </Dialog>
      {productUnits?.length === 0 && loadingPage === false ? (
        <Box className={"empty_page_content"}>
          <EmptyPage
            buttonText={t("currency.add_new_currency")}
            discription={t("currency.you_have_no_currency")}
            onClick={handleOpenDialogFunction}
            title={t("currency.no_currency_registered")}
          />
        </Box>
      ) : (
        <Box>
          <Typography variant="h3" mb={3}>
            {t("currency.define_currency")}
          </Typography>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            mb={2}
          >
            <Button variant="contained" onClick={handleOpenDialogFunction}>
              {" "}
              {t("currency.add_new_currency")}
            </Button>
            <Typography variant="h3">
              {t("currency.base_currency")} ({baseCurrency?.symbol})
            </Typography>
          </Box>
          <Box display={"flex"} flexWrap={"wrap"} columnGap={2} rowGap={2}>
            {productUnits?.map((item:any) => {
              return (
                <Box key={item?._id} height={"100%"}>
                  <CurrencyComponent
                    item={item}
                    onUpdate={handleUpdateCurrency}
                    onUpdateRate={handleUpdateRate}
                    onDelete={openDialogDeleteFunction}
                    baseCurrency={baseCurrency}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default DefinitionsCurrency;

