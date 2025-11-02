import { gql } from "@apollo/client";


const GET_FINANCIAL_REPORTS_FOR_BUY_PRODUCTS = gql`
query GetFinantialReportsForBuyProducts {
  getFinantialReportsForBuyProducts {
    currencyId {
      name
      _id
      symbol
    }
    totalAmount
  }
}
`;

export { GET_FINANCIAL_REPORTS_FOR_BUY_PRODUCTS };