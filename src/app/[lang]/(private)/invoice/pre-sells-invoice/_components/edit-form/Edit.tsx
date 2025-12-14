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
import {
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppContext } from "@/provider/appContext";
import { EditForm } from "./edit-form";
import { useTranslations } from "next-intl";

import { useUpdateSellsBillMutation } from "@/hooks/api/invoice/mutations/use-update-sells-bill";
import useSchemaEditForm, { EditFormSchema } from "./edit-form.schema";
import { useGetPreSellsBillById } from "@/hooks/api/invoice/queries/use-get-pre-sells-bill-by-id";

interface IProps {
  onCreated?: (billInfo: any) => void;
  id: string;
}

const EditSalesInvoice: React.FC<IProps> = ({ onCreated, id }) => {
  const t = useTranslations("invoice");
  const [openDialog, setOpenDialog] = useState(false);
  const { setHandleError } = useContext(AppContext);
  const theme = useTheme();
  const { data: billData, isLoading } = useGetPreSellsBillById(
    {
      billId: id,
    },
    openDialog
  );
  const { mutate: updateSellsBillMutation, isLoading: isUpdating } =
    useUpdateSellsBillMutation();

  const defaultValues = useMemo(() => {
    return {
      customerId: billData?.customerId?._id,
      warehouseId: billData?.entrepotId?._id,
      currencyId: billData?.currencyId?._id,
      totalPriceAfterDiscount: billData?.totalPriceAfterDiscount,
      totalPrice: billData?.totalPrice,
      contact_number: billData?.customerId?.contactNumber,
      products: billData?.products?.map((item: any) => {
        const selectedMeasures = item?.productMeasures?.map((measure: any) => ({
          measureId: measure?.measureId?._id,
          amount: measure?.amountOfProduct,
          sellPrice: measure?.pricePerMeasure,
          discount: measure?.discount,
          selected: true,
          measureName: measure?.measureId?.name,
          discountPercentage: measure?.discountPercentage,
        }));

        return {
          productId: item?.productId?._id,
          productName: item?.productId?.name,
          warehouse: item?.entrepotId?._id,
          warehouseName: item?.entrepotId?.name,
          measures: selectedMeasures,
          name: item?.productId?.name,
          id: item?.productId?._id,
          expireInDate: [item?.expireInDate],
          expireInDateSelected: new Date(
            item?.expireInDate
          )?.toLocaleDateString("en-GB"),
        };
      }),
    };
  }, [billData]);

  const methods = useForm<EditFormSchema>({
    resolver: yupResolver(useSchemaEditForm(t)),
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
  const onSubmitFunction = async (data: EditFormSchema) => {
    const variables = {
      sellBillObject: {
        billDate: new Date(billData?.billDate),
        currencyId: data?.currencyId,
        customerId: data?.customerId,
        entrepotId: data?.warehouseId,
        products: data?.products?.map((item: any) => {
          const [day, month, year] = item?.expireInDateSelected
            .split("/")
            .map(Number);
          const expireInDate = new Date(`${year}-${month}-${day + 1}`);
          const productMeasures = item?.measures
            ?.filter((measure: any) => measure?.selected)
            ?.map((dataItem: any) => {
              return {
                measureId: dataItem?.measureId,
                amountOfProduct: dataItem?.amount,
                pricePerMeasure: dataItem?.sellPrice,
                discountPercentage: dataItem?.discount || 0,
              };
            });
          return {
            productId: item?.productId,
            productMeasures,
            entrepotId: item?.warehouse?._id || data?.warehouseId,
            expireInDate: expireInDate?.toISOString()?.split("T")[0],
          };
        }),
        totalPrice: data?.totalPrice,
        totalPriceAfterDiscount: data?.totalPriceAfterDiscount,
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
              {t("edit_pre_sells_invoice")}
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
         {defaultValues?.customerId && isLoading === false && <Grid2 container columnSpacing={3} rowSpacing={3}>
            <Grid2 size={3} gap={1} display={"grid"}>
              <InputLabel>{t("customer_name")}</InputLabel>
              <CustomerAutoComplete
                getCustomer={(customer) => {
                  setValue("contact_number", customer?.contactNumber);
                }}
                dir={t("dir")}
              />
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
              <WarehouseAutoComplete dir={t("dir")} />
            </Grid2>
            <Grid2 size={2} gap={1} display={"grid"}>
              <InputLabel>{t("Currency")}</InputLabel>
              <CurrenciesAutoComplete dir={t("dir")} isBaseCurrency />
            </Grid2>
          </Grid2>}
          <EditForm isLoadingData={isLoading} />
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
