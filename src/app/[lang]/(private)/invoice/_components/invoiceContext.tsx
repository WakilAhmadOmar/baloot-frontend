"use client";
import { createContext, PropsWithChildren, useState } from "react";

export const InvoiceContext = createContext<any>({});

const InvoiceContextProvider = ({ children }: PropsWithChildren) => {
  const [customer, setCustomer] = useState();
  const [warehouse, setWarehouse] = useState();
  const [baseCurrency, setBaseCurrency] = useState();
  const [paymentOff, setPaymentOff] = useState<any>({});
  const [sellBillPrice, setSellBillPrice] = useState({
    totalPrice: 0,
    discount: 0,
    price: 0,
    payment: 0,
  });
  const [rows, setRows] = useState<any>([]);
  const [billPrice, setBillPrice] = useState({
    totalPrice: 0,
    consumption: 0,
    price: 0,
    payment: 0,
  });
  const [productBilState, setProductBilState] = useState<any[]>([]);
  return (
    <InvoiceContext.Provider
      value={{
        customer,
        setCustomer,
        warehouse,
        setWarehouse,
        baseCurrency,
        setBaseCurrency,
        paymentOff,
        setPaymentOff,
        billPrice,
        setBillPrice,
        productBilState,
        setProductBilState,
        rows,
        setRows,
        sellBillPrice,
        setSellBillPrice,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export default InvoiceContextProvider;
