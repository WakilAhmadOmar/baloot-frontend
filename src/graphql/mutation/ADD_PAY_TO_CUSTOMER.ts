import { gql } from "@apollo/client";

const ADD_PAY_TO_CUSTOMER = gql`
mutation AddPayToCustomer($payOffObject: PayOffObjectInput!) {
  addPayToCustomer(payOffObject: $payOffObject) {
    _id
   amount
  }
}
`;
export { ADD_PAY_TO_CUSTOMER };
