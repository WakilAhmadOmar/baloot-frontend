"use client";
import CustomerAutoComplete from "@/components/Auto/customerAutoComplete";
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
import WarehouseAutoComplete from "@/components/Auto/WarehouseAutoComplete";
import CurrenciesAutoComplete from "@/components/Auto/currencyAutoComplete";
import ProductsAutoComplete from "@/components/Auto/productAutoComplete";
import TablePurchaseInvoice from "./tablePurchaseInvoice";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

interface IPropsCreatePurchaseInvoice {
  t:any
}

const CreatePurchaseInvoicePage:React.FC<IPropsCreatePurchaseInvoice> = ({t}) => {
  const theme = useTheme();
  const {
    customer,
    setCustomer,
    warehouse,
    setWarehouse,
    currency,
    setCurrency,
  } = useContext(InvoiceContext);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialogBox = () => {
    setOpenDialog(!openDialog);
  };
  //store customer
  const handleGetCustomer = useCallback(
    (selectedCustomer: any) => {
      setCustomer(selectedCustomer);
    },
    [customer]
  );
  //store warehouse
  const handleGetWarehouse = useCallback(
    (selectedWarehouse: any) => {
      setWarehouse(selectedWarehouse);
    },
    [warehouse]
  );
  const handleSelectCurrency = useCallback(
    (selectedCurrency: any) => {

      setCurrency(selectedCurrency);
    },
    [currency]
  );
  return (
    <Box>
      <Button variant="contained" size="large" onClick={handleOpenDialogBox}>
        {t?.invoice?.New_Purchase_Invoice}
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
             {t?.invoice?.Purchase_Invoice}
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
            <Grid2 size={3}>
              <InputLabel>{t?.invoice?.Company_Name}</InputLabel>
              <CustomerAutoComplete getCustomer={handleGetCustomer} />
            </Grid2>
            <Grid2 size={2}>
              <InputLabel>{t?.invoice?.Contact_Number}</InputLabel>
              <TextField
                fullWidth
                size="small"
                disabled
                value={customer?.contactNumber}
              />
            </Grid2>
            <Grid2 size={2}>
              <InputLabel>{t.invoice?.Warehouse} </InputLabel>
              <WarehouseAutoComplete getWarehouse={handleGetWarehouse} />
            </Grid2>
            <Grid2 size={2}>
              <InputLabel>{t?.invoice?.Currency}</InputLabel>
              <CurrenciesAutoComplete onSelected={handleSelectCurrency} />
            </Grid2>
            {/* <Grid2 size={4}>
              <ProductsAutoComplete getProduct={handleGetSelectedProduct}  />
            </Grid2> */}

          </Grid2>
          
          {/* <FormFactor register={register} errors={errors} />
            <TableFactore /> */}
            <TablePurchaseInvoice t={t} />
        </DialogContent>
        <DialogActions>
          <Box display={"flex"} justifyContent="space-between" width={"100%"}>
            <Box display="flex" columnGap={"1rem"}>
              <Button
                variant="contained"
                //   onClick={handleSubmit(onSubmitFunction)}
              >
                {t?.invoice?.save}
              </Button>
              <Button variant="outlined" onClick={handleOpenDialogBox}>
                {t?.invoice?.cancel}
              </Button>
            </Box>
            <Box display="flex" columnGap={"1rem"}>
              <Button variant="outlined">{t?.invoice?.print_invoice}</Button>
              <Button variant="outlined">{t?.invoice?.print_warehouse_receipt}</Button>
              <Button variant="outlined">{t?.invoice?.reset}</Button>
            </Box>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default CreatePurchaseInvoicePage;
