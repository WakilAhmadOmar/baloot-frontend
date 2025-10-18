import { gql } from "@apollo/client/core";

const GET_CUSTOMER_TRANSACTION_BALANCE_BY_CUSTOMER_ID = gql`
  query GetCustomerTransactionBalanceByCustomerId($customerId: ID!) {
    getCustomerTransactionBalanceByCustomerId(customerId: $customerId) {
      currencyId {
        _id
        name
      }
      debitAmount
      creditAmount
    }
  }
`;

export { GET_CUSTOMER_TRANSACTION_BALANCE_BY_CUSTOMER_ID };
