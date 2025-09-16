import { gql } from "@apollo/client";

const ADD_PRODUCT = gql`
  mutation ($productObject: ProductObjectInput!) {
    addProduct(productObject: $productObject) {
      _id
      name
    }
  }
`;

export { ADD_PRODUCT };
