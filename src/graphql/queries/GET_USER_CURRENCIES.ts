import { gql } from "@apollo/client";

const GET_USER_CURRENCIES = gql`
  query {
    getUserCurrencies {
      _id
      name
      symbol
      isActive
      isBase
      baseRate
      createdAt
      rate
      isUsed
    }
  }
`;
export { GET_USER_CURRENCIES };
