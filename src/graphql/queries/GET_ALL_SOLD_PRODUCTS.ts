import { gql } from "@apollo/client";

export const GET_ALL_SOLD_PRODUCTS = gql`
  query GetAllSoldProducts($page: Int, $limit: Int) {
    getAllSoldProducts(page: $page, limit: $limit) {
      count
      soldProducts {
        _id
        name
        baseMeasurePrice
        totalPrice {
          currency {
            _id
            name
            symbol
          }
          amount
        }
        totalAmount
      }
    }
  }
`;
