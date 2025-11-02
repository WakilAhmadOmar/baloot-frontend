import { gql } from "@apollo/client";


const UPDATE_FIXED_PRODUCT = gql`
mutation UpdateFixedProduct($productId: ID!, $productObject: FixedProductObjectInput!) {
  updateFixedProduct(productId: $productId, productObject: $productObject) {
    _id
    name
  }
}
`
export {UPDATE_FIXED_PRODUCT }