import { gql } from "@apollo/client";

const UPDATE_RECEIVE = gql`
mutation UpdateReceive($receiveId: ID!, $receiveObject: ReceiveObjectInput!) {
  updateReceive(receiveId: $receiveId, receiveObject: $receiveObject) {
    _id
    amount
  }
}
`

export {UPDATE_RECEIVE}