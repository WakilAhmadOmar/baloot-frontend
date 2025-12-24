import { gql } from "@apollo/client";

const ADD_SAFE = gql`
  mutation ($safeObject: SafeObjectInput!) {
    addSafe(safeObject: $safeObject) {
      _id
      name
      address
      cashier {
        _id
        name
        fathersName
        idNumber
        jobTitle
        startDate
        dateOfBirth
        email
        address
        createdAt
      }
    }
  }
`;

export { ADD_SAFE };
