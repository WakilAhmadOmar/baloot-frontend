import { gql } from "@apollo/client";

export const GET_ALL_SOLD_PRODUCTS = gql`
query GetAllSoldProducts($limit: Int, $page: Int) {
  getAllSoldProducts(limit: $limit, page: $page) {
    count
    soldProducts {
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
