import { gql } from "@apollo/client";

const ADD_CUSTOMER = gql`
  mutation ($customerObject: CustomerObjectInput) {
    addCustomer(customerObject: $customerObject) {
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

export { ADD_CUSTOMER };
