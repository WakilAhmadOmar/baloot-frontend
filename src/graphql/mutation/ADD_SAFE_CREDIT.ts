import { gql } from "@apollo/client";

const ADD_SAFE_CREDIT = gql`
mutation AddSafeCredit($safeId: ID!, $creditObject: [CreditInput]) {
  addSafeCredit(safeId: $safeId, creditObject: $creditObject) {
    _id
    description
     credit {
      updatedAt
       amount
      creditType
      currencyId {
        name
        _id
        symbol
      }
    }
  }
}
`
export {ADD_SAFE_CREDIT}