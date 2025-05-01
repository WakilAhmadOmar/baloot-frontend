import CurrenciesAutoComplete from "@/components/Auto/currencyAutoComplete";
import CustomerAutoComplete from "@/components/Auto/customerAutoComplete";
import WarehouseAutoComplete from "@/components/Auto/WarehouseAutoComplete";
import { useGetSellsBillByIdQuery } from "@/hooks/api/invoice/queries/get-sells-bill-by-id-query";
import { Box, Grid2, InputLabel, TextField } from "@mui/material";
import DataTable from "./Table";
import { useContext, useEffect, useMemo } from "react";
import { InvoiceContext } from "../../../_components/invoiceContext";
import { useFormContext } from "react-hook-form";

type EditFormPrice = {
  id: string;
  t: any;
  getDefaultValue: (data:any) => void
};

export const EditForm = ({ id, t , getDefaultValue }: EditFormPrice) => {
  const { register , setValue  } = useFormContext();
  const { customer, paymentOff, rows, setRows, sellBillPrice } =
    useContext(InvoiceContext);
  const { data: sellsBill } = useGetSellsBillByIdQuery({ billId: id });
 useEffect(() => {
    if (sellsBill?._id){
      // getDefaultValue(sellsBill)
      setValue("customerId" , sellsBill?.customerId?._id)
      setValue("contactNumber" , sellsBill?.customerId?.contactNumber)
      setValue("currencyId" , sellsBill?.currencyId?._id)
      console.log("sellsBill" , sellsBill)
      setRows(sellsBill?.products?.map((item:any)=> ({...item , id:item?.productId?._id})))
    }
  }, [sellsBill?._id])
  return (
    <Box>

     {sellsBill?._id && <Grid2 container columnSpacing={3} rowSpacing={3}>
        <Grid2 size={3} gap={1} display={"grid"}>
          <InputLabel>{t?.invoice?.customer_name}</InputLabel>
          <CustomerAutoComplete

          // register={register}
          // getCustomer={handleGetCustomer}
          />
        </Grid2>
        <Grid2 size={2} gap={1} display={"grid"}>
          <InputLabel>{t?.invoice?.Contact_Number}</InputLabel>
          <TextField
            fullWidth
            size="small"
            disabled
            {...register("contactNumber" , { required:true})}
            name="contactNumber"
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
          <InputLabel>{t?.invoice?.Currency}</InputLabel>
          <CurrenciesAutoComplete
          // register={register}
          // onSelected={handleSelectCurrency}
          />
        </Grid2>
      </Grid2>}
      {sellsBill?._id &&  <DataTable t={t}  />}
    </Box>
  );
};
