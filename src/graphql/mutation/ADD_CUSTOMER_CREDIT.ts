import { gql } from "@apollo/client";

const ADD_CUSTOMER_CREDIT = gql`
mutation AddCustomerCredit($customerId: ID!, $creditObject: [CreditInput]) {
  addCustomerCredit(customerId: $customerId, creditObject: $creditObject) {
    _id
    fullName
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
export {ADD_CUSTOMER_CREDIT}