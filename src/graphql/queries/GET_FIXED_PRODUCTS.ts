import { gql } from "@apollo/client";

const GET_FIXED_PRODUCTS = gql`
  query GetFixedProducts($page: Int, $searchTerm: String = "") {
    getFixedProducts(page: $page, searchTerm: $searchTerm) {
      fixedProduct {
        _id
        name
        measureId {
          _id
          name
        }
        price
        currencyId {
          _id
          name
        }
        amountPerMeasure
        createdAt
      }
      count
    }
  }
`;

export { GET_FIXED_PRODUCTS };
