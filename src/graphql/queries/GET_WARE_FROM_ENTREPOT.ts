import { gql } from "@apollo/client";

const GET_WARE_FROM_ENTREPOT = gql`
  query ($enterpotId: ID!, $existProdut: Boolean!) {
    getWareFromEntrepot(entrepotId: $enterpotId, existProduct: $existProdut) {
      productId {
        _id
        name
      }
      measures {
        measureId {
          _id
          name
        }
        amountOfProduct
      }
    }
  }
`;

export { GET_WARE_FROM_ENTREPOT };
