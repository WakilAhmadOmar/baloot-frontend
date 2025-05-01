import { gql } from "@apollo/client";

const ADD_WARE_TO_ENTREPOT = gql`
mutation AddWareToEntrepot($entrepotId: ID!, $wareObject: [WareInput]) {
  addWareToEntrepot(entrepotId: $entrepotId, wareObject: $wareObject) {
    _id
    name
  }
}
`

export { ADD_WARE_TO_ENTREPOT}