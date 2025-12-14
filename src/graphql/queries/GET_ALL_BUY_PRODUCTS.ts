import { gql } from "@apollo/client";

export const GET_ALL_BUY_PRODUCTS = gql`
query GetAllBuyProducts($page: Int, $limit: Int) {
  getAllBuyProducts(page: $page, limit: $limit) {
    count
    buyProducts {
      _id
      name
      productReportInfo {
        totalAmount
        totalPrice
        baseMeasure {
          _id
          name
        }
        currency {
          _id
          name
          symbol
        }
      }
    }
  }
}
`;
