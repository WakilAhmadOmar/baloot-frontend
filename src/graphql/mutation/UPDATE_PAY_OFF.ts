import { gql } from "@apollo/client";

const UPDATE_PAY_OFF = gql`
mutation UpdatePayOff($payOffId: ID!, $payOffObject: PayOffObjectInput!) {
  updatePayOff(payOffId: $payOffId, payOffObject: $payOffObject) {
    _id
    amount
  }
}
`
export {UPDATE_PAY_OFF}