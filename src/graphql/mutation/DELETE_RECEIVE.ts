import { gql } from "@apollo/client";


const DELETE_RECEIVE = gql`
mutation($receiveId: ID!){
deleteReceive(receiveId: $receiveId) {
  message
}
}
`
export { DELETE_RECEIVE }