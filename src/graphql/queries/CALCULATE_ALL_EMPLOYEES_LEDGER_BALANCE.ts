import { gql } from "@apollo/client";

export const CALCULATE_ALL_EMPLOYEES_LEDGER_BALANCE = gql`
query CalculateAllEmployeesLedgerBalance($limit: Int, $page: Int) {
  calculateAllEmployeesLedgerBalance(limit: $limit, page: $page) {
    ledgerBalance {
      _id
      name
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