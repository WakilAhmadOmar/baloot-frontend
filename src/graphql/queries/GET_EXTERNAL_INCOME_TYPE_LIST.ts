import { gql } from "@apollo/client";

const GET_EXTERNAL_INCOME_TYPE_LIST = gql`
  query {
    getExternalIncomeTypeList {
      _id
      name
      createdAt
    }
  }
`;

export { GET_EXTERNAL_INCOME_TYPE_LIST };
