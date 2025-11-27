import { gql } from "@apollo/client";

export const CALCULATE_ALL_CUSTOMERS_LEDGER_BALANCE = gql`
query CalculateAllCustomersLedgerBalance($page: Int, $limit: Int) {
  calculateAllCustomersLedgerBalance(page: $page, limit: $limit) {
    ledgerBalance {
      _id
      fullName
      contactNumber
      address
      balances {
        currencyId {
          _id
          name
          symbol
        }
        balance
      }
    }
    totalCount
    totalPages
  }
}
`