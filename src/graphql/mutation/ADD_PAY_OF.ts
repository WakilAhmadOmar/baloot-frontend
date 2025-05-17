import { gql } from "@apollo/client";

const ADD_PAY_OFF = gql`
mutation AddPayOff($payOffObject: PayOffObjectInput!) {
  addPayOff(payOffObject: $payOffObject) {
    _id
    payerType
   amount
  }
}
`;
export { ADD_PAY_OFF };
