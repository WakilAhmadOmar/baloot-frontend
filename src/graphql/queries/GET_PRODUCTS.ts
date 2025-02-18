import { gql } from "@apollo/client";

const GET_PRODUCTS = gql`
  query ($page: Int, $searchTerm: String = "") {
    getProducts(page: $page, searchTerm: $searchTerm) {
      product {
        _id
        name
        productCode
        baseMeasureAmount
         measuresExchange{
        powerMeasureId{
          _id
          name
           description
        }
        powerMeasureAmount
        baseMeasureId{
          _id
          name
          description
        }
        baseMeasureAmount
      }
        measures {
          measureId {
            _id
            name
            description
          }
          buyPrice
          sellPrice
        }
        category {
          _id
          name
        }
        expirationDate
        barcode
        currencyId {
          _id
          name
          symbol
        }
      }
      count
    }
  }
`;

export { GET_PRODUCTS };
