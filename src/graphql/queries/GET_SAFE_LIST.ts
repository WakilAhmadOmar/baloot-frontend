import { gql } from "@apollo/client";

const GET_SAFE_LIST = gql`
  query GetSafeList {
  getSafeList {
    _id
    name
    address
    cashier {
      _id
      name
      fathersName
    }
    cashierPhoneNumber
    firstPeriodCredit {
      createdAt
      currencyId {
        _id
        name
        symbol
      }
      amount
      creditType
    }
    description
    createdAt
  }
}
`;
export { GET_SAFE_LIST };
