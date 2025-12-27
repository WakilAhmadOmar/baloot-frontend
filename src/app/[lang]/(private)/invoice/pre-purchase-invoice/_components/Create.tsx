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
  Paper,
  Slide,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { CloseSquare } from "iconsax-react";
import { forwardRef, useCallback, useContext, useState } from "react";
import { InvoiceContext } from "../../_components/invoiceContext";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useSchemaCrateForm, { CreateFormSchema } from "./table-container.schema";
import { AppContext } from "@/provider/appContext";
import { PrintInvoice } from "./print-invoice";
import { useTranslations } from "next-intl";
import { useAddSellsBillMutation } from "@/hooks/api/invoice/mutations/use-add-sells-bill";
import { PrintWarehouseReceipt } from "./print-warehouse-receipt";
import EditableProductTable from "./Table";
import { useAddReceiveCustomerMutation } from "@/hooks/api/transactions/mutations/use-add-receive-customer-mutation";
import CashBoxAutoComplete from "@/components/Auto/cashBoxAutoComplete";
import { useAddBuyBillMutation } from "@/hooks/api/invoice/mutations/use-add-buy-bill";
import { useAddPayToCustomerMutation } from "@/hooks/api/transactions/mutations/use-add-pay_to_customer-mutation";
import { useAddPreBuyBillMutation } from "@/hooks/api/invoice/mutations/use-add-pre-buy-bill";
import { InvoiceStatus } from "@/types/invoice/invice.type";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreatePurchaseInvoice = () => {
  const t = useTranslations("invoice");

  const methods = useForm<CreateFormSchema>({
    resolver: yupResolver(useSchemaCrateForm(t)) as any,
    defaultValues: {
      products: [],
      paymentMethod: "cash",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = methods;

  const { paymentOff, setPaymentOff } = useContext(InvoiceContext);
  const { setHandleError } = useContext(AppContext);

  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();

  const { mutate: addPreBuyBillMutation, isLoading } =
    useAddPreBuyBillMutation();
  const { mutate: addPayToCustomer, isLoading: isLoadingReceive } =
    useAddPayToCustomerMutation({
      onSuccess: (data) => {},
    });

  const handleOpenDialogBox = () => {
    setOpenDialog(!openDialog);
    setPaymentOff(null);
    resetInvoiceFunction();
  };

  function formatToYMD(value: Date) {
    const d = new Date(value);
    if (isNaN(d.getTime())) return null;
    d.setHours(0, 0, 0, 0); // strip time
    return d;
  }
  const onSubmitFunction = async (data: CreateFormSchema) => {
    const variablesPayment = {
      payOffObject: {
        amount: parseFloat(`${data?.totalPriceAfterExpense}`),
        payerId: data?.payerId,
        receiver: data?.customerId,
        currencyId: data?.currencyId,
        invoiceType: "PayOffBill",
        payerType: "Safe",
        receiverType: "Customer",
      },
    };

    let paymentMethod;
    if (!paymentOff?._id) {
      paymentMethod = await new Promise((resolve, reject) => {
        addPayToCustomer(variablesPayment, {
          onSuccess: (result) => {
            resolve(result);
          },
          onError: (error: any) => {
            setHandleError({
              message: error.message,
              status: "error",
              open: true,
            });
            reject(error);
          },
        });
      });
    }

    const variables = {
      preBuyBillObject: {
        billDate: new Date(),
        currencyId: data?.currencyId,
        customerId: data?.customerId,
        entrepotId: data?.warehouseId,
        products: data?.products?.map((item: any) => {
          const productMeasures = item?.price
            ?.filter((measure: any) => measure?.selected)
            ?.map((dataItem: any) => {
              return {
                measureId: dataItem?.measureId?._id,
                amountOfProduct: dataItem?.quantity,
                pricePerMeasure: dataItem?.buyPrice,
                consumptionPrice: dataItem?.expense || 0,
              };
            });
          return {
            productId: item?.productId,
            productMeasures,
            // entrepotId: item?.warehouse?._id || data?.warehouseId,
            expireInDate: item?.expireInDate?.toISOString().slice(0, 10),
            // expireInDate:"2031-11-30",
          };
        }),
        // totalPrice: data?.totalPrice,
        totalPriceOfBillAfterConsumption: data?.totalPriceAfterExpense,
        transactionId: paymentOff?._id || (paymentMethod as any)?._id,
        status: InvoiceStatus.InProgress,
      },
    };
    console.log("variable", variables);
    addPreBuyBillMutation(variables, {
      onSuccess: () => {
        setHandleError({
          message: t("this_bill_successfully_saved"),
          status: "success",
          open: true,
        });
      },
      onError: (error: any) => {
        setHandleError({
          status: "error",
          message: error?.message,
          open: true,
        });
      },
    });
  };

  const resetInvoiceFunction = useCallback(() => {
    //reset the context
    setPaymentOff(null);

    reset();
  }, []);

  console.log("errors", errors);
  return (
    <FormProvider {...methods}>
      <Paper>
        <Button variant="contained" size="large" onClick={handleOpenDialogBox}>
          {t("add_new_pre_purchase_invoice")}
        </Button>
        <Dialog
          fullScreen
          open={openDialog}
          onClose={handleOpenDialogBox}
          TransitionComponent={Transition}
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
                {t("pre_purchase_invoice")}
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
              <Grid2 size={2} gap={1} display={"grid"}>
                <InputLabel required>
                  {" "}
                  {t("safe")} ( {t("payer")} ){" "}
                </InputLabel>
                <CashBoxAutoComplete name={"payerId"} />
              </Grid2>
            </Grid2>
            <EditableProductTable />
          </DialogContent>
          <DialogActions>
            <Box display={"flex"} justifyContent="space-between" width={"100%"}>
              <Box display="flex" columnGap={"1rem"}>
                <Button variant="outlined" onClick={resetInvoiceFunction}>
                  {t("reset")}
                </Button>
                <Button variant="outlined" onClick={handleOpenDialogBox}>
                  {t("cancel")}
                </Button>
              </Box>
              <Box display="flex" columnGap={"1rem"}>
                <Button
                  variant="contained"
                  onClick={handleSubmit(onSubmitFunction)}
                  loading={isLoading || isLoadingReceive}
                >
                  {t("save")}
                </Button>
                {/* <Button variant="outlined" disabled>
                {t("print_invoice")}
              </Button> */}
                <PrintInvoice />
                {/* <PrintTable /> */}
                {/* <Button variant="outlined">
                  {t("print_warehouse_receipt")}
                </Button> */}
                <PrintWarehouseReceipt />
              </Box>
            </Box>
          </DialogActions>
        </Dialog>
      </Paper>
    </FormProvider>
  );
};

export default CreatePurchaseInvoice;
