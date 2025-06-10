import { gql } from "@apollo/client"

const UPDATE_EMPLOYEE_PAY_OFF = gql`
mutation updateEmployeePayOff($payOffId: ID!, $payOffObject: UpdatePayOffObjectInput!) {
  updateEmployeePayOff(payOffId: $payOffId, payOffObject: $payOffObject) {
    _id
    amount
  }
}
`
export {UPDATE_EMPLOYEE_PAY_OFF}