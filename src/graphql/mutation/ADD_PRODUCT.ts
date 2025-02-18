import { gql } from "@apollo/client";

const ADD_PRODUCT = gql`
  mutation ($productObject: ProductObjectInput!) {
    addProduct(productObject: $productObject) {
      _id
      name
      productCode
      measures {
        measureId {
          _id
          name
          description
          createdAt
        }
        buyPrice
        sellPrice
      }
      category {
        _id
        name
        description
        userId
        createdAt
      }
      expirationDate
      barcode
      currencyId {
        _id
        name
        symbol
      }
    }
  }
`;

export { ADD_PRODUCT };
