import { gql } from "@apollo/client";

const UPDATE_USER_CURRENCY_RATE = gql`
  mutation ($currencyId: ID!, $rate: Float!, $baseRate: Float!) {
    updateUserCurrencyRate(
      currencyId: $currencyId
      rate: $rate
      baseRate: $baseRate
    ) {
      _id
      name
      symbol
      rate
      baseRate
    }
  }
`;

export { UPDATE_USER_CURRENCY_RATE };
