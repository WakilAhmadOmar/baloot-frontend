import { gql } from "@apollo/client";

const GET_PRODUCTS = gql`
  query ($page: Int, $searchTerm: String = "") {
    getProducts(page: $page, searchTerm: $searchTerm) {
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
