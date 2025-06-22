import { gql } from "@apollo/client";

const UPDATE_PAY_TO_CUSTOMER = gql`
mutation updatePayToCustomer($payOffId: ID!, $payOffObject: UpdatePayOffObjectInput!) {
  updatePayToCustomer(payOffId: $payOffId, payOffObject: $payOffObject) {
    _id
    amount
  }
}
`
export {UPDATE_PAY_TO_CUSTOMER}