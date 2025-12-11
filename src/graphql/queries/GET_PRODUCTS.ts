import { gql } from "@apollo/client";

const GET_PRODUCTS = gql`
  query ($page: Int, $searchTerm: String = "" $limit: Int = 10) {
    getProducts(page: $page, searchTerm: $searchTerm, limit: $limit) {
      count
      product {
        _id
        barcode
        category {
          _id
          name
        }
        createdAt
        currencyId {
          _id
          name
          symbol
        }
        name
        measuresExchange {
          powerMeasureAmount

          baseMeasureAmount
        }
        price {
          buyPrice
          measureId {
            _id
            name
          }
          sellPrice
        }
      }
    }
  }
`;

export { GET_PRODUCTS };
