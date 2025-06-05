import { gql } from "@apollo/client";

const DELETE_EMPLOYEE_PAY_OFF = gql`
mutation deleteEmployeePayOff($payOffId: ID!) {
  deleteEmployeePayOff(payOffId: $payOffId) {
    message
  }
}
`
export {DELETE_EMPLOYEE_PAY_OFF}