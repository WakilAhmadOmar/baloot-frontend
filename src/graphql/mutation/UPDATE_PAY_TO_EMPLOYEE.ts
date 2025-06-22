import { gql } from "@apollo/client"

const UPDATE_PAY_TO_EMPLOYEE = gql`
mutation updatePayToEmployee($payOffId: ID!, $payOffObject: UpdatePayOffObjectInput!) {
  updatePayToEmployee(payOffId: $payOffId, payOffObject: $payOffObject) {
    _id
    amount
  }
}
`
export {UPDATE_PAY_TO_EMPLOYEE}