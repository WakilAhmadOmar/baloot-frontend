import { gql } from "@apollo/client";

const UPDATE_RECEIVE_FROM_EMPLOYEE = gql`
mutation updateReceiveFromEmployee($receiveId: ID!, $receiveObject: ReceiveObjectInput!) {
  updateReceiveFromEmployee(receiveId: $receiveId, receiveObject: $receiveObject) {
    _id
    amount
  }
}
`

export {UPDATE_RECEIVE_FROM_EMPLOYEE }