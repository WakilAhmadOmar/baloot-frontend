import { gql } from "@apollo/client";

const DELETE_CUSTOMER = gql`
  mutation ($customerId: ID!) {
    deleteCustomer(customerId: $customerId) {
      message
    }
  }
`;

export { DELETE_CUSTOMER };
