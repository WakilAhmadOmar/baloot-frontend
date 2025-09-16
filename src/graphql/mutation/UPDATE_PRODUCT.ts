import { gql } from "@apollo/client";

const UPDATE_PRODUCT = gql`
  mutation ($productId: ID!, $productObject: ProductObjectInput!) {
    updateProduct(productId: $productId, productObject: $productObject) {
      _id
         name
    }
  }
`;

export { UPDATE_PRODUCT };
