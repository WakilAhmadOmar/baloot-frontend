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
import { ADD_SELLS_BILL } from "@/graphql/mutation/ADD_SELLS_BILL";
import { AppContext } from "@/provider/appContext";
import { PrintInvoice } from "./print-invoice";
import PrintTable from "./table-print";
import { useTranslations } from "next-intl";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

interface IProps {
  onCreated?: (billInfo: any) => void;
}

const CreateSalesInvoice: React.FC<IProps> = ({ onCreated }) => {
  const t = useTranslations("invoice");

  const methods = useForm<CreateFormSchema>({
    resolver: yupResolver(useSchemaCrateForm(t)),
    defaultValues: {
      customerId: "",
      warehouseId: "",
      currencyId: "",
      products: [
        {
          productId: "",
          measures: [],
          warehouse: null,
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
  } = methods;

  const { customer, paymentOff, rows, setRows, sellBillPrice } =
    useContext(InvoiceContext);
  const { setHandleError } = useContext(AppContext);

  const [openDialog, setOpenDialog] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const client = useApolloClient();
  const theme = useTheme();
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
    setLoadingPage(true);
    try {
      const variables = {
        sellBillObject: {
          billDate: new Date(),
          currencyId: data?.currencyId,
          customerId: data?.customerId,
          entrepotId: data?.warehouseId,
          // isPaid: paymentOff?._id ? true : false,
          products: rows?.map((item: any) => {
            const allProduct = item?.measures
              ?.filter((measure: any) => measure?.selected)
              ?.map((dataItem: any) => ({
                count: dataItem?.amount,
                discountPercentage: dataItem?.discount || 0,
                entrepotId: item?.warehouse?._id || data?.warehouseId,
                measureId: dataItem?.measureId?._id,
                pricePerMeasure: dataItem?.sellPrice,
                productId: item?._id,
              }));
            return {
              ...allProduct?.[0],
            };
          }),
          // status: "Accepted",
          totalPrice: sellBillPrice?.totalPrice,
          totalPriceAfterDiscount: sellBillPrice?.totalPrice,
          transactionId: paymentOff?._id,
          receiveAmount: paymentOff?.amount,
        },
      };
      const {
        data: { addSellsBill },
      } = await client.mutate({
        mutation: ADD_SELLS_BILL,
        variables,
      });
      if (addSellsBill?._id && onCreated) {
        onCreated(addSellsBill);
      }
      setLoadingPage(false);
      setHandleError({
        message: "Action successfully recorded.",
        type: "success",
        open: true,
      });
    } catch (error: any) {
      setLoadingPage(false);
      setHandleError({
        type: "error",
        message: error?.message,
        open: true,
      });
    }
  };
  const resetInvoiceFunction = useCallback(() => {
    reset();
    setRows(null);
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
                <CustomerAutoComplete/>
              </Grid2>
              <Grid2 size={2} gap={1} display={"grid"}>
                <InputLabel>{t("Contact_Number")}</InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  disabled
                  value={customer?.contactNumber ?? ""}
                />
              </Grid2>
              <Grid2 size={2} gap={1} display={"grid"}>
                <InputLabel>{t("Warehouse")} </InputLabel>
                <WarehouseAutoComplete/>
              </Grid2>
              <Grid2 size={2} gap={1} display={"grid"}>
                <InputLabel>{t("Currency")}</InputLabel>
                <CurrenciesAutoComplete dir={t("dir")} isBaseCurrency/>
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
                  loading={loadingPage}
                >
                  {t("save")}
                </Button>
                {/* <Button variant="outlined" disabled>
                {t("print_invoice")}
              </Button> */}
                <PrintInvoice t={t} />
                {/* <PrintTable /> */}
                <Button variant="outlined" disabled>
                  {t("print_warehouse_receipt")}
                </Button>
              </Box>
            </Box>
          </DialogActions>
        </Dialog>
      </Box>
    </FormProvider>
  );
};

export default CreateSalesInvoice;
