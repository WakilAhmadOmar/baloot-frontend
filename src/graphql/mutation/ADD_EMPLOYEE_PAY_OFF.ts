import { gql } from "@apollo/client";

const ADD_EMPLOYEE_PAY_OFF = gql`
mutation AddEmployeePayOff($payOffObject: PayOffObjectInput!) {
  addEmployeePayOff(payOffObject: $payOffObject) {
    _id
   amount
  }
}
`;
export { ADD_EMPLOYEE_PAY_OFF };
