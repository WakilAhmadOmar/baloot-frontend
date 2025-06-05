import { gql } from "@apollo/client";

const ADD_CUSTOMER_PAY_OFF = gql`
mutation AddCustomerPayOff($payOffObject: PayOffObjectInput!) {
  addCustomerPayOff(payOffObject: $payOffObject) {
    _id
   amount
  }
}
`;
export { ADD_CUSTOMER_PAY_OFF };
