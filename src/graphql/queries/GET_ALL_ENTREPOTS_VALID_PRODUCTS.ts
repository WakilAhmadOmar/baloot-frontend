import { gql } from "@apollo/client";

export const GET_ALL_ENTREPOTS_VALID_PRODUCTS = gql`
  query GetAllEntrepotsValidProducts($page: Int, $limit: Int) {
    getAllEntrepotsValidProducts(page: $page, limit: $limit) {
      totalCount
      product {
        _id
        entrepotName
        productName
        barcode
        amount
        measureName
        expireDate
        daysRemaining
      }
    }
  }
`;
