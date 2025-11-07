import { gql } from "@apollo/client";

const ADD_FIXED_PRODUCT = gql`
mutation AddFixedProduct($productObject: FixedProductObjectInput!) {
  addFixedProduct(productObject: $productObject) {
    _id
    name
  }
}
`
export { ADD_FIXED_PRODUCT  }