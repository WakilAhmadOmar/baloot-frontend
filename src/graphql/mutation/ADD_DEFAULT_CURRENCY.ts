import { gql } from "@apollo/client";

const ADD_DEFAULT_CURRENCY = gql`
  mutation ($currenciesObject: [CurrencyObjectInput]!) {
    addUserCurrencies(currenciesObject: $currenciesObject) {
      _id
      name
      symbol
      isActive
      isBase
    }
  }
`;

export { ADD_DEFAULT_CURRENCY };
