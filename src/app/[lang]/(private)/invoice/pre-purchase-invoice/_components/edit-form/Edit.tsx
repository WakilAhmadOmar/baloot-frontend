"use client";
import CurrenciesAutoComplete from "@/components/Auto/currencyAutoComplete";
import CustomerAutoComplete from "@/components/Auto/customerAutoComplete";
import WarehouseAutoComplete from "@/components/Auto/WarehouseAutoComplete";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid2,
  IconButton,
  InputLabel,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { CloseSquare, Edit } from "iconsax-react";
import { useContext, useEffect, useMemo, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppContext } from "@/provider/appContext";
import { useTranslations } from "next-intl";
import { useUpdateSellsBillMutation } from "@/hooks/api/invoice/mutations/use-update-sells-bill";
import useSchemaEditForm, { CreateFormSchema } from "./edit-form.schema";
import { useGetPreBuyBillByIdQuery } from "@/hooks/api/invoice/queries/get-pre-buy-bill-by-id";
import { FormInputSkeleton } from "./form-input-skeleton";
import { ContainerTable } from "./table-container";

interface IProps {
  onCreated?: (billInfo: any) => void;
  id: string;
}

const EditSalesInvoice: React.FC<IProps> = ({ onCreated, id }) => {
  const t = useTranslations("invoice");
  const [openDialog, setOpenDialog] = useState(false);
  const { setHandleError } = useContext(AppContext);
  const theme = useTheme();
  const { data: billData, isLoading } = useGetPreBuyBillByIdQuery(
    {
      billId: id,
    },
    openDialog
  );
  console.log("billData", billData);
  const { mutate: updateSellsBillMutation, isLoading: isUpdating } =
    useUpdateSellsBillMutation();

  const defaultValues = useMemo(() => {
    if (billData?._id)
      return {
        customerId: billData?.customerId?._id,
        warehouseId: billData?.entrepotId?._id,
        currencyId: billData?.currencyId?._id,
        // Map old field to new field name in schema
        totalPriceAfterExpense: billData?.totalPriceOfBillAfterConsumption,
        totalPrice: billData?.totalPrice,
        contact_number: billData?.customerId?.contactNumber,
        // Provide defaults for fields required by CreateFormSchema
        paymentMethod: "cash",
        payerId: "",
        products: billData?.products?.map((item: any) => {
          const measures = item?.productId?.measures?.map(
            (measure: any, measureIndex: number) => {
              const findSelectedMeasure = item?.productMeasures?.filter(
                (m: any) => m?.measureId?._id === measure?.measureId?._id
              );
              // Map to MeasureSchema in create-form.schema
              return {
                quantity: findSelectedMeasure?.[0]?.amountOfProduct || 1,
                buyPrice:
                  findSelectedMeasure?.[0]?.pricePerMeasure ||
                  item?.productId?.price?.[measureIndex]?.buyPrice,
                measureId: measure?.measureId,
                expense: findSelectedMeasure?.[0]?.consumptionPrice || 0,
                totalExpense:
                  findSelectedMeasure?.length > 0
                    ? findSelectedMeasure?.[0]?.amountOfProduct *
                      findSelectedMeasure?.[0]?.consumptionPrice
                    : 0,
                total:
                  findSelectedMeasure?.length > 0
                    ? findSelectedMeasure?.[0]?.amountOfProduct *
                      findSelectedMeasure?.[0]?.pricePerMeasure
                    : 0,
                selected: findSelectedMeasure?.length > 0 ? true : false,
              };
            }
          );

          return {
            productId: item?.productId?._id,
            name: item?.productId?.name,
            price: measures || [],
            expireInDate: item?.expireInDate
              ? new Date(item.expireInDate).toISOString().slice(0, 10)
              : null,
            warehouse: item?.warehouse?._id,
            expense: 0,
            totalExpense: 0,
          };
        }),
      };
  }, [billData]);

  const methods = useForm<CreateFormSchema>({
    resolver: yupResolver(useSchemaEditForm(t)) as any,
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    register,
    setValue,
    formState: { errors },
  } = methods;
  useEffect(() => {
    if (billData) {
      reset(defaultValues);
    }
  }, [billData, reset, defaultValues]);

  const handleOpenDialogBox = () => {
    setOpenDialog(!openDialog);
  };
  const onSubmitFunction = async (data: CreateFormSchema) => {
    const variables = {
      sellBillObject: {
        billDate: new Date(billData?.billDate),
        currencyId: data?.currencyId,
        customerId: data?.customerId,
        entrepotId: data?.warehouseId,
        products: data?.products?.map((item: any) => {
          const productMeasures = item?.measures
            ?.filter((measure: any) => measure?.selected)
            ?.map((dataItem: any) => {
              return {
                measureId: dataItem?.measureId,
                amountOfProduct: dataItem?.amount,
                pricePerMeasure: dataItem?.buyPrice,
                consumptionPrice: dataItem?.expense, // Mapping expense to consumptionPrice
                // discountPercentage: 0, // Not in schema, assuming 0
              };
            });
          return {
            productId: item?.productId,
            productMeasures,
            expireInDate: item?.expireInDate,
          };
        }),
        // totalPrice: data?.totalPrice,
        totalPriceOfBillAfterConsumption: data?.totalPriceAfterExpense, // Mapping back
        transactionId: billData?.transactionId?._id,
      },
    };
    updateSellsBillMutation(
      {
        sellBillId: id,
        sellBillObject: variables.sellBillObject,
      },
      {
        onSuccess: () => {
          setHandleError({
            message: "Action successfully recorded.",
            type: "success",
            open: true,
          });
        },
        onError: (error: any) => {
          setHandleError({
            type: "error",
            message: error?.message,
            open: true,
          });
        },
      }
    );
  };

  return (
    <FormProvider {...methods}>
      <IconButton onClick={handleOpenDialogBox}>
        <Edit color={theme.palette.primary.main} size={22} />
      </IconButton>
      <Dialog
        fullScreen
        open={openDialog}
        onClose={handleOpenDialogBox}
        dir={t("dir")}
      >
        <AppBar
          sx={{
            position: "relative",
            color: theme.palette.grey["A700"],
            bgcolor: theme.palette.background.default,
            boxShadow: "none",
            borderBottom: `1px solid ${theme.palette?.grey[200]} `,
          }}
        >
          <Toolbar>
            <Typography component="div" variant="button" sx={{ flex: 1 }}>
              {t("edit_pre_purchase_invoice")}
            </Typography>

            <IconButton
              edge="start"
              color="inherit"
              onClick={handleOpenDialogBox}
              aria-label="close"
            >
              <CloseSquare />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Grid2 container columnSpacing={3} rowSpacing={3}>
            <Grid2 size={3} gap={1} display={"grid"}>
              <InputLabel>{t("customer_name")}</InputLabel>
              {isLoading ? (
                <FormInputSkeleton />
              ) : (
                <CustomerAutoComplete
                  getCustomer={(customer) => {
                    setValue("contact_number", customer?.contactNumber);
                  }}
                  dir={t("dir")}
                />
              )}
            </Grid2>
            <Grid2 size={2} gap={1} display={"grid"}>
              <InputLabel>{t("Contact_Number")}</InputLabel>
              <TextField
                fullWidth
                size="small"
                disabled
                // value={customer?.contactNumber ?? ""}
                {...register("contact_number")}
                name={"contact_number"}
              />
            </Grid2>
            <Grid2 size={2} gap={1} display={"grid"}>
              <InputLabel>{t("warehouse")} </InputLabel>
              {isLoading ? (
                <FormInputSkeleton />
              ) : (
                <WarehouseAutoComplete dir={t("dir")} />
              )}
            </Grid2>
            <Grid2 size={2} gap={1} display={"grid"}>
              <InputLabel>{t("Currency")}</InputLabel>
              {isLoading ? (
                <FormInputSkeleton />
              ) : (
                <CurrenciesAutoComplete dir={t("dir")} isBaseCurrency />
              )}
            </Grid2>
          </Grid2>

          <ContainerTable isLoading={isLoading} />
          {/* <Grid2 container columnSpacing={3} rowSpacing={3}>
            <Grid2 size={3} gap={1} display={"grid"}>
              <InputLabel>{t("customer_name")}</InputLabel>
              <CustomerAutoComplete

              // register={register}
              // getCustomer={handleGetCustomer}
              />
            </Grid2>
            <Grid2 size={2} gap={1} display={"grid"}>
              <InputLabel>{t("Contact_Number")}</InputLabel>
              <TextField
                fullWidth
                size="small"
                disabled
                value={customer?.contactNumber}
              />
            </Grid2>
            <Grid2 size={2} gap={1} display={"grid"}>
              <InputLabel>{t.invoice?.Warehouse} </InputLabel>
              <WarehouseAutoComplete
              // register={register}
              // getWarehouse={handleGetWarehouse}
              />
            </Grid2>
            <Grid2 size={2} gap={1} display={"grid"}>
              <InputLabel>{t("Currency")}</InputLabel>
              <CurrenciesAutoComplete
              // register={register}
              // onSelected={handleSelectCurrency}
              />
            </Grid2>
          </Grid2>
          <DataTable t={t} register={register} /> */}
        </DialogContent>
        <DialogActions>
          <Box display={"flex"} justifyContent="space-between" width={"100%"}>
            <Box display="flex" columnGap={"1rem"}>
              <Button variant="outlined">{t("reset")}</Button>
              <Button variant="outlined" onClick={handleOpenDialogBox}>
                {t("cancel")}
              </Button>
            </Box>
            <Box display="flex" columnGap={"1rem"}>
              <Button
                variant="contained"
                onClick={handleSubmit(onSubmitFunction)}
                loading={isUpdating}
              >
                {t("save")}
              </Button>
              <Button variant="outlined" disabled>
                {t("print_invoice")}
              </Button>
              {/* <PrintInvoice  /> */}
              {/* <PrintTable /> */}
              <Button variant="outlined" disabled>
                {t("print_warehouse_receipt")}
              </Button>
            </Box>
          </Box>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};

export default EditSalesInvoice;
