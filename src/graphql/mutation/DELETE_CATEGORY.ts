import { gql } from "@apollo/client";

export const DELETE_CATEGORY = gql`
mutation DeleteCategory($categoryId: ID!) {
  deleteCategory(categoryId: $categoryId) {
    message
  }
}
`