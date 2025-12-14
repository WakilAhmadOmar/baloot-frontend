import { gql } from "@apollo/client";

const GET_CATEGORIES = gql`
  query {
    getCategories {
      _id
      name
      description
      isUsed
    }
  }
`;
export { GET_CATEGORIES };
