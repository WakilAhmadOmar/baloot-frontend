import { gql } from "@apollo/client";

const GET_WARE_FROM_ENTREPOT = gql`
  query GetWareFromEntrepot(
    $entrepotId: ID!
    $existProduct: Boolean!
    $page: Int
  ) {
    getWareFromEntrepot(
      entrepotId: $entrepotId
      existProduct: $existProduct
      page: $page
    ) {
      ware {
        productId {
          _id
          name
          price {
            measureId {
              _id
              name
            }
          }
        }
        productInfo {
          amountOfProduct
        }
      }
      count
    }
  }
`;

export { GET_WARE_FROM_ENTREPOT };
