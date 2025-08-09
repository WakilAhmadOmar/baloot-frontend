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
import DataTable from "./Table";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useSchemaCrateForm, { CreateFormSchema } from "./create-form.schema";
import { useApolloClient } from "@apollo/client";
import { AppContext } from "@/provider/appContext";
import { PrintInvoice } from "./print-invoice";
import { useTranslations } from "next-intl";
import { useAddSellsBillMutation } from "@/hooks/api/invoice/mutations/use-add-sells-bill";
import { PrintWarehouseReceipt } from "./print-warehouse-receipt";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateSalesInvoice = () => {
  const t = useTranslations("invoice");

  const methods = useForm<CreateFormSchema>({
    resolver: yupResolver(useSchemaCrateForm(t)),
    defaultValues: {
      customerId: "",
      warehouseId: "",
      currencyId: "",
      totalPrice: 0,
      contact_number: "",
      totalPriceAfterDiscount: 0,
      products: [
        {
          productId: "",
          measures: [],
          warehouse: null,
          expireInDate: new Date(),
        },
      ],
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    setValue,
  } = methods;

  const { customer, paymentOff } = useContext(InvoiceContext);
  const { setHandleError } = useContext(AppContext);

  const [openDialog, setOpenDialog] = useState(false);
  // const [loadingPage, setLoadingPage] = useState(false);
  const client = useApolloClient();
  const theme = useTheme();

  const { mutate: addSellsBillMutation, isLoading } = useAddSellsBillMutation();

  const handleOpenDialogBox = () => {
    setOpenDialog(!openDialog);
  };
  // const handleGetCustomer = (data: any) => {
  //   setCustomer(data);
  // };
  // const handleGetWarehouse = (data: any) => {
  //   setWarehouse(data);
  // };
  // const handleSelectCurrency = (data: any) => {
  //   setCurrency(data);
  // };
  const onSubmitFunction = async (data: CreateFormSchema) => {
    const variables = {
      sellBillObject: {
        billDate: new Date(),
        currencyId: data?.currencyId,
        customerId: data?.customerId,
        entrepotId: data?.warehouseId,
        // isPaid: paymentOff?._id ? true : false,
        products: data?.products?.map((item: any) => {
          const allProduct = item?.measures
            ?.filter((measure: any) => measure?.selected)
            ?.map((dataItem: any) => ({
              count: dataItem?.amount,
              discountPercentage: dataItem?.discount || 0,
              entrepotId: item?.warehouse?._id || data?.warehouseId,
              measureId: dataItem?.measureId,
              pricePerMeasure: dataItem?.sellPrice,
              productId: item?.productId,
              expireInDate: item?.expireInDate,
            }));
          return {
            ...allProduct?.[0],
          };
        }),
        // status: "Accepted",
        totalPrice: data?.totalPrice,
        totalPriceAfterDiscount: data?.totalPriceAfterDiscount,
        transactionId: paymentOff?._id,
        receiveAmount: paymentOff?.amount,
      },
    };
    
    addSellsBillMutation(variables, {
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
    reset();
  }, []);
  return (
    <FormProvider {...methods}>
      <Box>
        <Button variant="contained" size="large" onClick={handleOpenDialogBox}>
          {t("add_new_sales_invoice")}
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
                {t("sales_invoice")}
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
            </Grid2>
            <DataTable />
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
                  loading={isLoading}
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
      </Box>
    </FormProvider>
  );
};

export default CreateSalesInvoice;
