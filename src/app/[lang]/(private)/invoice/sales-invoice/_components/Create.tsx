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
import { forwardRef, useContext, useState } from "react";
import { InvoiceContext } from "../../_components/invoiceContext";
import DataTable from "./Table";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useSchemaCrateForm, { CreateFormSchema } from "./create-form.schema";
import { useApolloClient } from "@apollo/client";
import { ADD_SELLS_BILL } from "@/graphql/mutation/ADD_SELLS_BILL";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

interface IProps {
  t: any;
}

const CreateSalesInvoice: React.FC<IProps> = ({ t }) => {
  const schemaCreateForm = useSchemaCrateForm(t);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CreateFormSchema>({
    resolver: yupResolver(schemaCreateForm),
  });
  const {
    customer,
    setCustomer,
    warehouse,
    setWarehouse,
    currency,
    setCurrency,
    paymentOff,
    rows,
    setRows,
    sellBillPrice
  } = useContext(InvoiceContext);

  const [openDialog, setOpenDialog] = useState(false);
  const client = useApolloClient()
  const theme = useTheme();
  const handleOpenDialogBox = () => {
    setOpenDialog(!openDialog);
  };
  const handleGetCustomer = (data: any) => {
    setCustomer(data);
  };
  const handleGetWarehouse = (data: any) => {
    setWarehouse(data);
  };
  const handleSelectCurrency = (data: any) => {
    setCurrency(data);
  };
  const onSubmitFunction = async (data: CreateFormSchema) => {
    console.log("rows" , rows)
    try {
      const variables = {
        sellBillObject: {
          billDate: new Date(),
          currencyId: currency?._id,
          customerId: customer?._id,
          entrepotId: warehouse?._id,
          isPaid: paymentOff?._id ? true : false,
          products: rows?.map((item: any) => {
            const allProduct = item?.measures
              ?.filter((measure: any) => measure?.selected)
              ?.map((data: any) => ({
                count: data?.amount,
                discountPercentage: data?.discount || 0,
                entrepotId:item?.warehouse?._id,
                measureId:data?.measureId?._id,
                pricePerMeasure:data?.sellPrice,
                productId:item?._id
              }));
              return {
                ...allProduct?.[0]
              }
          }),
          status: "Accepted",
          totalPriceAfterDiscount: sellBillPrice?.totalPrice,
          transactionId: paymentOff?._id,
        },
      };
      console.log("varialbess" , variables)
      const {data  : { addSellsBill }} = await client.mutate({
        mutation:ADD_SELLS_BILL,
        variables
      })
      console.log("addSellsBill", addSellsBill)
    } catch (error) {}
  };
  return (
    <Box>
      <Button variant="contained" size="large" onClick={handleOpenDialogBox}>
        {t?.invoice?.add_new_sales_invoice}
      </Button>
      <Dialog
        fullScreen
        open={openDialog}
        onClose={handleOpenDialogBox}
        TransitionComponent={Transition}
        dir={t.home?.dir}
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
              {t?.invoice?.sales_invoice}
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
              <InputLabel>{t?.invoice?.customer_name}</InputLabel>
              <CustomerAutoComplete
                register={register}
                getCustomer={handleGetCustomer}
              />
            </Grid2>
            <Grid2 size={2} gap={1} display={"grid"}>
              <InputLabel>{t?.invoice?.Contact_Number}</InputLabel>
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
                register={register}
                getWarehouse={handleGetWarehouse}
              />
            </Grid2>
            <Grid2 size={2} gap={1} display={"grid"}>
              <InputLabel>{t?.invoice?.Currency}</InputLabel>
              <CurrenciesAutoComplete
                register={register}
                onSelected={handleSelectCurrency}
              />
            </Grid2>
          </Grid2>
          <DataTable t={t} register={register} />
        </DialogContent>
        <DialogActions>
          <Box display={"flex"} justifyContent="space-between" width={"100%"}>
            <Box display="flex" columnGap={"1rem"}>
              <Button
                variant="contained"
                onClick={handleSubmit(onSubmitFunction)}
              >
                {t?.invoice?.save}
              </Button>
              <Button variant="outlined" onClick={handleOpenDialogBox}>
                {t?.invoice?.cancel}
              </Button>
            </Box>
            <Box display="flex" columnGap={"1rem"}>
              <Button variant="outlined">{t?.invoice?.print_invoice}</Button>
              <Button variant="outlined">
                {t?.invoice?.print_warehouse_receipt}
              </Button>
              <Button variant="outlined">{t?.invoice?.reset}</Button>
            </Box>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreateSalesInvoice;
