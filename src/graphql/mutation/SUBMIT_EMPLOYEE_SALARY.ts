import { gql } from "@apollo/client";



const SUBMIT_EMPLOYEE_SALARY = gql`
mutation SubmitEmployeeSalary($creditObject: PersonCreditInput, $employeeId: ID!) {
  submitEmployeeSalary(creditObject: $creditObject, employeeId: $employeeId) {
    _id
    credit {
      amount
      currencyId {
        _id
      }
    }
  }
}
`

export {SUBMIT_EMPLOYEE_SALARY }