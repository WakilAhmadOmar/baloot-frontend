import { gql } from "@apollo/client";

const GET_FINANCIAL_REPORTS_FOR_SELL_PRODUCTS = gql`
query GetFinantialReportsForSellProducts {
  getFinantialReportsForSellProducts {
    currencyId {
      name
      _id
      symbol
    }
    totalAmount
  }
}
`;

export { GET_FINANCIAL_REPORTS_FOR_SELL_PRODUCTS };