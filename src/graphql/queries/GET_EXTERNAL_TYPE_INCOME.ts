import { gql } from "@apollo/client";

const GET_EXTERNAL_TYPE_INCOME = gql`
  query {
    getExternalIncomeTypeList {
      _id
      name
      createdAt
    }
  }
`;

export { GET_EXTERNAL_TYPE_INCOME };
