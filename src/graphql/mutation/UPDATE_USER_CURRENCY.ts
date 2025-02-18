import { gql } from "@apollo/client";

const UPDATE_USER_CURRENCY = gql`
  mutation ($currencyId: ID!, $currencyObject: CurrencyObjectInput!) {
    updateUserCurrency(
      currencyId: $currencyId
      currencyObject: $currencyObject
    ) {
      _id
      name
      symbol
      isActive
      isBase
      rate
      baseRate
    }
  }
`;

export { UPDATE_USER_CURRENCY };
