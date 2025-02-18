import { gql } from "@apollo/client";

const ADD_CUSTOMER = gql`
  mutation ($customerObject: CustomerObjectInput) {
    addCustomer(customerObject: $customerObject) {
      _id
      fullName
      contactNumber
      address
      credibility
      pastBilling {
        type
        amount
        currency {
          _id
          name
          symbol
        }
      }
      createdAt
    }
  }
`;

export { ADD_CUSTOMER };
