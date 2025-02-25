import { gql } from "@apollo/client";

const ADD_NEW_EXTERNAL_INCOME_TYPE = gql`
  mutation ($name: String!) {
    addNewExternalIncomeType(name: $name) {
      _id
      name
      createdAt
    }
  }
`;
export { ADD_NEW_EXTERNAL_INCOME_TYPE };
