import { gql } from "@apollo/client";

const ADD_EMPLOYEE_CREDIT = gql`
mutation AddEmployeeCredit($employeeId: ID!, $creditObject: [CreditInput]) {
  addEmployeeCredit(employeeId: $employeeId, creditObject: $creditObject) {
    _id
    description
    credit {
      creditType
      amount
      currencyId {
        symbol
        name
        _id
      }
      createdAt
    }
  }
}
`
export {ADD_EMPLOYEE_CREDIT}