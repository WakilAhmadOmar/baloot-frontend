import { gql } from "@apollo/client";

const DELETE_CUSTOMER_PAY_OFF = gql`
mutation deleteCustomerPayOff($payOffId: ID!) {
  deleteCustomerPayOff(payOffId: $payOffId) {
    message
  }
}
`
export {DELETE_CUSTOMER_PAY_OFF}