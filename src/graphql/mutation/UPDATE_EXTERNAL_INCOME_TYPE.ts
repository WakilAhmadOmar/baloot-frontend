import { gql } from "@apollo/client";

const UPDATE_EXTERNAL_INCOME_TYPE = gql`
  mutation ($externalIncomeTypeId: ID!, $name: String!) {
    updateExternalIncomeType(
      externalIncomeTypeId: $externalIncomeTypeId
      name: $name
    ) {
      _id
      name
      createdAt
    }
  }
`;

export { UPDATE_EXTERNAL_INCOME_TYPE };
