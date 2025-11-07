import { gql } from "@apollo/client";

const GET_FINANCIAL_REPORTS_FOR_EXISTING_PRODUCTS = gql`
query GetFinantialReportsForExistingProducts {
  getFinantialReportsForExistingProducts {
    currencyId {
      _id
      name
      symbol
    }
    totalAmount
  }
}
`;

export { GET_FINANCIAL_REPORTS_FOR_EXISTING_PRODUCTS };