import { gql } from "@apollo/client";

export const GET_ALL_BUY_PRODUCTS = gql`
query GetAllBuyProducts($page: Int, $limit: Int) {
  getAllBuyProducts(page: $page, limit: $limit) {
    count
    buyProducts {
      _id
      name
      baseMeasurePrice
      baseMeasure {
        _id
        name
      }
      totalAmount
      totalPrice {
        amount
        currency {
          _id
          name
          symbol
        }
      }
      currency {
        symbol
        name
        _id
      }
    }
  }
}
`;
