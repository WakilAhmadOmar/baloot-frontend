import { gql } from "@apollo/client";

const UPDATE_CUSTOMER = gql`
  mutation ($customerId: ID!, $customerObject: UpdateCustomerObjectInput) {
    updateCustomer(customerId: $customerId, customerObject: $customerObject) {
      _id
      fullName
      contactNumber
      address
      creditLimit{
      amount
      currencyId{
      _id
      name
      symbol
      }
      }
      credit{
      creditType
      amount
      currencyId{
      _id
      name
      symbol
      }
      }
      createdAt
    }
  }
`;

export { UPDATE_CUSTOMER };
