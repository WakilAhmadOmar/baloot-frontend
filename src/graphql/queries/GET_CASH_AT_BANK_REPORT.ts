import { gql } from "@apollo/client";

const GET_CASH_AT_BANK_REPORT = gql`
query GetCashAtBankReport {
  getCashAtBankReport {
    currencyId {
      _id
      name
      symbol
    }
    totalAmount
  }
}
  `
  export {GET_CASH_AT_BANK_REPORT}