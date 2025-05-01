import { gql } from "@apollo/client";


const DELETE_RECEIVE = gql`
mutation DeleteReceive($receiveId: ID!) {
  deleteReceive(receiveId: $receiveId) {
    message
  }
}
`
export { DELETE_RECEIVE }