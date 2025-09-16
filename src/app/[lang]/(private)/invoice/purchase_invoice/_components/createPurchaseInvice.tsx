"use client";
import CustomerAutoComplete from "@/components/Auto/customerAutoComplete";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  Grid2,
  IconButton,
  InputLabel,
  Radio,
  RadioGroup,
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
import { useForm } from "react-hook-form";
import useSchemaCrateForm, { CreateFormSchema } from "./create-form.schema";
import { yupResolver } from "@hookform/resolvers/yup"
import { numberToWords } from "@/utils/numberToWords";
import PaymentComponent from "../../_components/PaymentComponent";

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
  const schemaCreateForm = useSchemaCrateForm(t)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CreateFormSchema>({
    resolver: yupResolver(schemaCreateForm),
  })
  const {
    customer,
    setCustomer,
    warehouse,
    setWarehouse,
    currency,
    setCurrency,
    billPrice,
    paymentOff
  } = useContext(InvoiceContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [statusPayment, setStatusPayment] = useState<"cash" | "loan">("cash");

  const handleOpenDialogBox = () => {
    setOpenDialog(!openDialog);
  };
  // //store customer
  const handleGetCustomer = useCallback(
    (selectedCustomer: any) => {
      setCustomer(selectedCustomer);
    },
    [customer]
  );
  // //store warehouse
  // const handleGetWarehouse = useCallback(
  //   (selectedWarehouse: any) => {
  //     setWarehouse(selectedWarehouse);
  //   },
  //   [warehouse]
  // );
  const handleSelectCurrency = useCallback(
    (selectedCurrency: any) => {

      setCurrency(selectedCurrency);
    },
    [currency]
  );
   const handleChangePaymentStatus = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const values = (event.target as HTMLInputElement).value;
      if (values === "cash" || values === "loan") {
        setStatusPayment(values);
      }
    };
  const onSubmitFunction = (data:CreateFormSchema) => {

  }
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
              <CustomerAutoComplete    getCustomer={handleGetCustomer}/>
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
              <WarehouseAutoComplete  />
            </Grid2>
            <Grid2 size={2}>
              <InputLabel>{t?.invoice?.Currency}</InputLabel>
              <CurrenciesAutoComplete   onSelected={handleSelectCurrency}/>
            </Grid2>
            {/* <Grid2 size={4}>
              <ProductsAutoComplete getProduct={handleGetSelectedProduct}  />
            </Grid2> */}

          </Grid2>
          
          {/* <FormFactor register={register} errors={errors} />
            <TableFactore /> */}
            <TablePurchaseInvoice t={t} />
                  <Grid2
                    container
                    spacing={3}
                    maxWidth="100%"
                    justifyContent="space-between"
                    sx={{ marginTop: "1.5rem" }}
                  >
                    <Grid2  size={8}>
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="radio-buttons-group"
                          onChange={handleChangePaymentStatus}
                          value={statusPayment}
                        >
                          <FormControlLabel
                            value="cash"
                            control={<Radio />}
                            label={t?.invoice?.cash_payment}
                          />
                          <FormControlLabel
                            value="loan"
                            control={<Radio />}
                            label={t?.invoice?.total_invoice_on_credit}
                          />
                        </RadioGroup>
                      </FormControl>
                      <PaymentComponent
                          customer={"Ahmad"}
                          amount={billPrice?.totalPrice}
                          customerId={""}
                          paymentStatus={statusPayment}
                          t={t}
                          register={register}
                        />
                    </Grid2>
                    <Grid2  size={4} marginTop={3}>
                      <Box
                        sx={{ borderBottom: `2px solid ${theme.palette?.grey[100]}` }}
                        display="grid"
                        gridTemplateColumns={"50% 50%"}
                        columnGap="1rem"
                        
                        
                      >
                        <Box bgcolor={theme.palette?.grey[100]} p={1}  paddingInlineStart={2}>
                          {" "}
                          <Typography>{t?.invoice?.total_invoice_amount}</Typography>
                        </Box>
                        <Typography alignItems={"center"} display="grid">
                          {billPrice.price}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ borderBottom: `1px solid ${theme.palette?.grey[100]}` }}
                        display="grid"
                        gridTemplateColumns={"50% 50%"}
                        columnGap="1rem"
                        
                      >
                        <Box bgcolor={theme.palette?.grey[100]} p={1}  paddingInlineStart={2}>
                          {" "}
                          <Typography>{t?.invoice?.total_expense}</Typography>
                        </Box>
                        <Typography alignItems={"center"} display="grid">
                          {billPrice?.consumption}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ borderBottom: `1px solid ${theme.palette?.grey[100]}` }}
                        display="grid"
                        gridTemplateColumns={"50% 50%"}
                        columnGap="1rem"
                        
                      >
                        <Box bgcolor={theme.palette?.grey[100]} p={1}  paddingInlineStart={2}>
                          {" "}
                          <Typography>{t?.invoice?.total_invoice_after_expense} </Typography>
                        </Box>
                        <Typography alignItems={"center"} display="grid">
                          {billPrice?.totalPrice}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ borderBottom: `1px solid ${theme.palette?.grey[100]}` }}
                        display="grid"
                        gridTemplateColumns={"50% 50%"}
                        columnGap="1rem"
                        alignItems={"center"}
                        
                      >
                        <Box bgcolor={theme.palette?.grey[100]} p={1}  paddingInlineStart={2}>
                          {" "}
                          <Typography>{t?.invoice?.receipt}</Typography>
                        </Box>
                        <Typography alignItems={"center"} display="grid">
                          {paymentOff?.payAmount || 0}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ borderBottom: `1px solid ${theme.palette?.grey[100]}` }}
                        display="grid"
                        gridTemplateColumns={"50% 50%"}
                        columnGap="1rem"
                        
                      >
                        <Box bgcolor={theme.palette?.grey[100]} p={1}  paddingInlineStart={2}>
                          {" "}
                          <Typography>{t?.invoice?.remaining}</Typography>
                        </Box>
                        <Typography>
                          {billPrice?.totalPrice - (paymentOff?.payAmount || 0)}
                        </Typography>
                      </Box>
                    </Grid2>
                  </Grid2>
                  <Box display="flex" columnGap={"1rem"}>
                    <Typography variant="overline" bgcolor={theme.palette.grey[100]}>
                            {t?.invoice?.total_invoice_after_discount_in_words} :
                    </Typography>
                    <Typography variant="overline">
                      {numberToWords(billPrice?.totalPrice)}
                    </Typography>
                  </Box>
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
