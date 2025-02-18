import { gql } from "@apollo/client";

const ADD_PAY_OFF = gql`
mutation($payOffObject: PayOffObjectInput!){
addPayOff(payOffObject:$payOffObject){
  _id
}
}
`;
export { ADD_PAY_OFF };
