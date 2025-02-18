import { gql } from "@apollo/client";

const ADD_CATEGORY = gql`
  mutation ($name: String!, $description: String) {
    addCategory(categoryObject: { name: $name, description: $description }) {
      message
    }
  }
`;
export { ADD_CATEGORY };
