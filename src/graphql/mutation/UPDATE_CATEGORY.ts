import { gql } from "@apollo/client";

const UPDATE_CATEGORY = gql`
  mutation ($categoryId: ID!, $name: String!, $description: String) {
    updateCategory(
      categoryId: $categoryId
      categoryObject: { name: $name, description: $description }
    ) {
      _id
      name
      description
      createdAt
    }
  }
`;

export { UPDATE_CATEGORY };
