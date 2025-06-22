import { gql } from "@apollo/client";



const SUBMIT_EMPLOYEE_SALARY = gql`
mutation SubmitEmployeeSalary($salaryObject: SubmitSalaryObjectInput! ) {
  submitEmployeeSalary(salaryObject: $salaryObject) {
    _id

  }
}
`

export {SUBMIT_EMPLOYEE_SALARY }