import { gql } from "@apollo/client";

const UPDATE_PRODUCT = gql`
  mutation ($productId: ID!, $productObject: ProductObjectInput!) {
    updateProduct(productId: $productId, productObject: $productObject) {
      _id
         name
    productCode
    measures{
      measureId{
        _id
        name
        
      }
      buyPrice
      sellPrice
    }
    baseMeasureAmount
    measuresExchange{
      powerMeasureId{
        _id
        name
      }
    }
    category{
      _id
      name
      
    }
    expirationDate
    barcode
    currencyId{
      _id
      name
    }
    createdAt
    }
  }
`;

export { UPDATE_PRODUCT };
