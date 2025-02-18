import { gql } from "@apollo/client";

const GET_CATEGORIES = gql`
  query {
    getCategories {
      _id
      name
      description
    }
  }
`;
export { GET_CATEGORIES };
