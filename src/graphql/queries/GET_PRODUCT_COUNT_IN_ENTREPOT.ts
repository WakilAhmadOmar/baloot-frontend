import { gql } from "@apollo/client";

const GET_PRODUCT_COUNT_IN_ENTREPOT = gql`
query GetProductCountInEntrepot($entrepotId: ID!, $productId: ID!) {
  getProductCountInEntrepot(entrepotId: $entrepotId, productId: $productId) {
    measures {
      measureId {
        _id
        name
      }
      amountOfProduct
    }
    productId {
      _id
      name
    }
  }
}
`

export {GET_PRODUCT_COUNT_IN_ENTREPOT}