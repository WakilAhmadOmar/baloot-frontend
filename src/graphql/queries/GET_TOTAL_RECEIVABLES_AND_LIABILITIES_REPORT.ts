import { gql } from "@apollo/client";

const GET_TOTAL_RECEIVABLES_AND_LIABILITIES_REPORT = gql`
query GetTotalReceivablesAndLiabilitiesReport {
  getTotalReceivablesAndLiabilitiesReport {
    liabilities {
      totalAmount
      currencyId {
        _id
        name
        symbol
      }
    }
    receivables {
      currencyId {
        _id
        name
        symbol
      }
      totalAmount
    }
  }
}
  `
  export {GET_TOTAL_RECEIVABLES_AND_LIABILITIES_REPORT}