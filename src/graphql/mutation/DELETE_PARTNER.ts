import { gql } from "@apollo/client";

const DELETE_PARTNER = gql`
mutation DeletePartner($partnerId: ID!) {
  deletePartner(partnerId: $partnerId) {
    message
  }
}
`
export {DELETE_PARTNER }