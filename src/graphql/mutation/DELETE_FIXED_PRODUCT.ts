import { gql } from "@apollo/client";

const DELETE_FIXED_PRODUCT = gql`
mutation DeleteFixedProduct($productId: ID!) {
  deleteFixedProduct(productId: $productId) {
    _id
    name
  }
}
`

export {DELETE_FIXED_PRODUCT }