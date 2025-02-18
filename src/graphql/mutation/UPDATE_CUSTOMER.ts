import { gql } from "@apollo/client";

const UPDATE_CUSTOMER = gql`
  mutation ($customerId: ID!, $customerObject: UpdateCustomerObjectInput) {
    updateCustomer(customerId: $customerId, customerObject: $customerObject) {
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
        }
      }
      createdAt
    }
  }
`;

export { UPDATE_CUSTOMER };
