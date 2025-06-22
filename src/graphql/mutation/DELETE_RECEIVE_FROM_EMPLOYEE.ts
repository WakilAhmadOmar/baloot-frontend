import { gql } from "@apollo/client";


const DELETE_RECEIVE_FROM_EMPLOYEE = gql`
mutation ($receiveId: ID!) {
  deleteReceiveFromEmployee(receiveId: $receiveId) {
    message
  }
}
`
export { DELETE_RECEIVE_FROM_EMPLOYEE }