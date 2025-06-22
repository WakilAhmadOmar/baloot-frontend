import { gql } from "@apollo/client";


const DELETE_RECEIVE_FROM_CUSTOMER = gql`
mutation ($receiveId: ID!) {
  deleteReceiveFromCustomer(receiveId: $receiveId) {
    message
  }
}
`
export { DELETE_RECEIVE_FROM_CUSTOMER }