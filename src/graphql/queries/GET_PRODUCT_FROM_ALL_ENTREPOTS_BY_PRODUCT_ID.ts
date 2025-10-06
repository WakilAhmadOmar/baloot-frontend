import { gql } from "@apollo/client";


const GET_PRODUCT_FROM_ALL_ENTREPOTS_BY_PRODUCT_ID = gql `
query GetProductFromAllEntrepotsByProductId($productId: ID!) {
  getProductFromAllEntrepotsByProductId(productId: $productId) {
    _id
    name
    address
    ware {
      productId {
        name
        _id
      }
      productInfo {
        expireInDate
        measureId {
          _id
          name
        }
        amountOfProduct
      }
    }
  }
}`

export { GET_PRODUCT_FROM_ALL_ENTREPOTS_BY_PRODUCT_ID }