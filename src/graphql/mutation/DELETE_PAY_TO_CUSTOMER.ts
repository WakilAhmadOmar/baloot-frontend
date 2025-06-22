import { gql } from "@apollo/client";

const DELETE_PAY_TO_CUSTOMER = gql`
mutation deletePayToCustomer($payOffId: ID!) {
  deletePayToCustomer(payOffId: $payOffId) {
    message
  }
}
`
export {DELETE_PAY_TO_CUSTOMER}