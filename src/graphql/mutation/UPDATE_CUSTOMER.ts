import { gql } from "@apollo/client";

const UPDATE_CUSTOMER = gql`
  mutation ($customerId: ID!, $customerObject: CustomerObjectInput) {
    updateCustomer(customerId: $customerId, customerObject: $customerObject) {
      _id
      fullName
      contactNumber
      address
      createdAt
    }
  }
`;

export { UPDATE_CUSTOMER };
