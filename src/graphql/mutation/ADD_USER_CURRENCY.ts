import { gql } from "@apollo/client";

const ADD_USER_CURRENCY = gql`
  mutation ($currencyObject: CurrencyObjectInput!) {
    addUserCurrency(currencyObject: $currencyObject) {
      _id
      name
      symbol
      isActive
      isBase
    }
  }
`;

export { ADD_USER_CURRENCY };
