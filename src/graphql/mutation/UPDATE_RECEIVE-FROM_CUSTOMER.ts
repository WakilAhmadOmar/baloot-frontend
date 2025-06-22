import { gql } from "@apollo/client";

const UPDATE_RECEIVE_FROM_CUSTOMER = gql`
mutation updateReceiveFromCustomer($receiveId: ID!, $receiveObject: ReceiveObjectInput!) {
  updateReceiveFromCustomer(receiveId: $receiveId, receiveObject: $receiveObject) {
    _id
    amount
  }
}
`

export {UPDATE_RECEIVE_FROM_CUSTOMER }