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
        }
        measures {
          amountOfProduct
          measureId {
            _id
            name
          }
        }
      }
      count
    }
  }
`;

export { GET_WARE_FROM_ENTREPOT };
