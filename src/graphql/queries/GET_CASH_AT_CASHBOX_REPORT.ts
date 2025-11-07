import { gql } from "@apollo/client";

const GET_CASH_AT_CASHBOX_REPORT = gql`
query GetCashOnHandReport {
  getCashOnHandReport {
    currencyId {
      name
      _id
      symbol
    }
    totalAmount
  }
}

`
export {GET_CASH_AT_CASHBOX_REPORT}