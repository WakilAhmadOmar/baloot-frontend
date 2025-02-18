"use client";
import { createContext, PropsWithChildren, useState } from "react";

export const InvoiceContext = createContext<any>({});

const InvoiceContextProvider = ({ children }: PropsWithChildren) => {
  const [customer, setCustomer] = useState();
  const [warehouse, setWarehouse] = useState();
  const [currency, setCurrency] = useState();
  const [paymentOff, setPaymentOff] = useState<any>({});
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
        currency,
        setCurrency,
        paymentOff,
        setPaymentOff,
        billPrice,
        setBillPrice,
        productBilState,
        setProductBilState,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export default InvoiceContextProvider;
