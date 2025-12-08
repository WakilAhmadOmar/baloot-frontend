import { gql } from "@apollo/client";

export const GET_ALL_ENTREPOTS_EXPIRED_PRODUCTS = gql`
  query GetAllEntrepotsExpiredProducts($page: Int, $limit: Int) {
    getAllEntrepotsExpiredProducts(page: $page, limit: $limit) {
      totalCount
      product {
        _id
        entrepotName
        productName
        barcode
        amount
        measureName
        expireDate
        daysExpired
      }
    }
  }
`;
