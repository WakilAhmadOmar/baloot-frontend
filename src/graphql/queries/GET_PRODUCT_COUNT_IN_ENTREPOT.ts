import { gql } from "@apollo/client";

const GET_PRODUCT_COUNT_IN_ENTREPOT = gql`
query GetProductCountInEntrepot($entrepotId: ID!, $productId: ID!) {
  getProductCountInEntrepot(entrepotId: $entrepotId, productId: $productId) {
    productId {
      _id
      name
    }
    measures {
      measureId {
        name
        _id
      }
      amountOfProduct
    }
  }
}
`

export {GET_PRODUCT_COUNT_IN_ENTREPOT}