import { gql } from "@apollo/client";

const GET_DEFAULT_CURRENCIES = gql`
query{
    getDefaultCurrencies{
      _id
      name
      symbol
      isActive
      isBase
      
    }
  }
`
export { GET_DEFAULT_CURRENCIES }