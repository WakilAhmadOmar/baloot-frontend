import { gql } from "@apollo/client";

const ADD_PAY_TO_EMPLOYEE = gql`
mutation AddPayToEmployee($payOffObject: PayOffObjectInput!) {
  AddPayToEmployee(payOffObject: $payOffObject) {
    _id
   amount
  }
}
`;
export { ADD_PAY_TO_EMPLOYEE };
