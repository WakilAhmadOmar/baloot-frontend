import { gql } from "@apollo/client";

const ADD_CUSTOMER = gql`
  mutation ($customerObject: CustomerObjectInput) {
    addCustomer(customerObject: $customerObject) {
      _id
      fullName
      contactNumber
      address
      createdAt
    }
  }
`;

export { ADD_CUSTOMER };
