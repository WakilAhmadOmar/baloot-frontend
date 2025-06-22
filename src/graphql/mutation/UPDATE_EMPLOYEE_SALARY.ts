import { gql } from "@apollo/client";

const UPDATE_EMPLOYEE_SALARY = gql`
  mutation($transactionId: ID!, $salaryObject: SubmitSalaryObjectInput!){
  updateEmployeeSalary(transactionId: $transactionId, salaryObject: $salaryObject){
    _id
    amount
  }
}`;

export { UPDATE_EMPLOYEE_SALARY };