import { gql } from "@apollo/client";

const UPDATE_PRODUCT = gql`
  mutation ($productId: ID!, $productObject: ProductObjectInput!) {
    updateProduct(productId: $productId, productObject: $productObject) {
      _id
      name
      productCode
      image
      measures {
        measure {
          _id
          name
          description
          createdAt
        }
        measureSize
        buyPrice
        sellPrice
      }
      measuresExchange {
        from
        to
        amount
      }
      category {
        _id
        name
        description
        userId
      }
      expirationDate
      barcode
    }
  }
`;

export { UPDATE_PRODUCT };
