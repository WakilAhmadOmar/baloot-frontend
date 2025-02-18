import { gql } from "@apollo/client";

const DELETE_PRODUCT = gql`
  mutation ($productId: ID!) {
    deleteProduct(productId: $productId) {
      _id
    }
  }
`;
export { DELETE_PRODUCT };
