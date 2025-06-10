import { gql } from "@apollo/client";

const DELETE_PAY_OFF = gql`
mutation DeletePayOff($payOffId: ID!) {
  deletePayOff(payOffId: $payOffId) {
    message
  }
}
`
export {DELETE_PAY_OFF}