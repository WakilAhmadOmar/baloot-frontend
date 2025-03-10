import { gql } from "@apollo/client";


const ADD_NEW_RECEIVE = gql`
mutation AddNewReceive($receiveObject: ReceiveObjectInput!) {
  addNewReceive(receiveObject: $receiveObject) {
    _id
    amount
  }
}
`
export {ADD_NEW_RECEIVE }