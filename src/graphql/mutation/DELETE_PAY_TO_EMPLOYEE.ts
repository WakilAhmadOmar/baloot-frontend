import { gql } from "@apollo/client";

const DELETE_PAY_TO_EMPLOYEE = gql`
mutation deletePayToEmployee($payOffId: ID!) {
  deletePayToEmployee(payOffId: $payOffId) {
    message
  }
}
`
export {DELETE_PAY_TO_EMPLOYEE}