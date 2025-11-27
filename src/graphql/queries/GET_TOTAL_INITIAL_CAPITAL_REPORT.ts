import { gql } from "@apollo/client";

const GET_TOTAL_INITIAL_CAPITAL_REPORT = gql`
  query GetTotalInitialCapitalReport {
    getTotalInitialCapitalReport {
      currencyId {
        _id
        name
        symbol
      }
      totalAmount
    }
  }
`;
export { GET_TOTAL_INITIAL_CAPITAL_REPORT }