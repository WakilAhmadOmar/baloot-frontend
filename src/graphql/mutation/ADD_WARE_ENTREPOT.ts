import { gql } from "@apollo/client";

const ADD_WARE_ENTREPOT = gql`
  mutation ($entrepotId: ID!, $wareObject: [WareInput]) {
    addWareToEntrepot(entrepotId: $entrepotId, wareObject: $wareObject) {
      _id
      name
      address
      responsible {
        _id
        name
      }
      ware {
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
  }
`;
export { ADD_WARE_ENTREPOT };
