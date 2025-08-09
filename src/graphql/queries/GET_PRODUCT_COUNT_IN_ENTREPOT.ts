import { gql } from "@apollo/client";

const GET_PRODUCT_COUNT_IN_ENTREPOT = gql`
query GetProductCountInEntrepot($entrepotId: ID!, $productId: ID!) {
  getProductCountInEntrepot(entrepotId: $entrepotId, productId: $productId) {
    productId {
      _id
      name
    }
    productInfo {
      amountOfProduct
      expireInDate
      sellPrice
      buyPrice
      measureId {
        _id
        name
      }
    }
  }
}
`

export {GET_PRODUCT_COUNT_IN_ENTREPOT}