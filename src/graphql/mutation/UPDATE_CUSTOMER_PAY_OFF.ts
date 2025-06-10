import { gql } from "@apollo/client";

const UPDATE_CUSTOMER_PAY_OFF = gql`
mutation updateCustomerPayOff($payOffId: ID!, $payOffObject: UpdatePayOffObjectInput!) {
  updateCustomerPayOff(payOffId: $payOffId, payOffObject: $payOffObject) {
    _id
    amount
  }
}
`
export {UPDATE_CUSTOMER_PAY_OFF}